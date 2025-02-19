import { ArrowDown01Icon, ArrowRight01Icon, PlaySquareIcon, StopWatchIcon, SourceCodeSquareIcon  } from "hugeicons-react";
import TreeItem from "./TreeItem";
import { useState } from "react";

interface JobEntryProps {
    content: any;
}

const JobEventEntry = ({ content }: JobEntryProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
  
    return (
      <div className="rounded-lg border border-solid border-orange-200 bg-orange-50/50 dark:bg-darkprimary/40 mb-2 overflow-hidden">
        {/* Header with Job Class */}
        <div className="border-b border-solid border-orange-200 bg-white/50 dark:bg-darkprimary p-4">
          <div className="flex items-start gap-3">
            <PlaySquareIcon className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
            <div>
              <div className="text-sm text-orange-400">Job Class</div>
              <div className="font-mono text-orange-600 text-lg">
                {content.payload.name || content.payload.displayName || content.event_name}
              </div>
            </div>
          </div>
        </div>
  
        {/* Content Sections */}
        <div className="divide-y divide-orange-100">
          {/* Status Section */}
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                
                <StopWatchIcon className="w-4 h-4 text-orange-500" />
                <span className="text-orange-600">Queue</span>
              </div>
              <span className="text-orange-600 font-mono">{content.payload.displayName ||  content.event_name}</span>
            </div>
          </div>
  
          {/* Payload Section */}
          <div className="p-4">
            <div 
              className="flex items-center gap-2 mb-2 cursor-pointer"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <button className="p-1 hover:bg-orange-100 rounded">
                {isExpanded ? (
                  <ArrowDown01Icon className="w-4 h-4 text-orange-500" />
                ) : (
                  <ArrowRight01Icon className="w-4 h-4 text-orange-500" />
                )}
              </button>
              <SourceCodeSquareIcon className="w-4 h-4 text-orange-500" />
              <span className="text-orange-600">Payload</span>
            </div>
            {isExpanded && (
              <div className="pl-12 font-mono">
                <TreeItem 
                  value={content?.payload?.data || content?.job} 
                  textColor="text-orange-600"
                  depth={0}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

export default JobEventEntry;