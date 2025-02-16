import React from "react";

function WindowControls() {
    const handleClose = () => {
        window.api.invoke('hide-window');
    }

    const handleMinimize = () => {
        window.api.invoke('minimize-window');
    }

    const handleMaximize = () => {
        window.api.invoke('maximize-window');
    }

  return (
    <div className="p-3">
      <div className="grid grid-cols-3 gap-2 max-w-16 window-controls z-50">
        <button className="w-3 h-3 bg-primary/30 dark:bg-secondary/30 hover:bg-red-500 rounded-full" onClick={handleClose}></button>
        <button className="w-3 h-3 bg-primary/30 dark:bg-secondary/30 hover:bg-yellow-500 rounded-full" onClick={handleMinimize}></button>
        <button className="w-3 h-3 bg-primary/30 dark:bg-secondary/30 hover:bg-green-500 rounded-full" onClick={handleMaximize}></button>
      </div>
    </div>
  );
}

export default WindowControls;
