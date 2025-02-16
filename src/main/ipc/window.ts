import { ipcMain } from "electron";
import { WindowManager } from "../windows/windowManager";
import { PreferencesManager } from "../services/preferencesManager";

export function registerWindowHandlers(windowManager: WindowManager, preferencesManager: PreferencesManager) {
  ipcMain.handle("get-port", () => windowManager.appPort);

  ipcMain.handle("hide-window", () => {
    windowManager.hide();
  });

  ipcMain.handle("minimize-window", () => {
    windowManager.minimize();
  });

  ipcMain.handle("maximize-window", () => {
    if (windowManager.isMaximized) {
      windowManager.window?.unmaximize();
      windowManager.isMaximized = false;
    } else {
      windowManager.maximize();
    }
  });

  // Handle preferences IPC
  ipcMain.handle("save-theme", async (event, payload) => {
    await preferencesManager.saveTheme(payload.theme, windowManager);
  });

  ipcMain.handle("onboarding-complete", async () => {
    await preferencesManager.markSetupComplete();
    windowManager.window?.webContents.send("close-onboarding-screen");
  });
}
