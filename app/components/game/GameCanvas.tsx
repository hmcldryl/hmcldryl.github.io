'use client';

import { useEffect, useRef, useState } from 'react';
import { useGameCanvas } from '@/lib/hooks/useGameCanvas';
import { GameEngine } from '@/lib/game/core/GameEngine';

export function GameCanvas() {
  const { canvasRef, getContext } = useGameCanvas();
  const gameEngineRef = useRef<GameEngine | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function initializeGame() {
      try {
        // Get canvas context
        const ctx = getContext();
        if (!ctx) {
          throw new Error('Failed to get canvas context');
        }

        // Create game engine
        const engine = new GameEngine(ctx);

        // Initialize asynchronously (loads assets)
        await engine.initialize();

        // Only start if component is still mounted
        if (mounted) {
          engine.start();
          gameEngineRef.current = engine;
          setIsLoading(false);
        } else {
          engine.cleanup();
        }
      } catch (err) {
        console.error('Failed to initialize game:', err);
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to load game');
          setIsLoading(false);
        }
      }
    }

    initializeGame();

    // Cleanup on unmount
    return () => {
      mounted = false;
      if (gameEngineRef.current) {
        gameEngineRef.current.cleanup();
        gameEngineRef.current = null;
      }
    };
  }, [getContext]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      {isLoading && (
        <div className="absolute z-10 text-white text-center">
          <div className="text-2xl mb-4">Loading...</div>
          <div className="text-sm text-gray-400">
            Loading player sprites and game assets
          </div>
        </div>
      )}
      {error && (
        <div className="absolute z-10 text-red-500 text-center p-8 bg-black/80 rounded">
          <div className="text-xl mb-2">Error</div>
          <div className="text-sm">{error}</div>
          <div className="text-xs mt-4 text-gray-400">
            Make sure sprite files are placed in public/assets/sprites/player/
          </div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="game-canvas"
        aria-label="Interactive portfolio game"
      />
    </div>
  );
}
