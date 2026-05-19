'use client';

import { useState } from 'react';

interface SpriteButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
  onTouchStart?: () => void;
  onTouchEnd?: () => void;
  ariaLabel: string;
  size?: number;
  width?: number;
  height?: number;
  variant?: 'default' | 'play';
}

export function SpriteButton({
  children,
  onClick,
  onMouseDown,
  onMouseUp,
  onTouchStart,
  onTouchEnd,
  ariaLabel,
  size = 64,
  width,
  height,
  variant = 'default',
}: SpriteButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const buttonWidth = width ?? size;
  const buttonHeight = height ?? size;

  const handleMouseDown = () => {
    setIsPressed(true);
    onMouseDown?.();
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    onMouseUp?.();
  };

  const handleMouseLeave = () => {
    if (isPressed) {
      setIsPressed(false);
      onMouseUp?.();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsPressed(true);
    onTouchStart?.();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsPressed(false);
    onTouchEnd?.();
  };

  const classNames = [
    'pixel-ctrl-btn',
    variant === 'play' ? 'pixel-ctrl-btn-play' : '',
    isPressed ? 'is-pressed' : '',
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classNames}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={onClick}
      aria-label={ariaLabel}
      style={{ width: `${buttonWidth}px`, height: `${buttonHeight}px` }}
    >
      {children}
    </button>
  );
}
