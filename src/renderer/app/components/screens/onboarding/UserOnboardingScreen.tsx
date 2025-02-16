import { JSX, useEffect, useState } from "react";
import SideBar from "./SideBar";
import { ArrowRight01Icon } from "hugeicons-react";
import ThemeSetting from "./ThemeSetting";
import AppSettings from "./AppSettings";
import SyncHub from "./SyncHub";
import SocialsCard from "./SocialsCard";

function UserOnboardingScreen() {
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [autoStart, setAutoStart] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [isConnectedToSyncHub, setIsConnectedToSyncHub] = useState(false);
  const [sectionError, setSectionError] = useState(false);

  useEffect(() => {
    setIsActive(true);

    const theme = localStorage.getItem("theme");
    setIsDark(theme === "dark");

    const userData = {
      email: localStorage.getItem("userEmail")?.trim(),
      firstName: localStorage.getItem("userFirstName")?.trim(),
      lastName: localStorage.getItem("userLastName")?.trim()
    };

    const isUserDataComplete = Object.values(userData).every(Boolean);
    setIsConnectedToSyncHub(isUserDataComplete);

    console.log(isUserDataComplete);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  };


  const handleNext = (passedProgress?: number, nextProgress?: number) => {
    const newProgress = passedProgress || progress;
    const newNextProgress = nextProgress || nextSection();
    switch (newProgress) {
      case 0:
        saveTheme(isDark);
        break;
      case 1:
        savePreferences();
        break;
      case 2:
        if (!isConnectedToSyncHub) {
          setSectionError(true);
          return; // Return early if not connected to SyncHub
        }
        break;
      case 3:
        closeOnboarding();
        break;
        
      default:
        closeOnboarding();
        break;
    }

    setProgress(newNextProgress);
  };


  const steps: JSX.Element[] = [
    <ThemeSetting isDark={isDark} toggleTheme={toggleTheme} />,
    <AppSettings
      autoStart={autoStart}
      setAutoStart={setAutoStart}
      notifications={notifications}
      setNotifications={setNotifications}
    />,
    <SyncHub
      setIsConnectedToSyncHub={setIsConnectedToSyncHub}
      isConnectedToSyncHub={isConnectedToSyncHub}
      handleNext={handleNext}
    />,
    <SocialsCard handleNext={handleNext} />,
  ];

  const nextSection = () => {
    if (progress > 3) {
      // close onboarding
    } else {
      return progress + 1;
    }
  };

  const saveTheme = (isDark: boolean) => {
    window.api.invoke("save-theme", { theme: isDark ? "dark" : "light" });
  };

  const savePreferences = () => {
    window.api.invoke("save-preferences", {
      autoStart: autoStart,
      notifications: notifications,
    });
  };

  const closeOnboarding = () => {
    window.api.invoke("onboarding-complete");
  }; 

  return (
    <div
      className={`w-full h-screen transition-all duration-500 flex 
        dark:bg-darkprimary bg-white
      ${
        isActive
          ? "opacity-100 translate-x-0"
          : "opacity-0 -translate-x-full pointer-events-none"
      }
      `}
    >
      {/* Sidebar - Fixed */}
      <div className="min-h-screen sticky top-0 flex-shrink-0">
        <SideBar
          progress={progress}
          setProgress={setProgress}
          handleNext={handleNext}
        />
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto h-screen">
        <div className="px-12 py-10 relative min-h-full">
          <div className="max-w-2xl mx-auto">{steps[progress]}</div>

          {/* Next button positioned at the bottom right */}
          {progress < 2 && (
            <button
              onClick={() => handleNext()}
              className={`fixed bottom-8 right-8 group flex items-center gap-2 px-6 py-3 
                     transform transition-all duration-300 ease-out
                     hover:translate-x-1 focus:outline-none focus:ring-2 
                     focus:ring-slate-400 rounded-md
                     ${
                       sectionError && progress == 2
                         ? "border border-solid border-red-500 text-red-500 dark:border-red-500 dark:text-red-500"
                         : "border border-solid border-primary dark:border-secondary dark:text-secondary"
                     }`}
            >
              {progress < 3 ? "Next" : "Finish"}
              <ArrowRight01Icon className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserOnboardingScreen;
