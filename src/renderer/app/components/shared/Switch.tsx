import clsx from 'clsx';

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

const Switch = ({ 
  checked, 
  onCheckedChange,
  disabled = false,
  className = ''
}: SwitchProps) => {
  return (
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={clsx(
        `
        relative 
        inline-flex 
        h-6 
        w-11 
        items-center 
        rounded-full 
        transition-colors 
        duration-200 
        ease-in-out
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${checked 
          ? 'dark:bg-secondary bg-primary' 
          : 'bg-gray-200 dark:bg-gray-700'
        }
        ${className}
        `
      )}
    >
      <span
        className={`
          inline-block 
          h-5 
          w-5 
          transform 
          rounded-full 
          bg-white 
          shadow-lg 
          transition-transform 
          duration-200 
          ease-in-out
          ${checked ? 'translate-x-5' : 'translate-x-0.5'}
        `}
      />
    </button>
  );
};

export default Switch;