import React, { useState } from 'react';
import { ArrowDown01Icon, ArrowRight01Icon, SmsCodeIcon, SourceCodeSquareIcon } from "hugeicons-react";

const StackFrame = ({ frame, index, method }: { frame: string, index: number, method: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const parts = frame.split(':');
  const path = parts[0];
  const methodParts = path.split('/');
  const className = methodParts.slice(0, -1).join('/');
  const methodName = methodParts[methodParts.length - 1];

  return (
    <div className="border-l border-solid border-purple-100 pl-4">
      <div 
        className="flex items-start py-0.5 gap-x-1 cursor-pointer group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <button className="p-1 hover:bg-purple-50 rounded mt-0.5">
          {isExpanded ? (
            <ArrowDown01Icon className="w-4 h-4 text-purple-500" />
          ) : (
            <ArrowRight01Icon className="w-4 h-4 text-purple-500" />
          )}
        </button>
        <div className="min-w-0 flex  flex-wrap items-baseline gap-x-1">
          <span className="font-mono text-xs text-purple-400">{index}</span>
          <span className="font-mono text-xs text-purple-600">{className}</span>
          <span className="font-mono text-sm font-medium text-purple-800">{methodName}</span>
        </div>
      </div>
      
      {isExpanded && (
        <div className="ml-6 mt-1 p-2 bg-purple-50/50 rounded-md">
          <div className="flex items-center gap-2 text-sm text-purple-600">
            <SourceCodeSquareIcon className="w-4 h-4" />
            <span className="font-mono">{method || 'Unknown location'}</span>
          </div>
        </div>
      )}
    </div>
  );
};

const StackTraceLog = ({ frames }: { frames: { file: string, line: number, method: string }[] }) => {
  const [isExpanded, setIsExpanded] = useState( frames.length > 1 ? false : true);

  return (
    <div className="rounded-lg border border-solid border-purple-200 bg-purple-50/50 mb-2 overflow-hidden">
      {/* Header */}
      <div className="border-b border-solid border-purple-200 bg-white/50 p-4">
        <div className="flex items-start gap-3">
          <SmsCodeIcon className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
          <div>
            <div className="text-sm text-purple-400">Stack Trace</div>
            <div className="text-purple-600">
              {frames.length} frames
            </div>
          </div>
        </div>
      </div>

      {/* Stack Frames */}
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
          <SourceCodeSquareIcon className="w-4 h-4 text-purple-500" />
          <span className="text-purple-600">Call Stack</span>
        </div>

        {isExpanded && (
          <div className="space-y-1">
            {frames.map((frame, index) => (
              <StackFrame 
                key={index}
                frame={frame.file}
                index={frame.line}
                method={frame.method}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StackTraceLog;