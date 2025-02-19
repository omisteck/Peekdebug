import { useEffect, useRef, useState } from "react";
import { Search01Icon, CancelSquareIcon } from "hugeicons-react";


interface SearchDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch?: (query: string) => void;
  onClearSearch?: () => void;
  isLoading?: boolean;
}

const SearchDropdown = ({ 
  isOpen, 
  onClose,
  onSearch,
  onClearSearch,
  isLoading = false 
}: SearchDropdownProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
  

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setSearchQuery("");
    }
  }, [isOpen]);

  // Update search handling
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    onClearSearch();
  };

  
  return (
    <div
      ref={dropdownRef}
      role="dialog"
      aria-label="Search dropdown"
      className={`absolute right-0 top-full mt-2 w-60 bg-white dark:bg-darkprimary 
        border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg 
        transform transition-all duration-200 ease-in-out ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}
    >
      {/* Search Input */}
      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <Search01Icon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            role="searchbox"
            aria-label="Search logs"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search logs..."
            className="w-full pl-10 pr-10 py-2 bg-gray-50 dark:bg-gray-800 
              border border-gray-200 dark:border-gray-700 rounded-md
              focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-500/40
              text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
          {searchQuery && (
            <a href="#"
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 
                text-gray-400 hover:text-gray-600"
            >
              <CancelSquareIcon className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
  
      {/* Search Results */}
      <div 
        className="max-h-96 overflow-y-auto"
        role="listbox"
        aria-label="Search results"
      >
        {isLoading ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            Loading results...
          </div>
        ) : (
          <div className="p-3 text-center text-sm text-gray-500 dark:text-gray-400">
            Type to start searching...
          </div>
        )}
      </div>
    </div>
  );
};
  
export default SearchDropdown;