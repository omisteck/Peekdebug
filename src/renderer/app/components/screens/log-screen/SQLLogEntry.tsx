import React, { useState } from 'react';
import { ArrowDown01Icon, ArrowRight01Icon, Clock01Icon, DatabaseIcon, Alert01Icon } from "hugeicons-react";


const formatSQLQuery = (sql: string) => {
  // Split the SQL into parts
  const parts = sql.split(/(['"\\]|\s+)/);
  
  return parts.map((part, index) => {
    // Keywords
    if (/^(update|set|select|from|where|and|or|insert|into|values|delete)$/i.test(part)) {
      return (
        <span key={index} className="text-blue-600 dark:text-blue-400 font-medium">
          {part}
        </span>
      );
    }
    // Strings (quoted values)
    else if (part.startsWith("'") || part.startsWith('"')) {
      return (
        <span key={index} className="text-green-600 dark:text-green-400">
          {part}
        </span>
      );
    }
    // Table names or quoted identifiers
    else if (part.startsWith('"') || part.startsWith('`')) {
      return (
        <span key={index} className="text-purple-600 dark:text-purple-400">
          {part}
        </span>
      );
    }
    // Operators and special characters
    else if (/^[=<>!+\-*/%(),.;]+$/.test(part)) {
      return (
        <span key={index} className="text-yellow-600 dark:text-yellow-400">
          {part}
        </span>
      );
    }
    // Numbers
    else if (/^\d+(\.\d+)?$/.test(part)) {
      return (
        <span key={index} className="text-orange-600 dark:text-orange-400">
          {part}
        </span>
      );
    }
    // Default styling
    return <span key={index}>{part}</span>;
  });
};

 // Format time display
 const formatTime = (ms: number) => {
  if (ms >= 1000) {
    return `${(ms/1000).toFixed(2)}s`;
  }
  return `${ms.toFixed(2)}ms`;
};



const SQLLogEntry = ({ connectionName, sql, time, isSlow, isSlowThreshold }: { connectionName: string, sql: string, time: number, isSlow: boolean, isSlowThreshold?: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Get color classes based on query time
  const getTimeColorClasses = (isSlow: boolean) => {
    if (isSlow) {
      return 'bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400';
    }

    return 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400';
  };


  return (
    <div className={`
      rounded-lg border border-solid mb-2 overflow-hidden shadow-sm 
      ${isSlow 
        ? 'border-red-200 dark:border-red-900 bg-white dark:bg-slate-900' 
        : 'border-indigo-200 dark:border-indigo-900 bg-white dark:bg-slate-900'
      }
    `}>
      {/* Header with timing warning */}
      <div className={`
        border-b p-3 border-solid
        ${isSlow 
          ? 'border-red-200 dark:border-red-900 bg-red-50/50 dark:bg-red-950/50' 
          : 'border-indigo-200 dark:border-indigo-900'
        }
      `}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              className={`
                p-1 rounded 
                ${isSlow 
                  ? 'hover:bg-red-100 dark:hover:bg-red-900' 
                  : 'hover:bg-indigo-50 dark:hover:bg-indigo-950'
                }
              `}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <ArrowDown01Icon className={`
                  w-4 h-4 
                  ${isSlow 
                    ? 'text-red-500 dark:text-red-400' 
                    : 'text-indigo-500 dark:text-indigo-400'
                  }
                `} />
              ) : (
                <ArrowRight01Icon className={`
                  w-4 h-4 
                  ${isSlow 
                    ? 'text-red-500 dark:text-red-400' 
                    : 'text-indigo-500 dark:text-indigo-400'
                  }
                `} />
              )}
            </button>
            <DatabaseIcon className={`
              w-4 h-4 
              ${isSlow 
                ? 'text-red-500 dark:text-red-400' 
                : 'text-indigo-500 dark:text-indigo-400'
              }
            `} />
            <span className={`
              font-medium 
              ${isSlow 
                ? 'text-red-600 dark:text-red-300' 
                : 'text-indigo-600 dark:text-indigo-300'
              }
            `}>
              {connectionName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isSlow && (
              <div className="flex items-center gap-1.5 px-2 py-1 bg-red-100 dark:bg-red-950 rounded text-red-600 dark:text-red-400">
                <Alert01Icon className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">Slow Query</span>
              </div>
            )}
            <div className={`
              flex items-center gap-1 px-2 py-1 rounded 
              ${getTimeColorClasses(isSlow)}
            `}>
              <Clock01Icon className="w-3.5 h-3.5" />
              <span className="font-mono text-xs">
                {formatTime(time)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Query Details */}
      {isExpanded && (
        <div className="p-3 font-mono text-sm">
          <div className="rounded bg-slate-50 dark:bg-slate-800 p-3">
            <div className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap break-words">
              {formatSQLQuery(sql)}
            </div>
          </div>
          
          {isSlow && (
            <div className="mt-3 p-3 bg-red-50 dark:bg-red-950 rounded border border-solid border-red-100 dark:border-red-900">
              <div className="flex items-start gap-2 text-sm text-red-600 dark:text-red-400">
                <Alert01Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium">Query exceeded threshold</span>
                  <span className="mx-1">·</span>
                  <span>Query took {formatTime(time)} to execute (threshold: {formatTime(isSlowThreshold)})</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SQLLogEntry;