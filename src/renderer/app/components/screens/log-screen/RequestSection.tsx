import React, { useState } from 'react';
import { ArrowDown01Icon, ArrowRight01Icon } from 'hugeicons-react';
import TreeItem from './TreeItem';


interface RequestSectionProps {
  title: string;
  content: any;
  defaultOpen?: boolean;
}

const RequestSection = ({ title, content, defaultOpen = false }: RequestSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-solid border-gray-200 dark:border-gray-800">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800/50"
      >
        {isOpen ? (
          <ArrowDown01Icon className="w-4 h-4 text-gray-500" />
        ) : (
          <ArrowRight01Icon className="w-4 h-4 text-gray-500" />
        )}
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</span>
      </button>
      
      {isOpen && (
        <div className="px-4 py-3 font-mono text-sm">
          <TreeItem value={content}/>
        </div>
      )}
    </div>
  );
};

export default RequestSection;