import React, { useState } from 'react';
import { ArrowDown01Icon, ArrowRight01Icon, ZapIcon, Activity03Icon } from "hugeicons-react";
import TreeItem from './TreeItem';

const EventLogEntry = ({  event, name, payload, isClassBased }: { event: string, name: string, payload: any, isClassBased: boolean }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-lg border border-solid border-blue-200 dark:border-blue-900 bg-white dark:bg-slate-900 mb-2 overflow-hidden shadow-sm">
      {/* Header with Event Name */}
      <div className="border-b border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/50 p-3">
        <div className="flex items-start gap-3">
          <Activity03Icon className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-1 flex-shrink-0" />
          <div className="space-y-1">
            <div className="text-sm text-blue-400 dark:text-blue-500">Event</div>
            <div className="font-mono text-blue-600 dark:text-blue-300 font-medium">
              {name}
            </div>
            {isClassBased && (
              <div className="inline-flex items-center gap-1.5">
                <ZapIcon className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                <span className="text-xs text-blue-500 dark:text-blue-400 font-medium">
                  Class Based Event
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="p-3">
        <div 
          className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 p-1 rounded"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <button className="p-1 hover:bg-blue-50 dark:hover:bg-blue-950 rounded">
            {isExpanded ? (
              <ArrowDown01Icon className="w-4 h-4 text-blue-500 dark:text-blue-400" />
            ) : (
              <ArrowRight01Icon className="w-4 h-4 text-blue-500 dark:text-blue-400" />
            )}
          </button>
          <span className="text-blue-600 dark:text-blue-300 font-medium">
            Event Details
          </span>
        </div>

        {isExpanded && (
          <div className="mt-3 pl-4 border-l border-solid border-blue-100 dark:border-blue-900 space-y-3">
            {/* Event Class */}
            <div className="space-y-1">
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Event Class
              </div>
              <div className="font-mono text-sm text-slate-700 dark:text-slate-300">
                <TreeItem value={event} textColor="text-slate-700 dark:text-slate-300" />
              </div>
            </div>

            {/* Payload */}
            <div className="space-y-1">
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Payload
              </div>
              <div className="font-mono text-sm text-slate-700 dark:text-slate-300">
                {payload === null ? (
                  <span className="text-slate-400 dark:text-slate-500">null</span>
                ) : (
                  JSON.stringify(payload, null, 2)
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default EventLogEntry;