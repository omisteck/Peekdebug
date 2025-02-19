/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Omisio Technology. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export interface WindowConfig {
  DEFAULT_WIDTH: number;
  DEFAULT_HEIGHT: number;
  MIN_WIDTH: number;
  MIN_HEIGHT: number;
}

export interface IconConfig {
  WIDTH: number;
  HEIGHT: number;
}

export interface AppConfig {
  readonly DEFAULT_PORT: number;
  readonly API_ENDPOINT: string;
  readonly WINDOW: Readonly<WindowConfig>;
  readonly ICON_SIZE: Readonly<IconConfig>;
}