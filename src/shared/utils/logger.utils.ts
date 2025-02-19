/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Omis Technology. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Core logging utility for internal application logging
 * Provides consistent logging across the application with proper formatting
 */
export class Logger {
  private static instance: Logger;

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  info(message: string, ...args: unknown[]): void {
    console.log(`[Peek] ${message}`, ...args);
  }

  error(message: string, error?: Error): void {
    console.error(`[Peek Error] ${message}`, error);
  }

  debug(...args: unknown[]): void {
    console.debug("[Peek Debug]", ...args);
  }
}

export const logger = Logger.getInstance();
