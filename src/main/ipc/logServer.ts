import { ipcMain, shell } from "electron";
import { LogServer } from "../services/logServer";

export function registerLogServerHandlers(logServer: LogServer | null, port: number): void {
    ipcMain.handle("toggle-log-receiving", async () => {
        return logServer?.toggleReceiving();
    });

    ipcMain.handle("open-external-link", (event, url) => {
        shell.openExternal(url);
    });

    ipcMain.handle("get-port-number", async () => {
        return port;
    });
} 