/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Omisio Technology. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import getPort from 'get-port';
import log from 'electron-log/main';


log.initialize();


/**
 * Utility class for managing port-related operations.
 */
export class PortManager {
    /** Default port number for the log server. */
    private static readonly DEFAULT_PORT = parseInt(process.env.DEFAULT_PORT || '44315');

    /**
     * Finds an available port for the log server to listen on.
     * 
     * @param preferredPort - The preferred port number to use. Defaults to {@link DEFAULT_PORT}.
     * @returns A Promise that resolves with an available port number.
     * @throws {Error} If unable to find an available port.
     * 
     */
    public static async findAvailablePort(preferredPort = this.DEFAULT_PORT): Promise<number> {
        try {
            return await getPort({ port: preferredPort });
        } catch (error) {
            const typedError = error as Error;
            log.error(`Failed to find available port (preferred: ${preferredPort}): ${typedError.message}`);
            throw new Error(`Failed to find available port (preferred: ${preferredPort}): ${typedError.message}`);
        }
    }
} 