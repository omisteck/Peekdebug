import { ipcMain } from "electron";
import axios, { isAxiosError } from "axios";
import { defaultSettings } from "../../shared/settings";

export function registerOnboardHandlers(): void {
    ipcMain.handle("login", async (event, data) => {

        try {
          const response = await axios.post(defaultSettings.API_ENDPOINT + "/login", {
            email: data.email,
            password: data.password
          });
          console.log("login successful", response.data)
          return response.data;
        } catch (error) {
          if (isAxiosError(error)) {
            console.error("Error logging in:", error);
            // Return the error message from the response
            return {
              error: error.response?.data?.message || 'An unexpected error occurred',
              status: error.response?.status
            };
          }

          console.error("Error logging in:", error);
          return { error: 'An unexpected error occurred', status: 500 };
        }
      });
      
    
      ipcMain.handle("register", async (event, data) => {
        try {
          
          const response = await axios.post(defaultSettings.API_ENDPOINT + "/register", data);
          console.log("register successful", response.data)
          return response.data;
    
        } catch (error) {
          if (isAxiosError(error)) {
            console.error("Error registering:", error.response?.data);
            // Return the error message from the response
            return {
              error: error.response?.data?.message || 'An unexpected error occurred',
              status: error.response?.status
            };
          }
          return { error: 'An unexpected error occurred', status: 500 };
        }
      });
      
    
    
      ipcMain.handle("verify-otp", async (event, data) => {
        try {
          const response = await axios.post(defaultSettings.API_ENDPOINT + "/otp/verify", data);
          console.log("otp verify successful", response.data)
          return response.data;
        } catch (error) {
          if (isAxiosError(error)) {
            console.error("Error verifying OTP:", error.response?.data);
            return {
              error: error.response?.data?.message || 'An unexpected error occurred',
              status: error.response?.status
            };
          }
          return { error: 'An unexpected error occurred', status: 500 };
        }
      });
    
      ipcMain.handle("request-otp", async (event, data) => {
        try {
          const response = await axios.post(defaultSettings.API_ENDPOINT + "/otp", data);
          console.log("otp request successful", response.data)
          return response.data;
        } catch (error) {
          if (isAxiosError(error)) {
            console.error("Error requesting OTP:", error.response?.data);
            return {
              error: error.response?.data?.message || 'An unexpected error occurred',
              status: error.response?.status
            };
          }
          return { error: 'An unexpected error occurred', status: 500 };
        }
      });
      
    }