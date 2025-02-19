import { ipcMain } from "electron";
import { PreferencesManager } from "../services/preferencesManager";

export function registerPreferencesManagerHandlers(preferencesManager: PreferencesManager): void {
  ipcMain.handle("save-preferences", async (event, preferences) => {
    await preferencesManager.savePreferences(preferences);
  });

  ipcMain.handle("save-user-details", async (event, data) => {
    await preferencesManager.saveUserDetails(data);
  });

  ipcMain.handle("get-preferences", async () => {
    return await preferencesManager.getAllPreferences();
  });

  ipcMain.handle("get-theme", async () => {
    return await preferencesManager.getTheme();
  });

}
