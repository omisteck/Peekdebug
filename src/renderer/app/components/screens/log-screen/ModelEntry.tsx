import { useState } from "react";
import { ArrowDown01Icon, ArrowRight01Icon, DatabaseIcon, FileScriptIcon  } from "hugeicons-react";
import TreeItem from "./TreeItem";


interface ModelEntryProps {
    content: any;
}

const ModelEntry = ({ content }: ModelEntryProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
  
    return (
      <div className="rounded-lg border border-solid border-purple-200 bg-purple-50/50 dark:bg-darkprimary mb-2 overflow-hidden">
        {/* Header with Class Name */}
        <div className="border-b border-solid border-purple-200 bg-white/50 dark:bg-darkprimary p-4">
          <div className="flex items-start gap-3">
            <FileScriptIcon className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
            <div>
              <div className="text-sm text-purple-400">Class Name</div>
              <div className="font-mono text-purple-600 text-lg">
                {content.class_name}
              </div>
            </div>
          </div>
        </div>
  
        {/* Attributes Section */}
        <div className="p-4">
          <div 
            className="flex items-center gap-2 mb-4 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <button className="p-1 hover:bg-purple-100 rounded">
              {isExpanded ? (
                <ArrowDown01Icon className="w-4 h-4 text-purple-500" />
              ) : (
                <ArrowRight01Icon className="w-4 h-4 text-purple-500" />
              )}
            </button>
            <DatabaseIcon className="w-4 h-4 text-purple-500" />
            <span className="text-purple-600">Attributes</span>
          </div>
  
          {isExpanded && (
            <div className="pl-12 font-mono">
              <TreeItem 
                value={content.attributes} 
                textColor="text-purple-600"
                depth={0}
              />
            </div>
          )}
        </div>
      </div>
    );
  };

export default ModelEntry;