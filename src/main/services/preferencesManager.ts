/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Omis Technology. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { DatabaseService } from './database';
import { Preferences, Theme, OnboardingPreferences } from '../../shared/types/preferences.type';
import { app } from 'electron';
import { WindowManager } from '../windows/windowManager';
import { UserDetails } from '../../shared/types/userDetails.type';

/**
 * Manages application preferences using DatabaseService.
 * Implements the Singleton pattern for global state management.
 */
export class PreferencesManager {
    private static instance?: PreferencesManager;
    private readonly db: DatabaseService<Preferences>;

    private static readonly DEFAULT_PREFERENCES: Preferences = {
        theme: 'light',
        isFirstRun: true,
        autoStart: false,
        notifications: true,
        userEmail: '',
        userFirstName: '',
        userLastName: ''
    } as const;

    private constructor() {
        this.db = new DatabaseService<Preferences>('preferences.json', 
            PreferencesManager.DEFAULT_PREFERENCES);
    }

    /**
     * Gets the singleton instance of PreferencesManager.
     */
    public static getInstance(): PreferencesManager {
        if (!PreferencesManager.instance) {
            PreferencesManager.instance = new PreferencesManager();
        }
        return PreferencesManager.instance;
    }

    /**
     * Checks if this is the first run of the application.
     */
    public async isFirstRun(): Promise<boolean> {
        return await this.db.getValue('isFirstRun');
    }

    /**
     * Marks the initial setup as complete.
     */
    public async markSetupComplete(): Promise<void> {
        await this.db.setValue('isFirstRun', false);
    }

    /**
     * Gets the current theme setting.
     */
    public async getTheme(): Promise<Theme> {
        return await this.db.getValue('theme');
    }

    /**
     * Updates the theme setting.
     */
    public async setTheme(theme: Theme): Promise<void> {
        await this.db.setValue('theme', theme);
    }

     /**
     * Updates the theme setting.
     */
     public async setAutoStart(autoStart: boolean): Promise<void> {
        await this.db.setValue('autoStart', autoStart);
    }

     /**
     * Updates the theme setting.
     */
     public async setNotifications(notifications: boolean): Promise<void> {
        await this.db.setValue('notifications', notifications);
    }

    /**
     * Retrieves all current preferences.
     */
    public async getAllPreferences(): Promise<Readonly<Preferences>> {
        return await this.db.getData();
    }

    /**
     * Updates multiple preferences at once.
     */
    public async setPreferences(preferences: Partial<Preferences>): Promise<void> {
        try {
            await this.db.updateData(preferences);
        } catch (error) {
            throw new Error(`Failed to update preferences: ${(error as Error).message}`);
        }
    }

    /**
     * Resets all preferences to their default values.
     */
    public async resetToDefaults(): Promise<void> {
        await this.db.resetToDefaults(PreferencesManager.DEFAULT_PREFERENCES);
    }

    async saveTheme(theme: Theme, windowManager: WindowManager): Promise<void> {
        this.setTheme(theme);
        
        // Apply theme
        if (windowManager.getWindow()?.webContents) {
            windowManager.getWindow()?.webContents.send('theme-changed', theme);
        }
    }



    async savePreferences(preferences: OnboardingPreferences): Promise<void> {
        this.setAutoStart(preferences.autoStart);
        this.setNotifications(preferences.notifications);
        
        // Handle autostart to start the app at login
        if (preferences.autoStart) {
            app.setLoginItemSettings({
                openAtLogin: true
            });
        } else {
            app.setLoginItemSettings({
                openAtLogin: false
            });
        }
    }

    async saveUserDetails(data: UserDetails): Promise<void> {
        await this.db.setValue('userEmail', data.email);
        await this.db.setValue('userFirstName', data.firstName);
        await this.db.setValue('userLastName', data.lastName);
    }
}
