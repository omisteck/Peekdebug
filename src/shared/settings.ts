/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Omisio Technology. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { AppConfig } from './types/settings.type';


/**
 * Main configuration object containing all application settings
 * 
 * @type {AppConfig}
 * @constant
 */
export const defaultSettings: Readonly<AppConfig> = {
    /** Default port for the log server. Matches original Ray's port */
    DEFAULT_PORT: parseInt(process.env.DEFAULT_PORT || '44315'),

    /** API endpoint */
    API_ENDPOINT: process.env.API_ENDPOINT || 'https://peekdebug.com/api',
    /** Window dimension settings */
    WINDOW: {
        /** Default window width in pixels */
        DEFAULT_WIDTH: 800,
        /** Default window height in pixels */
        DEFAULT_HEIGHT: 600,
        /** Minimum allowed window width */
        MIN_WIDTH: 470,
        /** Minimum allowed window height */
        MIN_HEIGHT: 300
     },

    /** Tray icon dimensions */
    ICON_SIZE: {
        WIDTH: 16,
        HEIGHT: 16,
      },
} as const;
