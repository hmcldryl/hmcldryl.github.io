'use client';

import { useState } from 'react';

interface SpriteButtonProps {
  spriteBasePath: string;
  onClick?: () => void;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
  onTouchStart?: () => void;
  onTouchEnd?: () => void;
  ariaLabel: string;
  size?: number;
}

export function SpriteButton({
  spriteBasePath,
  onClick,
  onMouseDown,
  onMouseUp,
  onTouchStart,
  onTouchEnd,
  ariaLabel,
  size = 64,
}: SpriteButtonProps) {
  const [buttonState, setButtonState] = useState<'normal' | 'hover' | 'pressed'>('normal');

  const handleMouseEnter = () => {
    if (buttonState !== 'pressed') {
      setButtonState('hover');
    }
  };

  const handleMouseLeave = () => {
    setButtonState('normal');
  };

  const handleMouseDown = () => {
    setButtonState('pressed');
    onMouseDown?.();
  };

  const handleMouseUp = () => {
    setButtonState('hover');
    onMouseUp?.();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setButtonState('pressed');
    onTouchStart?.();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    setButtonState('normal');
    onTouchEnd?.();
  };

  const handleClick = () => {
    onClick?.();
  };

  return (
    <button
      className="relative cursor-pointer border-none bg-transparent p-0 m-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
      aria-label={ariaLabel}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundImage: `url(${spriteBasePath}_${buttonState}.png)`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        imageRendering: 'pixelated',
      }}
    />
  );
}
