import { useState } from "react";
import { Globe02Icon, Time04Icon, ArrowDown01Icon, ArrowRight01Icon, ArrowRight02Icon } from "hugeicons-react";
import KeyValueDisplay from "./KeyValueDisplay";

const HttpClientRequest = ({ request }: { request: any }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const methodColors: { [key: string]: string } = {
    GET: 'text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-500/10 dark:border-blue-400/20',
    POST: 'text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-500/10 dark:border-green-400/20',
    PUT: 'text-amber-600 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-500/10 dark:border-amber-400/20',
    DELETE: 'text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-500/10 dark:border-red-400/20',
    PATCH: 'text-purple-600 bg-purple-50 border-purple-200 dark:text-purple-400 dark:bg-purple-500/10 dark:border-purple-400/20'
  };
  
  const statusColors: { [key: string]: string } = {
    '2xx': 'text-green-600 bg-green-50 border-green-200',
    '3xx': 'text-blue-600 bg-blue-50 border-blue-200',
    '4xx': 'text-amber-600 bg-amber-50 border-amber-200',
    '5xx': 'text-red-600 bg-red-50 border-red-200'
  };

  
  
  const getStatusColor = (status:number) => {
    const statusGroup = Math.floor(status / 100) + 'xx';
    return statusColors[statusGroup] || 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const getDuration = () => {
    const duration = request.duration;
    if (duration < 1000) return `${duration}ms`;
    return `${(duration / 1000).toFixed(2)}s`;
  };

  return (
    <div className="rounded-lg border border-solid border-gray-200 dark:border-gray-700 bg-white dark:bg-darkprimary overflow-hidden">
      {/* Request Header */}
      <div 
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Globe02Icon className="w-4 h-4 text-gray-400" />
            <span className={`px-2 py-1 text-xs font-medium rounded border border-solid ${methodColors[request.method]}`}>
              {request.method}
            </span>
          </div>
          
          <div className="font-mono text-sm text-gray-600 dark:text-gray-400">
            {request.url}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Status Code */}
          <div className={`px-2 py-1 text-xs font-medium rounded border border-solid ${getStatusColor(request.response.status)}`}>
            {request.response.status}
          </div>
          
          {/* Duration */}
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Time04Icon className="w-4 h-4" />
            <span>{getDuration()}</span>
          </div>

          {/* Expand/Collapse */}
          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
            {isExpanded ? (
              <ArrowDown01Icon className="w-4 h-4 text-gray-500" />
            ) : (
              <ArrowRight01Icon className="w-4 h-4 text-gray-500" />
            )}
          </button>
        </div>
      </div>

      {/* Request Details */}
      {isExpanded && (
        <div className="border-t border-solid border-gray-200 dark:border-gray-700">
          {/* Request Timeline */}
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800/50 flex items-center gap-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-gray-600 dark:text-gray-400">{request.startTime}</span>
            </div>
            <ArrowRight02Icon className="w-4 h-4 text-gray-400" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-gray-600 dark:text-gray-400">{request.endTime}</span>
            </div>
          </div>

          <KeyValueDisplay data={request.headers} />
        </div>
      )}
    </div>
  );
};

export default HttpClientRequest;