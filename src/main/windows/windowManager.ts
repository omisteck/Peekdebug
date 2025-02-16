/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Omis Technology. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 * 
 *  Window manager
 * 
 * @author: Rasheed Omiwale
 * @date: 2024-12-23
 *--------------------------------------------------------------------------------------------*/

import { BrowserWindow, app } from 'electron';
import { ApplicationWindowState } from "../../shared/types/window-state.type";
import { defaultSettings } from "../../shared/settings";
import path from 'path';
import { KeyboardHandler } from '../services/keyboard.handler';
import { TrayManager } from './tray';
export class WindowManager {
    /** The main application window instance */
    public window: BrowserWindow | null = null;
    public static instance: WindowManager | null = null;
  
    /** Current application port */
    public appPort: number;
  
    /** Current state of the window */
    public windowState: ApplicationWindowState;
  
    /** Current maximized state of the window */
    public isMaximized = false;
  
    private keyboardHandler: KeyboardHandler;
  
  
    constructor(private preloadPath: string, private entryPath: string) {
      // Initialize default window state
      this.windowState = {
        isVisible: true,
        bounds: {
          x: 0,
          y: 0,
          width: defaultSettings.WINDOW.DEFAULT_WIDTH,
          height: defaultSettings.WINDOW.DEFAULT_HEIGHT,
        },
      };
    }
  
    /**
     * Creates and configures the main application window
     *
     * @returns Promise<BrowserWindow> The created window instance
     * @throws Error if window creation or loading fails
     */
    async createWindow(port: number): Promise<BrowserWindow> {
      this.window = new BrowserWindow({
        width: defaultSettings.WINDOW.DEFAULT_WIDTH,
        height: defaultSettings.WINDOW.DEFAULT_HEIGHT,
        minWidth: defaultSettings.WINDOW.MIN_WIDTH,
        minHeight: defaultSettings.WINDOW.MIN_HEIGHT,
        webPreferences: {
          contextIsolation: true,
          preload: this.preloadPath,
          devTools: !app.isPackaged,
        },
        frame: false,
        show: false,
        maximizable: true,
        minimizable: true,
        resizable: true,
        icon: path.join(app.getAppPath(), "build/icons/icon.png"),
      });
  
      this.window.setMenuBarVisibility(false);
  
      // open DevTools in development mode
      if (!app.isPackaged) {
        this.window.webContents.openDevTools({ mode: "detach" }); // Opens in a separate window
      }
  
      this.keyboardHandler = new KeyboardHandler(this.window);

      this.window.webContents.on("before-input-event", (event, input) =>
        this.keyboardHandler.handleShortcuts(event, input)
      );
  
       // Show window when ready
    this.window.on('ready-to-show', () => {
        new TrayManager(this.window);
      this.window?.show();
    });
  
      // Set app port
      this.appPort = port;
  
  
      try {
        // and load the index.html of the app.
        this.window.loadURL(this.entryPath);
  
        this.setupWindowEvents();
        return this.window;
      } catch (error) {
        console.error("Failed to create window", error as Error);
        throw error;
      }
    }
  

    /* Gets the singleton instance of WindowManager.
    */
   public static getInstance(): WindowManager {

       if (WindowManager.instance) {
            return WindowManager.instance;
       }

       throw new Error("WindowManager instance not found");
   }
    
  
    /**
     * Sets up event listeners for window events
     * Handles window state persistence and close behavior
     *
     * @private
     */
    private setupWindowEvents(): void {
      if (!this.window) return;
  
      // Handle close event - hide instead of destroy
      this.window.on("close", (event) => {
        if (!global.isQuitting) {
          event.preventDefault();
          this.window?.hide();
        }
      });
  
      // Track window position
      this.window.on("moved", () => {
        const bounds = this.window?.getBounds();
        if (bounds) {
          this.windowState.bounds = bounds;
        }
      });
  
      // Track window resize
      this.window.on("resize", () => {
        const bounds = this.window?.getBounds();
        if (bounds) {
          this.windowState.bounds = bounds;
        }
      });
    }
  
    /**
     * Returns the current window instance
     * @returns BrowserWindow | null The current window or null if not created
     */
    getWindow(): BrowserWindow | null {
      return this.window;
    }
  
    /**
     * Shows the window and updates visibility state
     */
    show(): void {
      this.window?.show();
      this.window?.focus();
      this.windowState.isVisible = true;
    }
  
    /**
     * Hides the window and updates visibility state
     */
    hide(): void {
      this.window?.hide();
      this.windowState.isVisible = false;
    }
  
    /**
     * Minimizes the window
     */
    minimize(): void {
      this.window?.minimize();
    }
  
    /**
     * Maximizes the window
     */
    maximize(): void {
      this.window?.maximize();
      this.windowState.isVisible = true;
      this.isMaximized = true;
    }
  

  }