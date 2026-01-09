'use client';

import { useEffect, useRef } from 'react';
import { useGameCanvas } from '@/lib/hooks/useGameCanvas';
import { GameEngine } from '@/lib/game/core/GameEngine';

export function GameCanvas() {
  const { canvasRef, getContext } = useGameCanvas();
  const gameEngineRef = useRef<GameEngine | null>(null);

  useEffect(() => {
    // Get canvas context
    const ctx = getContext();
    if (!ctx) {
      console.error('Failed to get canvas context');
      return;
    }

    // Create and initialize game engine
    const engine = new GameEngine(ctx);
    engine.initialize();
    engine.start();

    // Store reference
    gameEngineRef.current = engine;

    // Cleanup on unmount
    return () => {
      engine.cleanup();
      gameEngineRef.current = null;
    };
  }, [getContext]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <canvas
        ref={canvasRef}
        className="game-canvas"
        aria-label="Interactive portfolio game"
      />
    </div>
  );
}
