import React from 'react';

function CodeSnippet({ children }: { children: React.ReactNode }) {
    return (
      <code className="inline-flex items-center bg-white dark:bg-secondary/10 dark:text-secondary text-primary px-3 py-1.5 rounded-md font-mono text-sm border border-primary/20 border-solid dark:border-secondary/20">
        {children}
      </code>
    );
}

export default CodeSnippet;
