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

  const handleJumpDown = useCallback(() => {
    gameEngine?.getInputManager().setVirtualDirection('up', true);
  }, [gameEngine]);

  const handleJumpUp = useCallback(() => {
    gameEngine?.getInputManager().setVirtualDirection('up', false);
  }, [gameEngine]);

  return (
    <div className="flex gap-4 items-end">
      <SpriteButton
        onMouseDown={handleLeftDown}
        onMouseUp={handleLeftUp}
        onTouchStart={handleLeftDown}
        onTouchEnd={handleLeftUp}
        ariaLabel="Move left"
        size={48}
      >
        ◄
      </SpriteButton>
      <SpriteButton
        onMouseDown={handleJumpDown}
        onMouseUp={handleJumpUp}
        onTouchStart={handleJumpDown}
        onTouchEnd={handleJumpUp}
        ariaLabel="Jump"
        width={96}
        height={48}
      >
        ▲
      </SpriteButton>
      <SpriteButton
        onMouseDown={handleRightDown}
        onMouseUp={handleRightUp}
        onTouchStart={handleRightDown}
        onTouchEnd={handleRightUp}
        ariaLabel="Move right"
        size={48}
      >
        ►
      </SpriteButton>
    </div>
  );
}
