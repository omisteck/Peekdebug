import { useState } from "react";
import { Moon01Icon, Settings02Icon, DatabaseSync01Icon, GiftIcon } from "hugeicons-react";
import WindowControls from "../../layouts/WindowControls";

function SideBar({
    progress,
    setProgress,
    handleNext
}: {
    progress: number;
    setProgress: (progress: number) => void;
    handleNext: (passedProgress?: number, nextProgress?: number) => void;
}) {

 const [sideBarOptions] = useState([
    { icon: <Moon01Icon className="w-5 h-5" />, label: "Theme Mode" , progress: 0 },
    { icon: <Settings02Icon className="w-5 h-5" />, label: "Settings" , progress: 1 },
    { icon: <DatabaseSync01Icon className="w-5 h-5" />, label: "Sync Hub" , progress: 2 },
    { icon: <GiftIcon className="w-5 h-5" />, label: "Connect with Me" , progress: 3 }
 ])

 const handleSideBarClick = (passedProgress: number) => {
    handleNext(progress, passedProgress);
    setProgress(passedProgress);
 };


    return (
      <div className={`w-64 px-4 h-full !border-r transition-colors
          dark:bg-darkprimary dark:!border-solid  dark:!border-secondary dark:!border-opacity-10' 
          bg-primary bg-opacity-5 border-primary border-opacity-10`}>
      <WindowControls />
        <div className={` py-4`}
          >
            
            <div className="mb-8">
              <h2 className={`text-lg font-semibold px-4 dark:text-secondary text-primary`}>
                Setup Guide
              </h2>
              <p className={`text-sm mt-1 px-4 dark:text-secondary dark:text-opacity-60 text-primary text-opacity-60`}>
                Complete your profile setup
              </p>
            </div>
            
            <ul className="space-y-2">
              {sideBarOptions.map((item, index) => (
                <li key={index}>
                  <button
                  key={index}
                  className={`flex w-full items-center gap-3 p-4 rounded-lg cursor-pointer transition-all
                  ${progress === index 
                    ? 'dark:bg-secondary dark:bg-opacity-20 dark:text-secondarybg-secondary bg-opacity-20 text-primary'
                    : 'dark:text-secondary dark:text-opacity-70 dark:hover:bg-secondary dark:hover:bg-opacity-10 text-primary text-opacity-70 hover:bg-secondary hover:bg-opacity-10'}`}
                    onClick={() => handleSideBarClick(item.progress)}
                    disabled={progress < index}
                  >
                    {item.icon}
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
    
            <div className="mt-8 px-4">
              <div className={`w-full rounded-full h-2 dark:bg-white dark:bg-opacity-10 bg-primary bg-opacity-10`}>
                <div 
                  className="bg-secondary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((progress + 1) / 4) * 100}%` }}
                />
              </div>
              <p className={`text-sm mt-2 dark:text-secondary dark:text-opacity-60 text-primary text-opacity-60`}>
                Step {progress + 1} of 4
              </p>
            </div>
          </div>
          </div>
    );
}

export default SideBar;