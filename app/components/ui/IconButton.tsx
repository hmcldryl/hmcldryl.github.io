'use client';

interface IconButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  ariaLabel: string;
  className?: string;
}

export function IconButton({ icon, onClick, ariaLabel, className = '' }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`pixel-icon-button ${className}`}
    >
      {icon}
    </button>
  );
}
