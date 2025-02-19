import React from "react";
import { Notification02Icon, LockComputerIcon } from "hugeicons-react";
import Switch from "../../shared/Switch";

interface AppSettingsProps {
  autoStart: boolean;
  setAutoStart: (checked: boolean) => void;
  notifications: boolean;
  setNotifications: (checked: boolean) => void;
}

function AppSettings({
  autoStart,
  setAutoStart,
  notifications,
  setNotifications,
}: AppSettingsProps) {
  const handleAutoStartChange = (checked: boolean) => {
    setAutoStart(checked);
  };

  const handleNotificationsChange = (checked: boolean) => {
    setNotifications(checked);
  };

  return (
    <div>
      {/* Header */}
      <div className="space-y-4 mb-12">
        <h1
          className={`text-2xl font-semibold dark:text-secondary text-primary`}
        >
          Settings
        </h1>
        <p className={`dark:text-secondary text-primary text-opacity-70}`}>
          Customize your app preferences
        </p>
      </div>

      {/* Settings Options */}
      <div className="space-y-8">
        {/* AutoStart Setting */}
        <div
          className={`flex items-center justify-between p-6 rounded-xl border-2 transition-all
          dark:border-secondary border-opacity-10 hover:border-opacity-20 border-primary`}
        >
          <div className="flex items-center space-x-4">
            <div
              className={`p-2 rounded-lg 
                dark:bg-secondary dark:bg-opacity-20 bg-primary bg-opacity-5`}
            >
              <LockComputerIcon
                className={`w-5 h-5 dark:text-secondary text-primary`}
              />
            </div>
            <div>
              <h3 className={`font-medium dark:text-secondary text-primary`}>
                Auto Start
              </h3>
              <p
                className={`text-sm mt-1 
                  dark:text-secondary text-opacity-60 text-primary`}
              >
                Launch application on system startup
              </p>
            </div>
          </div>
          <Switch
            checked={autoStart}
            onCheckedChange={handleAutoStartChange}
            className={`dark:data-[state=checked]:bg-secondary data-[state=checked]:bg-primary`}
          />
        </div>

        {/* Notifications Setting */}
        <div
          className={`flex items-center justify-between p-6 rounded-xl border-2 transition-all
            dark:border-secondary border-opacity-10 hover:border-opacity-20' border-primary `}
        >
          <div className="flex items-center space-x-4">
            <div
              className={`p-2 rounded-lg 
                dark:bg-secondary dark:bg-opacity-20 bg-primary bg-opacity-5`}
            >
              <Notification02Icon
                className={`w-5 h-5 dark:text-secondary text-primary`}
              />
            </div>
            <div>
              <h3 className={`font-medium dark:text-secondary text-primary`}>
                Notifications
              </h3>
              <p
                className={`text-sm mt-1 
                  dark:text-secondary text-opacity-60 text-primary`}
              >
                Receive important updates and alerts
              </p>
            </div>
          </div>
          <Switch
            checked={notifications}
            onCheckedChange={handleNotificationsChange}
            className={`dark:data-[state=checked]:bg-secondary data-[state=checked]:bg-primary`}
          />
        </div>
      </div>
    </div>
  );
}

export default AppSettings;
