/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Omis Technology. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 * 
 *  Window state interface
 * 
 * @author: Rasheed Omiwale
 * @date: 2024-12-23
 *--------------------------------------------------------------------------------------------*/

/**
 * Represents the visual state and dimensions of an application window.
 */
export interface ApplicationWindowState {
    isVisible: boolean;
    bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}