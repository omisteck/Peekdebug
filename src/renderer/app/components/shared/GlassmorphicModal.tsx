import React, { useState, useEffect } from 'react';
import { CancelSquareIcon } from 'hugeicons-react';


interface GlassmorphicModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  zIndex?: number;
  size?: string;
}

const GlassmorphicModal = ({ isOpen, onClose, children, zIndex = 50, size = 'max-w-lg' }: GlassmorphicModalProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  return (
    <>
     <div 
        className={`fixed inset-0 flex items-center justify-center ${
          isOpen ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-300`}
        style={{ zIndex }}
        onTransitionEnd={() => {
          if (!isOpen) setIsAnimating(false);
        }}
      >
        {/* Modern subtle backdrop */}
        <div 
          className="fixed inset-0 transition-all duration-300 backdrop-blur-sm"
          style={{ 
            backgroundColor: 'rgba(12, 37, 1, 0.1)',
            opacity: isOpen ? 1 : 0
          }}
          onClick={onClose}
        />
        
        {/* Modal Content */}
        <div 
          className={`relative w-full ${size} mx-4 rounded-2xl 
            shadow-[0_8px_30px_rgba(12,37,1,0.12)] backdrop-blur-xl
            overflow-y-auto max-h-[80vh]
            animate__animated ${isOpen ? 'animate__bounceIn' : 'animate__bounceOut'}`}
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderColor: 'rgba(194, 235, 44, 0.2)'
          }}
          onClick={(e) => e.stopPropagation()} 
        >
          
          {/* Header - Minimalist design */}
          <div className="sticky top-0 z-30 flex justify-end pr-4 pt-4 bg-white dark:bg-darkprimary">
            <button
              onClick={onClose}
              className="p-1.5 rounded-full transition-colors duration-200 hover:bg-[rgba(194,235,44,0.1)]"
              aria-label="Close modal"
            >
              <CancelSquareIcon className="w-4 h-4" style={{ color: '#0C2501' }} />
            </button>
          </div>

          {/* Content with refined spacing */}
          <div className="relative px-6 pb-6">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default GlassmorphicModal;