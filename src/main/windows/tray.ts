/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Omis Technology. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 * 
 *  Main entry point for the main process
 * 
 * @author: Rasheed Omiwale
 * @date: 2024-12-23
 *--------------------------------------------------------------------------------------------*/



/**
 * TrayManager handles the system tray integration
 * Features:
 * - Custom tray icon with proper sizing
 * - Context menu with show/hide toggle, reposition, and quit options
 * - Proper application lifecycle management
 */
import {app, BrowserWindow, Menu, nativeImage, screen, Tray} from 'electron';
import {defaultSettings} from '../../shared/settings';
import path from 'path';


export class TrayManager {
    private readonly tray: Tray;
    private readonly mainWindow: BrowserWindow;

    constructor(mainWindow: BrowserWindow) {
            this.mainWindow = mainWindow;

        const trayIconPath: string = path.join(__dirname, 'build/icons/trayIcon.png')
        
        const icon = nativeImage.createFromPath(trayIconPath)
            .resize({
                width: defaultSettings.ICON_SIZE.WIDTH,
                height: defaultSettings.ICON_SIZE.HEIGHT
            });

        if (process.platform === 'darwin') {
            icon.setTemplateImage(true);
        }

        this.tray = new Tray(icon);
        this.setupTrayMenu();
    }

    private setupTrayMenu(): void {
        this.tray.setToolTip('Peek');

        const contextMenu = Menu.buildFromTemplate([
            {
                label: 'Show/Hide Peek',
                click: () => {
                    if (this.mainWindow.isVisible()) {
                        this.mainWindow.hide();
                    } else {
                        this.showAndFocusWindow();
                    }
                },
            },
            {
                label: 'Center Window',
                click: () => this.centerWindow(),
            },
            {type: 'separator'},
            {
                label: 'Quit Peek',
                click: () => {
                    global.isQuitting = true;
                    app.quit();
                },
            },
        ]);

        this.tray.setContextMenu(contextMenu);
    }

    private showAndFocusWindow(): void {
        if (!this.mainWindow.isVisible()) {
            this.mainWindow.show();
        }
        if (this.mainWindow.isMinimized()) {
            this.mainWindow.restore();
        }
        this.mainWindow.focus();
    }

    private centerWindow(): void {
        const windowBounds = this.mainWindow.getBounds();
        const currentScreen = screen.getDisplayNearestPoint({
            x: windowBounds.x,
            y: windowBounds.y
        });

        const x = Math.floor(
            currentScreen.workArea.x +
            (currentScreen.workArea.width - windowBounds.width) / 2);
        const y = Math.floor(
            currentScreen.workArea.y +
            (currentScreen.workArea.height - windowBounds.height) / 2);

        this.mainWindow.setPosition(x, y);
        this.showAndFocusWindow();
    }

    destroy(): void {
        this.tray.destroy();
    }
} 