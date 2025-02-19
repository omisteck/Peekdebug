// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";


const api = {
    ready: false,

    invoke: async (channel: string, data: unknown[] = []) => {
        const validChannels = [
            'minimize-window',
            'hide-window',
            'maximize-window',
            'save-theme',
            'get-theme',
            'save-preferences',
            'get-preferences',
            'onboarding-complete',
            'toggle-log-receiving',
            'open-external-link',
            'get-port-number',
            'login',
            'register',
            'verify-otp',
            'request-otp',
            'save-user-details'

        ];
        if (validChannels.includes(channel)) {
            try {
                return await ipcRenderer.invoke(channel, data);
            } catch (error) {
                console.error(`Error invoking ${channel}:`, error);
                throw error;
            }
        }
        throw new Error(`Invalid channel: ${channel}`);
    },
    on: (channel: string, callback: (...args: unknown[]) => void) => {
        const validChannels = [ 'theme-changed', 'api-ready','close-onboarding-screen','new-log'];
        if (validChannels.includes(channel)) {
            ipcRenderer.on(channel, (event, ...args) => callback(...args));
        }
    },
}


// Expose the API to the renderer process
contextBridge.exposeInMainWorld('api', api);


// Wait for DOM to be ready
window.addEventListener('DOMContentLoaded', () => {
    // Mark API as ready
    api.ready = true;
    ipcRenderer.send('api-ready');
});

ipcRenderer.on('new-notification', (event, data) => {
    new Notification(data.value);
});
