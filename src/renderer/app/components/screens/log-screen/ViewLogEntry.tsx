import React, { useState } from 'react';
import { ArrowDown01Icon, ArrowRight01Icon, File01Icon, SourceCodeSquareIcon, FolderOpenIcon } from "hugeicons-react";
import TreeItem from './TreeItem';

const ViewLogEntry = ({ data, viewPath, viewPathRelative }: { data: any, viewPath: string, viewPathRelative: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-lg border border-solid border-emerald-200 dark:border-emerald-900 bg-white dark:bg-slate-900 mb-2 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="border-b border-solid border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/50 p-3">
        <div className="flex items-start gap-3">
          <File01Icon className="w-5 h-5 text-emerald-500 dark:text-emerald-400 mt-1 flex-shrink-0" />
          <div>
            <div className="text-sm text-emerald-500 dark:text-emerald-400">View</div>
            <div className="font-mono text-emerald-700 dark:text-emerald-300 text-sm">
              {viewPathRelative}
            </div>
          </div>
        </div>
      </div>

      {/* View Details */}
      <div className="p-3">
        <div 
          className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 p-1 rounded"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <button className="p-1 hover:bg-emerald-50 dark:hover:bg-emerald-950 rounded">
            {isExpanded ? (
              <ArrowDown01Icon className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            ) : (
              <ArrowRight01Icon className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            )}
          </button>
          <SourceCodeSquareIcon className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
          <span className="text-emerald-600 dark:text-emerald-300 font-medium">
            View Data
          </span>
        </div>

        {isExpanded && (
          <div className="mt-3 space-y-3">
            {/* Full Path */}
            <div className="pl-4 space-y-1">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <FolderOpenIcon className="w-4 h-4" />
                <span>Full Path</span>
              </div>
              <div className="font-mono text-sm text-slate-700 dark:text-slate-300 pl-6 break-all">
                {viewPath}
              </div>
            </div>

            {/* View Data */}
            <div className="pl-4 space-y-1">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <SourceCodeSquareIcon className="w-4 h-4" />
                <span>Data</span>
              </div>
              <div className="ml-6 rounded bg-slate-50 dark:bg-slate-800 p-3">
                <TreeItem value={data} textColor="text-slate-700 dark:text-slate-300" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewLogEntry;