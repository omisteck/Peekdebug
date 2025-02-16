import React from 'react';
import { ArrowRight01Icon } from 'hugeicons-react';

function Link({ href, children }: { href: string, children: React.ReactNode }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent the default link behavior

    // Use the exposed Electron API to open the link
    if (window.api) {
        window.api.invoke('open-external-link', href);
    } else {
      // Fallback for non-Electron environments (e.g., web browsers)
      window.open(href, '_blank');
    }

  };

  return (
    <a 
      href={href}
      onClick={handleClick} // Add the onClick handler
      className="inline-flex items-center gap-1 text-[#C2EB2C] hover:text-[#C2EB2C]/90 transition-colors"
    >
      <span className="underline underline-offset-4">{children}</span>
      <ArrowRight01Icon className="w-3 h-3" />
    </a>
  );
}

export default Link;