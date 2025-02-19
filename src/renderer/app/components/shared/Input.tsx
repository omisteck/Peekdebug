import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string | boolean;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  icon, 
  error,
  className = '', 
  ...props 
}) => {
  return (
    <div className='m-0 p-0'>
      {label && (
        <label 
          htmlFor={props.id} 
          className="block text-sm font-medium dark:text-[#C2EB2C] text-[#0C2501]"
        >
          {label}
        </label>
      )}
      <div className="relative mt-2">
        {icon && (
          <span className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-opacity duration-200
            ${error ? 'text-red-500' : 'dark:text-[#C2EB2C] text-[#0C2501] text-opacity-40'}`}>
            {icon}
          </span>
        )}
        <input
          {...props}
          className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-2 rounded-lg 
            border-1 transition-all duration-200 focus:outline-none
            ${error 
              ? 'border-solid border-red-500 dark:border-red-500 focus:border-red-600 dark:focus:border-red-600' 
              : 'dark:bg-[#0C2501] border-solid dark:border-[#C2EB2C] dark:border-opacity-20 dark:focus:border-opacity-40 dark:text-[#C2EB2C] bg-secondary/5 border-[#0C2501] border-opacity-10 focus:border-opacity-20 text-[#0C2501]'
            }
            ${className}`}
        />
      </div>
    </div>
  );
};

export default Input;