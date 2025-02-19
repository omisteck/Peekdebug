/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Omisio Technology. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/** Supported theme options for the application */
export type Theme = 'light' | 'dark' | 'system';


/** Application preferences configuration interface */
export interface Preferences {
    readonly theme: Theme;
    readonly isFirstRun: boolean;
    readonly autoStart: boolean;
    readonly notifications: boolean;
    readonly port?: number;
    readonly userEmail: string;
    readonly userFirstName: string;
    readonly userLastName: string;
}

export interface OnboardingPreferences {
    readonly autoStart: boolean;
    readonly notifications: boolean;
}