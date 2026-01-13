'use client';

import { useCallback } from 'react';
import { useGameContext } from '@/lib/contexts/GameContext';
import { SpriteButton } from '@/app/components/ui/SpriteButton';

export function DirectionalControls() {
  const { gameEngine } = useGameContext();

  const handleLeftDown = useCallback(() => {
    gameEngine?.getInputManager().setVirtualDirection('left', true);
  }, [gameEngine]);

  const handleLeftUp = useCallback(() => {
    gameEngine?.getInputManager().setVirtualDirection('left', false);
  }, [gameEngine]);

  const handleRightDown = useCallback(() => {
    gameEngine?.getInputManager().setVirtualDirection('right', true);
  }, [gameEngine]);

  const handleRightUp = useCallback(() => {
    gameEngine?.getInputManager().setVirtualDirection('right', false);
  }, [gameEngine]);

  return (
    <div className="flex gap-4 items-center">
      <SpriteButton
        spriteBasePath="/assets/ui/controls/arrow_left"
        onMouseDown={handleLeftDown}
        onMouseUp={handleLeftUp}
        onTouchStart={handleLeftDown}
        onTouchEnd={handleLeftUp}
        ariaLabel="Move left"
        size={64}
      />
      <SpriteButton
        spriteBasePath="/assets/ui/controls/arrow_right"
        onMouseDown={handleRightDown}
        onMouseUp={handleRightUp}
        onTouchStart={handleRightDown}
        onTouchEnd={handleRightUp}
        ariaLabel="Move right"
        size={64}
      />
    </div>
  );
}
