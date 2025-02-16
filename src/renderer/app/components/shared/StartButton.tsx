import { FC, useState, useCallback } from "react";
import clsx from "clsx";
import "../../../styles/start-button.css";

interface StartButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  size?: "base" | "large";
  className?: string;
}

const StartButton: FC<StartButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  size = "base",
  className = "",
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = useCallback(
    () => {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
        onClick?.();
      }, 700);
    },
    [onClick]
  );

  return (
    <button
      type="button"
      onClick={handleClick}
      className={clsx(
        "bubbly-button",
        {
          "bubbly-button--primary": variant === "primary",
          "bubbly-button--secondary": variant === "secondary",
          "bubbly-button--base": size === "base",
          "bubbly-button--large": size === "large",
          animate: isAnimating,
        },
        className
      )}
    >
      {children}
    </button>
  );
};

export default StartButton;
