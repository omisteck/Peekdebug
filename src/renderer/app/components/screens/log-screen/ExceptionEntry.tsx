import React, { useState } from 'react';
import { ArrowDown01Icon, ArrowRight01Icon, Alert02Icon, SourceCodeSquareIcon } from "hugeicons-react";

const ExceptionEntry = ({ content }: { content: { class: string, message: string, frames: any[] } }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-lg border border-solid border-red-200 dark:border-red-900 bg-white dark:bg-slate-900 mb-2 overflow-hidden shadow-sm">
      {/* Header with Exception Class */}
      <div className="border-b border-red-200 border-solid dark:border-red-900 bg-red-50/50 dark:bg-red-950/50 p-3">
        <div className="flex items-start gap-3">
          <Alert02Icon className="w-5 h-5 text-red-500 dark:text-red-400 mt-1 flex-shrink-0" />
          <div>
            <div className="text-sm text-red-400 dark:text-red-500">Class</div>
            <div className="font-mono text-red-600 dark:text-red-300 font-medium">
              {content.class}
            </div>
          </div>
        </div>
      </div>

      {/* Message Section */}
      <div className="p-3 border-b border-solid border-red-100 dark:border-red-900 bg-red-50/30 dark:bg-red-950/30">
        <div className="font-mono text-red-600 dark:text-red-300">
          {content.message}
        </div>
      </div>

      {/* Frames Section */}
      <div className="p-3">
        <div 
          className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 p-1 rounded"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <button className="p-1 hover:bg-red-50 dark:hover:bg-red-950 rounded">
            {isExpanded ? (
              <ArrowDown01Icon className="w-4 h-4 text-red-500 dark:text-red-400" />
            ) : (
              <ArrowRight01Icon className="w-4 h-4 text-red-500 dark:text-red-400" />
            )}
          </button>
          <SourceCodeSquareIcon className="w-4 h-4 text-red-500 dark:text-red-400" />
          <span className="text-red-600 dark:text-red-300 font-medium">
            Stack Trace
            <span className="ml-2 text-red-400 dark:text-red-500 text-sm font-normal">
              {content.frames.length} frames
            </span>
          </span>
        </div>

        {isExpanded && (
          <div className="mt-2 pl-4 border-l border-solid border-red-100 dark:border-red-900 space-y-1">
            {content.frames.map((frame, index) => (
              <div 
                key={index}
                className="font-mono text-sm py-0.5 text-slate-600 dark:text-slate-300 hover:bg-red-50/50 dark:hover:bg-red-950/50 rounded px-2"
              >
                <span className="text-slate-400 dark:text-slate-500 inline-block w-8 mr-2">{frame.line_number}</span>
                <span>{frame.class || frame.file_name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExceptionEntry;