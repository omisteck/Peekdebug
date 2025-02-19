import React, { useState } from 'react';
import { ArrowDown01Icon, ArrowRight01Icon, Clock01Icon } from "hugeicons-react";
import {formatTime} from '../../../../../shared/utils/date-time.util';

const CallCountEntry = ({ content, origin }: { content: { content : string, label: string }, origin: { file?: string, line_number?: number, hostname?: string } }) => {
  const [isExpanded, setIsExpanded] = useState(true);


  return (
    <div className="rounded-lg border border-solid border-slate-200 bg-white dark:bg-slate-800 mb-2 overflow-hidden shadow-sm">
      <div 
        className="flex items-center justify-between p-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <button className="p-1 hover:bg-slate-100 rounded">
            {isExpanded ? (
              <ArrowDown01Icon className="w-4 h-4 text-slate-500" />
            ) : (
              <ArrowRight01Icon className="w-4 h-4 text-slate-500" />
            )}
          </button>
          <Clock01Icon className="w-4 h-4 text-slate-500" />
          <span className="font-mono text-sm text-slate-600 dark:text-white/80">{formatTime(new Date())}</span>
          <span className="bg-slate-100 text-slate-600  px-2 py-0.5 rounded text-sm font-medium">
            {content.label}
          </span>
        </div>
      </div>

      {isExpanded && (
        <div className="px-6 pb-3 font-mono text-sm  border-solid border-t border-slate-100">
          <div className="mt-3">
            <div className="flex flex-col gap-2">
              <div className="text-slate-800 dark:text-white/80">
                {content.content}
              </div>
              <a 
                href="#" 
                className="text-slate-500 dark:text-white/80 hover:text-slate-700 hover:underline"
              >
                {origin.file + ":" + origin.line_number}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CallCountEntry;