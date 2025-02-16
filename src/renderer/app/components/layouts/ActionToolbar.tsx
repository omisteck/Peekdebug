import { useEffect, useState } from "react";
import WindowControls from "./WindowControls";
import {
  LeftToRightListStarIcon,
  PlaySquareIcon,
  PauseIcon,
  PropertySearchIcon,
  NoteAddIcon,
  Moon01Icon,
  Sun03Icon,
  NoteRemoveIcon,
} from "hugeicons-react";
import SearchDropdown from "../shared/SearchDropdown";
import TabsDropdown from "../shared/TabDropdown";
import { Theme } from "../../../../shared/types/preferences.type";
import "animate.css";

type WebkitAppRegionStyle = React.CSSProperties & {
  WebkitAppRegion?: "drag" | "no-drag";
};

// Add interface for Tab type
interface Tab {
  id: string;
  isActive: boolean;
  logs: any[];
}

// Define a type for logs
interface Log {
  payloads: any[]; // Define the structure of payloads if known
  // Add other properties of the log if needed
}

// Update the component props interface
interface ActionToolbarProps {
  children: React.ReactNode;
  tabs: Tab[];
  setTabs: React.Dispatch<React.SetStateAction<Tab[]>>;
  activeTabIndex: number;
  setActiveTabIndex: React.Dispatch<React.SetStateAction<number>>;
  setSearchResults: React.Dispatch<React.SetStateAction<any[]>>;
}

const ActionToolbar = ({
  children,
  tabs,
  setTabs,
  activeTabIndex,
  setActiveTabIndex,
  setSearchResults,
}: ActionToolbarProps) => {
  
  const [isRecording, setIsRecording] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [port, setPort] = useState(0);
  useEffect(() => {
    const handleDragStart = () => {
      // Tell electron this is a draggable region
      window.electron?.startDrag();
    };

    const toolbar = document.getElementById("window-toolbar");
    if (toolbar) {
      toolbar.addEventListener("mousedown", handleDragStart);
    }

    // Initialize theme
    const initializeTheme = async () => {
      const theme = (await window.api.invoke("get-theme")) as Theme;
      setIsDark(theme === "dark");
    };

    initializeTheme();

    return () => {
      if (toolbar) {
        toolbar.removeEventListener("mousedown", handleDragStart);
      }
    };
  }, []);

  const handleAddTab = () => {
    const newTabId = `tab-${Date.now()}`;
    setTabs((prevTabs: Tab[]) => {
      const newTabs = [
        ...prevTabs.map((tab: Tab) => ({ ...tab, isActive: false })),
        { id: newTabId, isActive: true, logs: [] },
      ];

      const newIndex = newTabs.length - 1;
      setActiveTabIndex(newIndex);

      return newTabs;
    });
  };

  const toggleTheme = () => {
    window.api.invoke("save-theme", { theme: !isDark ? "dark" : "light" });

    if (isDark) {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }

    setIsDark(!isDark);
  };

  const handleToggleLogReceiving = async () => {
    const isReceivingEnabled: boolean = (await window.api.invoke(
      "toggle-log-receiving"
    )) as boolean;
    setIsRecording(isReceivingEnabled);
  };

  const handleSearch = (query: string): void => {
    setSearchResults([]);
    let filteredLogs: Log[] = []; // Use the defined Log type

    if (query.length) {
      const activeTab = tabs[activeTabIndex];

      if (!activeTab) return;

      // Case-insensitive search across all text content
      const searchQuery = query.toLowerCase();
      filteredLogs = activeTab.logs.filter((log: Log) => {
        // Convert all searchable content to string and lowercase
        const searchableContent = JSON.stringify(log.payloads).toLowerCase();
        return searchableContent.includes(searchQuery);
      });

    }
    
    setSearchResults(filteredLogs);
  };

  const clearLogs = () => {
    setTabs((prevTabs: Tab[]) =>
      prevTabs.map((tab: Tab, index: number) =>
        index === activeTabIndex ? { ...tab, logs: [] } : tab
      )
    );
  };

  useEffect(() => {
    const getPort = async () => {
      const portNumber = (await window.api.invoke("get-port-number")) as number;
      setPort(portNumber);
    };

    getPort();
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div
        id="window-toolbar"
        className="w-full bg-white dark:bg-darkprimary sticky top-0 z-50 p-2 flex items-center justify-between"
        style={{ WebkitAppRegion: "drag" } as WebkitAppRegionStyle}
      >
        <div
          className="flex items-center gap-2 select-none"
          style={{ WebkitAppRegion: "no-drag" } as WebkitAppRegionStyle}
        >
          <WindowControls />

          {/* Navigation Controls */}
          <div className="flex items-center gap-2  border-r border-gray-200">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`p-1.5 rounded-xl transition-all duration-200
              backdrop-blur-sm relative
              ${
                isDropdownOpen
                  ? "bg-[#C2EB2C]/10 text-[#C2EB2C] shadow-lg shadow-[#C2EB2C]/10"
                  : "text-gray-400 hover:text-[#C2EB2C]/80 hover:bg-[#C2EB2C]/5"
              }`}
              title="Tabs"
            >
              <LeftToRightListStarIcon className="w-6 h-6" />

              {/* Tabs Dropdown */}
              <TabsDropdown
                isOpen={isDropdownOpen}
                onClose={() => setIsDropdownOpen(false)}
                onTabSelect={(tabId) => {
                  tabs.map((tab, index) => {
                    if (tab.id === tabId) {
                      tab.isActive = true;
                      setActiveTabIndex(index);
                    } else {
                      tab.isActive = false;
                    }
                  });
                }}
                onTabRemove={(tabId) => {
                  const index = tabs.findIndex((tab) => tab.id === tabId);
                  setTabs((prevTabs) =>
                    prevTabs.filter((tab) => tab.id !== tabId)
                  );
                  if (tabs.length > 0) {
                    // set the active tab to the next one
                    const newIndex = tabs.length - 1 > 0 ? index - 1 : 0;
                    setActiveTabIndex(newIndex);

                    // set the active tab to the next one
                    setTabs((prevTabs) =>
                      prevTabs.map((tab, index) => ({
                        ...tab,
                        isActive: index === newIndex,
                      }))
                    );
                  }
                }}
                activeTabIndex={activeTabIndex}
                setActiveTabIndex={setActiveTabIndex}
                tabs={tabs}
              />
            </button>

            <button
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
              title="Add Tab"
              onClick={handleAddTab}
            >
              <NoteAddIcon className="w-6 h-6" />
            </button>
            <button
              className={`p-1.5 rounded transition-colors duration-200 animate__animated ${
                isRecording
                  ? "text-green-500 hover:text-green-600 hover:bg-green-50 animate__pulse animate__infinite"
                  : "text-red-500 hover:text-red-600 hover:bg-red-50"
              }`}
              onClick={handleToggleLogReceiving}
              title={isRecording ? "Pause Recording" : "Start Recording"}
            >
              {isRecording ? (
                <PauseIcon className="w-6 h-6" />
              ) : (
                <PlaySquareIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Status Indicators */}
        <div
          className="flex items-center gap-2"
          style={{ WebkitAppRegion: "no-drag" } as WebkitAppRegionStyle}
        >
          <div className="flex items-center bg-[#0C2501]/5 dark:bg-[#C2EB2C]/5 px-3 py-1.5 rounded-lg border border-[#0C2501]/10 dark:border-[#C2EB2C]/10">
            {/* Logo & Text */}
            <div className="flex items-center">
              <h3 className="text-[#0C2501] dark:text-[#C2EB2C] text-lg font-semibold">
                Peek
              </h3>

              {/* Version Badge */}
              <div className="flex items-center ml-2 gap-1.5">
                <span className="px-2 py-0.5 text-xs font-medium bg-[#C2EB2C]/10 text-[#C2EB2C] rounded-full">
                  Beta
                </span>

                {/* Port Number */}
                {port > 0 && (
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C2EB2C] animate-pulse" />
                    <span className="font-mono text-xs text-[#0C2501]/60 dark:text-[#C2EB2C]/60">
                      :{port}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div
          className="flex items-center gap-2 border-l border-gray-200 select-none"
          style={{ WebkitAppRegion: "no-drag" } as WebkitAppRegionStyle}
        >
          <button
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
            title="Clear Logs"
            onClick={clearLogs}
          >
            <NoteRemoveIcon className="w-6 h-6" />
          </button>

          <button
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
            title="Screenshot"
            onClick={toggleTheme}
          >
            {isDark ? (
              <Sun03Icon className="w-6 h-6" />
            ) : (
              <Moon01Icon className="w-6 h-6" />
            )}
          </button>
          {/* 
          <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded" title="Screenshot">
            <Camera01Icon className="w-6 h-6" />
          </button> */}
          <button
            className="p-1.5 text-gray-400 relative hover:text-gray-600 hover:bg-gray-100 rounded"
            title="Search"
            onClick={() => setIsSearchOpen(true)}
          >
            <PropertySearchIcon className="w-6 h-6" />

            {/* Search Dropdown */}
            <SearchDropdown
              isOpen={isSearchOpen}
              onClose={() => setIsSearchOpen(false)}
              onSearch={handleSearch}
              onClearSearch={() => setSearchResults([])}
            />
          </button>
        </div>
      </div>
      <div className="flex-grow flex items-center justify-center dark:bg-darkprimary bg-white overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default ActionToolbar;
