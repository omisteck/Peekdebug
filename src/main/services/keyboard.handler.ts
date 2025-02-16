/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Omis Technology. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { BrowserWindow, Event, Input } from 'electron';

/**
 * Handles keyboard shortcuts and their corresponding actions in the application.
 */
export class KeyboardHandler {
    private readonly shortcuts = {
        RELOAD: ['r', 'F5'],
        DEV_TOOLS: ['i', 'F12']
    } as const;

    /**
     * Creates a new instance of KeyboardHandler.
     * @param mainWindow - The main browser window instance
     */
    constructor(private readonly mainWindow: BrowserWindow) {}

    /**
     * Handles keyboard shortcuts and prevents default behaviors where necessary.
     * 
     * @param event - The keyboard event
     * @param input - The keyboard input details
     */
    public handleShortcuts(event: Event, input: Input): void {
        const key = input.key.toLowerCase();

        if (this.isReloadAttempt(input, key)) {
            event.preventDefault();
            return;
        }

        if (this.isDevToolsAttempt(input, key)) {
            this.handleDevTools(event);
            return;
        }
    }

    /**
     * Checks if the input is attempting a reload action.
     */
    private isReloadAttempt(input: Input, key: string): boolean {
        return (
            ((input.control || input.meta) && key === this.shortcuts.RELOAD[0]) ||
            key === this.shortcuts.RELOAD[1]
        );
    }

    /**
     * Checks if the input is attempting to access dev tools.
     */
    private isDevToolsAttempt(input: Input, key: string): boolean {
        return (
            ((input.control || input.meta) && input.shift && key === this.shortcuts.DEV_TOOLS[0]) ||
            key === this.shortcuts.DEV_TOOLS[1]
        );
    }

    /**
     * Handles dev tools toggle and prevents default behavior.
     */
    private handleDevTools(event: Event): void {
        this.mainWindow?.webContents.toggleDevTools();
        event.preventDefault();
    }
} 