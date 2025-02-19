import React, { useState } from 'react';
import { ArrowDown01Icon, ArrowRight01Icon, FloppyDiskIcon, TextIcon, SecondBracketSquareIcon, GridIcon } from "hugeicons-react";
import TreeItem from './TreeItem';
import { formatTime } from '../../../../../shared/utils/date-time.util'


const CacheMetadataLog = ({ keyName, value, type }: { keyName: string, value: any, type: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
console.log(keyName)
  const getTypeColor = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'Hit':
        return 'text-purple-600 dark:text-purple-400';
      case 'Key written':
        return 'text-green-600 dark:text-green-400';
      case 'Key forgotten':
        return 'text-blue-600 dark:text-blue-400';
      case 'Missed':
        return 'text-orange-600 dark:text-orange-400';
    
    }
  };

  return (
    <div className="rounded-lg border border-solid border-cyan-200 dark:border-cyan-900 bg-white dark:bg-slate-900 shadow-sm">
      {/* Header */}
      <div className="flex items-center p-2 gap-2 border-b border-solid border-cyan-100 dark:border-cyan-900">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 hover:bg-cyan-50 dark:hover:bg-cyan-900/50 rounded"
        >
          {isExpanded ? (
            <ArrowDown01Icon className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
          ) : (
            <ArrowRight01Icon className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
          )}
        </button>
        <FloppyDiskIcon className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
        <div className="flex-1 flex items-center gap-3">
          {/* Cache Key */}
          <div className="flex items-center gap-1.5 font-mono text-sm">
            <span className="text-slate-400 dark:text-slate-500">key:</span>
            <span className="text-slate-700 dark:text-slate-300">{keyName}</span>
          </div>
          {/* Type Badge */}
          <div className="flex items-center gap-1 px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-xs">
            <TextIcon className="w-3 h-3 text-slate-400 dark:text-slate-500" />
            <span className={getTypeColor(type)}>{type}</span>
          </div>
        </div>
        {/* Timestamp */}
        <div className="text-xs text-slate-400 dark:text-slate-500 font-mono">
          {formatTime(new Date())}
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-3 space-y-2">
          {/* Details Grid */}
          <div className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-2 text-sm">
            {/* Key Row */}
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <GridIcon className="w-4 h-4" />
              <span>Key</span>
            </div>
            <div className="font-mono text-slate-700 dark:text-slate-300">
              {keyName}
            </div>

            {/* Type Row */}
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <TextIcon className="w-4 h-4" />
              <span>Type</span>
            </div>
            <div className={`font-mono ${getTypeColor(type)}`}>
              {type}
            </div>

            {/* Value Row */}
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <SecondBracketSquareIcon className="w-4 h-4" />
              <span>Value</span>
            </div>
            <div className="font-mono">
              <div className="bg-slate-50 dark:bg-slate-800 rounded-md p-2 overflow-x-auto">
                <TreeItem value={value} textColor={getTypeColor(type)} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CacheMetadataLog;