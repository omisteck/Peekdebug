/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Omis Technology. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {BrowserWindow} from 'electron';
import {Server, IncomingMessage, ServerResponse, createServer} from 'node:http';
import {logger} from '../../shared/utils/logger.utils';
import {PeekPayloadSchema} from '../../shared/types/log-entry.schema';
import { z } from 'zod';


/**
 * LogServer provides core server functionality for receiving and processing logs.
 * It acts as a bridge between external applications and the Peek UI.
 */
export class LogServer {
// @ts-expect-error Server type requires generic params but works fine without them
  private readonly server: Server;
  private readonly mainWindow: BrowserWindow;
  private isReceivingEnabled = true;

  constructor(mainWindow: BrowserWindow, port: number) {
    this.mainWindow = mainWindow;
    this.server = createServer();

    this.server.on('request', this.handleRequest.bind(this));
    this.server.on('error', (error: Error) => {
      logger.error('Server error:', error);
    });

    this.server.listen(port, () => {
      logger.info(`Log server listening on port ${port}`);
    });
  }

  private handleRequest(req: IncomingMessage, res: ServerResponse): void {

    if(!this.isReceivingEnabled){
      this.sendMethodNotAllowed(res);
      return;
    }

    if (req.method !== 'POST') {
      this.sendMethodNotAllowed(res);
      return;
    }

    let body = '';
    
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    logger.debug("body", body);
    req.on('end', () => {
      try {
        logger.debug('Received request body:', body);
        const rawData = JSON.parse(body);
        const validatedData = PeekPayloadSchema.parse(rawData);
        
        logger.debug('Processed log data:', validatedData);

        this.sendToRenderer(validatedData);
        this.sendSuccessResponse(res);
        
      } catch (error) {
        this.handleProcessingError(error, res);
      }
    });

    req.on('error', (error) => {
      logger.error('Request error:', error);
      this.sendServerError(res);
    });
  }

  private sendToRenderer(logData: z.infer<typeof PeekPayloadSchema>): void {
    logger.debug('Sending to renderer:', logData);
    if (!this.mainWindow.webContents) {
      logger.error('WebContents not available');
      return;
    }

    //if type is notification, send to notification channel
    if(logData.payloads[0].type == "notify"){
      this.mainWindow.webContents.send('new-notification', logData.payloads[0].content);
    }else{
      this.mainWindow.webContents.send('new-log', logData);
    }

  }

  private sendSuccessResponse(res: ServerResponse): void {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    res.end(JSON.stringify({status: 'ok'}));
  }

  private sendMethodNotAllowed(res: ServerResponse): void {
    res.writeHead(405, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({error: 'Method not allowed'}));
  }

  private sendServerError(res: ServerResponse): void {
    res.writeHead(500, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({error: 'Internal server error'}));
  }

  private handleProcessingError(error: unknown, res: ServerResponse): void {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error('Error processing request:', new Error(errorMessage));
    res.writeHead(400, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({error: 'Invalid JSON'}));
  }

  close(): void {
    this.server.close();
  }

  public toggleReceiving(): boolean {
    this.isReceivingEnabled = !this.isReceivingEnabled;
    logger.info(`Log receiving is now ${this.isReceivingEnabled ? 'enabled' : 'disabled'}`);
    return this.isReceivingEnabled;
  }
}