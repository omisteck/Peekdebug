/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Omis Technology. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 * 
 *  Main entry point for the renderer process
 * 
 * @author: Rasheed Omiwale
 * @date: 2024-12-23
 *--------------------------------------------------------------------------------------------*/

import { createRoot } from 'react-dom/client';
import App from './app/App';

const root = createRoot(document.body);
root.render(<App />);
