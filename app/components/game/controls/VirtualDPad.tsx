'use client';

import { useCallback } from 'react';
import { useGameContext } from '@/lib/contexts/GameContext';

export function VirtualDPad() {
  const { gameEngine } = useGameContext();

  const handleTouchStart = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    return (e: React.TouchEvent) => {
      e.preventDefault();
      gameEngine?.getInputManager().setVirtualDirection(direction, true);
    };
  }, [gameEngine]);

  const handleTouchEnd = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    return (e: React.TouchEvent) => {
      e.preventDefault();
      gameEngine?.getInputManager().setVirtualDirection(direction, false);
    };
  }, [gameEngine]);

  return (
    <div className="grid grid-cols-3 gap-1 w-48 h-48">
      <div />
      <button
        className="virtual-control-button"
        onTouchStart={handleTouchStart('up')}
        onTouchEnd={handleTouchEnd('up')}
        aria-label="Move up"
      >
        ↑
      </button>
      <div />

      <button
        className="virtual-control-button"
        onTouchStart={handleTouchStart('left')}
        onTouchEnd={handleTouchEnd('left')}
        aria-label="Move left"
      >
        ←
      </button>
      <div className="flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-gray-800" />
      </div>
      <button
        className="virtual-control-button"
        onTouchStart={handleTouchStart('right')}
        onTouchEnd={handleTouchEnd('right')}
        aria-label="Move right"
      >
        →
      </button>

      <div />
      <button
        className="virtual-control-button"
        onTouchStart={handleTouchStart('down')}
        onTouchEnd={handleTouchEnd('down')}
        aria-label="Move down"
      >
        ↓
      </button>
      <div />
    </div>
  );
}
