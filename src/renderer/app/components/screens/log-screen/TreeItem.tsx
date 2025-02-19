import React, { useState } from 'react';
import { ArrowDown01Icon, ArrowRight01Icon } from 'hugeicons-react';

const MAX_DEPTH = 5;

const formatValue = (value:any) => {
  if (typeof value === 'string') {
    return `"${value}"`;
  }
  return String(value);
};

interface TreeItemProps {
  label?: string;
  value: any;
  indent?: number;
  isRoot?: boolean;
  textColor?: string;
  depth?: number;
}

interface ParsedObject {
  [key: string]: any;
  id?: string;
}

const isHTML = (str: string): boolean => {
  const trimmed = str.trim();
  return trimmed.startsWith('<') && trimmed.endsWith('>') && 
         (trimmed.includes('</') || trimmed.includes('/>'));
};

const parseSpecialString = (value:string): ParsedObject => {
  const lines = value
    .replace(/^"?#{/, '{#')
    .replace(/}"?$/, '}')
    .split('+')
    .map(line => line.trim())
    .filter(Boolean);

  const parsed: ParsedObject = {};
  const currentObject = parsed;

  lines.forEach(line => {
    if (line.startsWith('{#')) {
      const id = line.match(/{#(\d+)/)?.[1];
      if (id) parsed.id = id;
    } else if (line.includes(':')) {
      // Split only on the first colon
      const colonIndex = line.indexOf(':');
      const key = line.slice(0, colonIndex).replace(/^"/, '').replace(/"$/, '');
      const value = line.slice(colonIndex + 1).trim();

      // Check if the value indicates an array or object
      if (value.startsWith('array:') || value.startsWith('object:')) {
        const isArray = value.startsWith('array:');
        const match = value.match(/(?:array|object):(\d+)\s*\[(.*)\]/);
        
        if (match) {
          const [contents] = match;
          const nestedValue: any[] | Record<string, any> = isArray ? [] : {};
          
          // Parse the nested structure
          if (contents.trim()) {
            const nestedParts = contents.split('=>').map(p => p.trim());
            if (nestedParts.length === 2) {
              const [nestedKey, nestedVal] = nestedParts;
              if (isArray) {
                (nestedValue as any[]).push(nestedVal.replace(/^"/, '').replace(/"$/, ''));
              } else {
                (nestedValue as Record<string, any>)[nestedKey.replace(/^"/, '').replace(/"$/, '')] = 
                  nestedVal.replace(/^"/, '').replace(/"$/, '');
              }
            }
          }
          
          currentObject[key] = nestedValue;
        }
      } else {
        // Handle regular key-value pairs
        currentObject[key] = value.replace(/^"/, '').replace(/"$/, '');
      }
    }
  });

  return parsed;
};

const TreeItem = ({
  label,
  value,
  indent = 0,
  depth = 0,
}:TreeItemProps) => {
  const [isExpanded, setIsExpanded] = useState(depth < 2);
  const type = Array.isArray(value) ? 'array' : typeof value;
  const isObject = value && typeof value === 'object';
  const hasChildren = isObject && Object.keys(value).length > 0;
  const hasReachedMaxDepth = depth >= MAX_DEPTH;

  // Handle special format strings
  const isSpecialFormat = typeof value === 'string' && value.includes('{#');
  if (isSpecialFormat) {
    const parsed = parseSpecialString(value);
    
    return (
      <div style={{ marginLeft: `${indent * 16}px` }}>
        <div className="flex items-center py-1 gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="hover:bg-gray-100 rounded-sm p-0.5"
          >
            {isExpanded ? (
              <ArrowDown01Icon className="w-4 h-4" />
            ) : (
              <ArrowRight01Icon className="w-4 h-4" />
            )}
          </button>
          {label && (
            <div className="flex items-baseline gap-2">
              <span className="font-medium text-gray-700 dark:text-white/90">{label}</span>
              <span className="text-gray-400">=&gt;</span>
            </div>
          )}
          <span className="text-gray-500">
            {isExpanded ? '{' : '{ ... }'}
          </span>
        </div>

        {isExpanded && (
          <>
            <div className="space-y-1">
              {Object.entries(parsed).map(([key, val]) => (
                <TreeItem 
                  key={key} 
                  label={key}
                  value={val}
                  indent={indent + 1}
                  depth={depth + 1}
                />
              ))}
            </div>
            <div style={{ marginLeft: `${indent * 16}px` }} className="py-1">
              {'}'}
            </div>
          </>
        )}
      </div>
    );
  }

  if (!isObject) {
    const isHTMLContent = typeof value === 'string' && isHTML(value);
    
    return (
      <div style={{ marginLeft: `${indent * 16}px` }} className="py-1">
        <div className="flex items-baseline gap-2">
          {label && (
            <>
              <span className="font-medium text-gray-700 dark:text-white/90">{label}</span>
              <span className="text-gray-400">=&gt;</span>
            </>
          )}
          {isHTMLContent ? (
            <div 
              className="bg-gray-50 p-2 rounded border border-gray-200"
              dangerouslySetInnerHTML={{ __html: value }}
            />
          ) : (
            <span className={`
              ${type === 'string' ? 'text-green-600' : ''}
              ${type === 'number' ? 'text-blue-600' : ''}
              ${type === 'boolean' ? 'text-purple-600' : ''}
            `}>
              {formatValue(value)}
            </span>
          )}
        </div>
      </div>
    );
  }

  if (hasReachedMaxDepth) {
    return (
      <div style={{ marginLeft: `${indent * 16}px` }}>
        <div className="flex items-center py-1 gap-2">
          <div className="w-6" />
          {label && (
            <div className="flex items-baseline gap-2">
              <span className="font-medium text-gray-700 dark:text-white/90">{label}</span>
              <span className="text-gray-400">=&gt;</span>
            </div>
          )}
          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">
            {type}:{Object.keys(value).length}
          </span>
          <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
            ...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginLeft: `${indent * 16}px` }}>
      <div className="flex items-center py-1 gap-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="hover:bg-gray-100 rounded-sm p-0.5"
          title={`Depth: ${depth + 1} of ${MAX_DEPTH}`}
        >
          {isExpanded ? (
            <ArrowDown01Icon className="w-4 h-4" />
          ) : (
            <ArrowRight01Icon className="w-4 h-4" />
          )}
        </button>
        {label && (
          <div className="flex items-baseline gap-2">
            <span className="font-medium text-gray-700 dark:text-white/90">{label}</span>
            <span className="text-gray-400">=&gt;</span>
          </div>
        )}
        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">
          {type}:{Object.keys(value).length}
        </span>
        {!isExpanded && <span className="text-gray-500">...</span>}
      </div>

      {isExpanded && (
        <>
          <div className="space-y-1">
            {Object.entries(value).map(([key, val]) => (
              <TreeItem
                key={key}
                label={key}
                value={val}
                indent={indent + 1}
                depth={depth + 1}
              />
            ))}
          </div>
          {hasChildren && (
            <div style={{ marginLeft: `${indent * 16}px` }} className="py-1">
              {Array.isArray(value) ? ']' : '}'}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TreeItem;