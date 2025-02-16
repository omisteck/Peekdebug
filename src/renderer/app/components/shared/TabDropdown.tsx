import { useEffect, useRef, KeyboardEvent } from "react";
import {  Delete02Icon } from "hugeicons-react";

interface Tab {
  id: string;
  isActive: boolean;
  logs: any[];
}

interface TabsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onTabSelect?: (tabId: string) => void;
  tabs?: Tab[];
  activeTabIndex: number;
  setActiveTabIndex: (index: any) => void;
  onTabRemove?: (tabId: string) => void;
}

const TabsDropdown = ({ 
  isOpen, 
  onClose,
  onTabSelect,
  tabs,
  activeTabIndex,
  setActiveTabIndex,
  onTabRemove
}: TabsDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveTabIndex((prev: number) => Math.min(prev + 1, tabs.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveTabIndex((prev: number) => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        onTabSelect?.(tabs[activeTabIndex].id);
        break;
      case 'Escape':
        e.preventDefault();
        onClose();
        break;
    }
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleTabClick = (tabId: string) => {
    onTabSelect?.(tabId);
  };

  const removeTab = (tabId: string) => {
    onTabRemove?.(tabId);
  };

  return (
    <div 
      ref={dropdownRef}
      role="menu"
      aria-orientation="vertical"
      aria-label="Tabs menu"
      onKeyDown={handleKeyDown}
      tabIndex={isOpen ? 0 : -1}
      className={`absolute left-0 top-full mt-2 w-44 
        backdrop-blur-lg bg-white dark:bg-[#0C2501]/80
        overflow-hidden rounded-2xl shadow-lg
        border border-white/20 dark:border-[#C2EB2C]/20
        transform transition-all duration-200 ease-out
        overflow-y-auto
        max-h-[300px]
        ${isOpen 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'}`}
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent dark:from-[#C2EB2C]/5" />

      <div className="relative">
        {tabs.map((tab, index) => (
          <span
            key={tab.id}
            role="menuitem"
            onClick={() => handleTabClick(tab.id)}
            aria-selected={tab.isActive}
            tabIndex={isOpen ? 0 : -1}
            className={`w-full flex items-center px-4 py-3
              relative overflow-hidden
              transition-all duration-200 group
              cursor-pointer
              ${index === activeTabIndex ? 'bg-[#C2EB2C]/5' : ''}
              ${index !== tabs.length - 1 ? 'border-b border-gray-100/10' : ''}`}
          >
            
            <div onClick={() => handleTabClick(tab.id)} className="flex items-center">
            {/* Active Tab Indicator */}
            <div className={`absolute left-0 top-0 bottom-0 w-[2px] rounded-r
              transition-all duration-300 transform
              ${tab.isActive 
                ? 'bg-[#C2EB2C] scale-y-100' 
                : 'bg-[#C2EB2C]/30 scale-y-0 group-hover:scale-y-100'}`} 
            />

            {/* Tab Number */}
            <div className={`mr-3 text-xs font-mono
              ${tab.isActive 
                ? 'text-[#C2EB2C]' 
                : 'text-gray-400 dark:text-gray-500 group-hover:text-[#C2EB2C]/70'}`}>
              {String(index+1).padStart(2, '0')}
            </div>

            {/* Tab Name */}
            <span className={`text-sm transition-colors duration-200
              ${tab.isActive 
                ? 'text-[#C2EB2C] font-medium' 
                : 'text-gray-600 dark:text-gray-400 group-hover:text-[#C2EB2C]/90'}`}>
              {'Tab'}
            </span>
            </div>
            {/* Active Indicator Dot */}
            <a className={`ml-auto w-3 h-3 rounded-full`} onClick={() => removeTab(tab.id)}>
              <Delete02Icon className="w-3 h-3" />
            </a>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TabsDropdown;


