import { useState } from "react";
import { 
  AlertCircleIcon, 
  Alert02Icon, 
  CheckmarkCircle02Icon, 
  InformationCircleIcon, 
  Mail02Icon, 
  Notification03Icon, 
  ArrowDown01Icon, 
  ArrowRight01Icon 
} from "hugeicons-react";
import ModelEntry from "./ModelEntry";
import TreeItem from "./TreeItem";
import MailableEntry from "./MailableEntry";
import HttpClientRequest from "./HttpClientRequest";
import StackTraceLog from "./StackTraceLog";
import CallCountEntry from "./CallCountEntry";
import { formatTime } from '../../../../../shared/utils/date-time.util';
import Measure from "./MesaureEntry";
import { Payload } from '../../../../../shared/types/log-entry.schema';
import ExceptionEntry from "./ExceptionEntry";
import JobEventEntry from "./JobEventEntry";
import EventLogEntry from "./EventLogEntry";
import SQLLogEntry from "./SQLLogEntry";
import ViewLogEntry from "./ViewLogEntry";
import CacheMetadataLog from "./CacheMetadataLog";
import KeyValueDisplay from "./KeyValueDisplay";

interface BaseContent {
  meta?: { clipboard_data?: string }[];
}

interface LogContent extends BaseContent {
  values: unknown;
}

interface CustomContent extends BaseContent {
  content: unknown;
  label?: string;
}

type StatusStyles = {
  container: string;
  icon: React.ComponentType<{ className?: string }>;
  textColor: string;
};


const STATUS_STYLES: Record<string, StatusStyles> = {
  error: {
    container: 'bg-red-500/10 text-red-500 border-red-500/20',
    icon: AlertCircleIcon,
    textColor: 'text-red-500'
  },
  success: {
    container: 'bg-green-500/10 text-green-500 border-green-500/20',
    icon: CheckmarkCircle02Icon,
    textColor: 'text-green-500'
  },
  warning: {
    container: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    icon: Alert02Icon,
    textColor: 'text-amber-500'
  },
  info: {
    container: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    icon: InformationCircleIcon,
    textColor: 'text-blue-500'
  },
  debug: {
    container: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
    icon: Mail02Icon,
    textColor: 'text-indigo-500'
  },
  default: {
    container: 'bg-white/10 text-gray-500 border-gray-500',
    icon: Notification03Icon,
    textColor: 'text-gray-500'
  },
};

const LogEntry = ({ type = 'log', content, origin, status }: Payload) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (type === 'confetti') return null;

  const renderContent = (data: LogContent | CustomContent) => {
    if ('values' in data && data.values !== undefined) {
      return data.values;
    }
    if ('content' in data && data.content !== undefined) {
      return data.content;
    }
    return null;
  };

  // Handle special entry types
  switch(type) {
    case 'model':
      return <ModelEntry content={content} />;
    case 'mailable':
      return <MailableEntry content={content} />;
    case 'request':
      return <HttpClientRequest request={content} />;
    case 'caller':
      return <StackTraceLog frames={content} />;
    case 'trace':
      return <StackTraceLog frames={content.frames} />;
    case 'measure':
      return <Measure content={content} />;
    case 'exception':
      return <ExceptionEntry content={content} />;
    case 'job_event':
      return <JobEventEntry content={content} />;
    case 'event':
      return <EventLogEntry event={content.event} name={content.name} payload={content.payload} isClassBased={content.class_based_event} />;
    case 'executed_query':
      case 'executed_slow_query':
      return <SQLLogEntry connectionName={content.connection_name} sql={content.sql} time={content.time} isSlow={type === 'executed_slow_query'} isSlowThreshold={content?.threshold} />;
    case 'view':
      return <ViewLogEntry data={content.data} viewPath={content.view_path} viewPathRelative={content.view_path_relative_to_project_root} />;
    case 'cache':
      return <CacheMetadataLog keyName={content.values.Key} value={content.values.Value} type={content.values.Event} />;
    case 'eloquent_model':
      return <ModelEntry content={content} />;
    case 'custom':
      if (content?.label === 'Count') {
        return <CallCountEntry content={content} origin={origin} />;
      }
      break;

    default:
        return <KeyValueDisplay data={content.values} />;
  }

  const styles = STATUS_STYLES[status] || STATUS_STYLES.default;
  const IconComponent = styles.icon;

  return (
    <div className={`rounded-lg border border-solid ${styles.container} mb-2`}>
      <div 
        className="flex items-center justify-between p-3 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <button className="p-1 hover:bg-black/5 rounded">
            {isExpanded ? (
              <ArrowDown01Icon className="w-4 h-4" />
            ) : (
              <ArrowRight01Icon className="w-4 h-4" />
            )}
          </button>
          <IconComponent className="w-4 h-4" />
          <span className="font-mono text-sm">{formatTime(new Date())}</span>
        </div>
        
        {origin?.file && (
          <div className="text-sm opacity-60 font-mono truncate max-w-[300px]">
            {`${origin.file}:${origin.line_number}`}
          </div>
        )}
      </div>

      {isExpanded && (
        <div className="px-6 pb-3 font-mono text-sm">
          <div className="min-w-0">
            <TreeItem 
              value={renderContent(content)} 
              depth={0}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LogEntry;