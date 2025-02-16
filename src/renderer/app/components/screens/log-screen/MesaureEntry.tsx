import React from 'react';
import { Clock01Icon } from "hugeicons-react";
import {formatTime, formatDuration} from '../../../../../shared/utils/date-time.util';

interface ContentProps {
    is_new_timer: boolean;
    max_memory_usage_during_total_time: number;
    max_memory_usage_since_last_call: number;
    name: string;
    time_since_last_call: number;
    total_time: number;
}

const formatMemory = (bytes: number): string => {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(2)} MB`;
};

const Measure = ({content}: {content: ContentProps}) => {
  
    return (
      <div className="w-full max-w-3xl space-y-4">

        {content.is_new_timer && (
          <div className="flex items-center space-x-2">
            <Clock01Icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Start measuring performance...
          </span>
        </div>
        )}
        
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-solid border-gray-200 dark:border-gray-700 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm dark:text-gray-300">
                  {formatTime(new Date())}
                </span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm dark:text-gray-300">
                  Measure
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Total time</span>
                <span className="text-sm font-medium dark:text-gray-200">{formatDuration(content.total_time)}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Maximum memory usage</span>
                <span className="text-sm font-medium dark:text-gray-200">{formatMemory(content.max_memory_usage_since_last_call)}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Total maximum memory usage</span>
                <span className="text-sm font-medium dark:text-gray-200">{formatMemory(content.max_memory_usage_during_total_time)}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Time since last call</span>
                <span className="text-sm font-medium dark:text-gray-200">{formatDuration(content.time_since_last_call)}</span>
              </div>
            </div>
            
            <div className="pt-2 text-sm text-gray-500 dark:text-gray-400">
              CallableDispatcher.php:40
            </div>
          </div>
      </div>
    );
  };

export default Measure;