import React, { useState } from 'react';
import { ArrowDown01Icon, ArrowRight01Icon, WebDesign02Icon, SourceCodeSquareIcon, Mail02Icon  } from "hugeicons-react";
import TreeItem from './TreeItem';
import DOMPurify from 'dompurify';

const MailableEntry = ({ content }: { content: any }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeTab, setActiveTab] = useState('details');
  
    return (
      <div className="rounded-lg border border-solid border-pink-200 bg-pink-50/50 dark:bg-darkprimary mb-2 overflow-hidden">
        {/* Header with Mailable Name */}
        <div className="border-b border-solid border-pink-200 bg-white/50 dark:bg-darkprimary p-4">
          <div className="flex items-start gap-3">
            <Mail02Icon className="w-5 h-5 text-pink-500 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-sm text-pink-400">Mailable Class</div>
              <div className="font-mono text-pink-600 text-lg">
                {content.subject || 'No Subject'}
              </div>
            </div>
            
            {/* Tab Switcher */}
            <div className="flex items-center gap-1 bg-pink-50 dark:bg-darkprimary border border-solid border-pink-200 rounded-lg p-1">
              <button 
                onClick={() => setActiveTab('details')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors
                  ${activeTab === 'details' 
                    ? 'bg-white text-pink-600 shadow-sm' 
                    : 'text-pink-600/60 hover:text-pink-600'}`}
              >
                Details
              </button>
              <button 
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors
                  ${activeTab === 'preview' 
                    ? 'bg-white text-pink-600 shadow-sm' 
                    : 'text-pink-600/60 hover:text-pink-600'}`}
              >
                Preview
              </button>
            </div>
          </div>
        </div>
  
        {activeTab === 'details' ? (
          /* Content Sections */
          <div className="divide-y divide-pink-100">
            {/* Email Details */}
            <div className="p-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="text-xs font-medium text-pink-400 uppercase w-20">To:</div>
                  <div className="text-sm text-pink-600">{content.to.map((to: any) => to.email).join(', ')}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs font-medium text-pink-400 uppercase w-20">Subject:</div>
                  <div className="text-sm text-pink-600">{content.subject || 'No Subject'}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs font-medium text-pink-400 uppercase w-20">From:</div>
                  <div className="text-sm text-pink-600">{content.from.map((from: any) => from.email).join(', ') || 'noreply@example.com'}</div>
                </div>
              </div>
            </div>
  
            {/* Template Section */}
            {content.template_name && (
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <WebDesign02Icon className="w-4 h-4 text-pink-500" />
                    <span className="text-pink-600">Template</span>
                </div>
                <div className="pl-6 font-mono text-pink-600">
                  {content.template_name}
                  </div>
                </div>
            )}
  
            {/* Variables Section */}
            {content.variables && (
                <div className="p-4">
                  <div 
                    className="flex items-center gap-2 mb-2 cursor-pointer"
                    onClick={() => setIsExpanded(!isExpanded)}
              >
                <button className="p-1 hover:bg-pink-100 rounded">
                  {isExpanded ? (
                    <ArrowDown01Icon className="w-4 h-4 text-pink-500" />
                  ) : (
                    <ArrowRight01Icon className="w-4 h-4 text-pink-500" />
                  )}
                </button>
                <SourceCodeSquareIcon className="w-4 h-4 text-pink-500" />
                <span className="text-pink-600">Variables</span>
              </div>
              {isExpanded && (
                <div className="pl-12 font-mono">
                  <TreeItem 
                    value={content.variables} 
                    textColor="text-pink-600"
                    depth={0}
                  />
                </div>
              )}
                </div>
            )}
          </div>
        ) : (
          /* Email Preview */
          <div className="p-6 bg-white dark:bg-darkprimary">
            <div className="max-w-2xl mx-auto bg-white dark:bg-darkprimary rounded-lg shadow-sm border border-solid border-gray-200">
              {/* Email Header */}
              <div className="border-b border-solid border-gray-100 p-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="text-xs font-medium text-gray-400 uppercase w-16">From:</div>
                    <div className="text-sm text-gray-600">{content.from.map((from: any) => from.email).join(', ') || 'noreply@example.com'}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs font-medium text-gray-400 uppercase w-16">To:</div>
                    <div className="text-sm text-gray-600">{content.to.map((to: any) => to.email).join(', ')}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs font-medium text-gray-400 uppercase w-16">Subject:</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {content.subject || 'No Subject'}
                    </div>
                  </div>
                </div>
              </div>
  
              {/* Email Body */}
              <div className="p-6 bg-white">
                <div 
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ 
                    __html: DOMPurify.sanitize(content.html) 
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

export default MailableEntry;