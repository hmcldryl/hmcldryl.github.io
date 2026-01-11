'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useGameCanvas } from '@/lib/hooks/useGameCanvas';
import { GameEngine } from '@/lib/game/core/GameEngine';
import { GameProvider } from '@/lib/contexts/GameContext';
import { GameState } from '@/lib/game/GameState';

interface GameCanvasProps {
  fullScreen?: boolean;
}

export function GameCanvas({ fullScreen = true }: GameCanvasProps) {
  const { canvasRef, getContext } = useGameCanvas();
  const gameEngineRef = useRef<GameEngine | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [gameState, setGameState] = useState<GameState>('title');

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

  // Sync React state with GameEngine state
  useEffect(() => {
    const engine = gameEngineRef.current;
    if (!engine) return;

    const stateManager = engine.getStateManager();
    const unsubscribe = stateManager.subscribe((newState) => {
      setGameState(newState);
    });

    return () => {
      unsubscribe();
    };
  }, [gameEngineRef.current]);

  const handleSetGameState = useCallback((newState: GameState) => {
    const engine = gameEngineRef.current;
    if (!engine) return;

    engine.getStateManager().setState(newState);
  }, []);

  const content = (
    <>
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
        className={fullScreen ? "game-canvas" : "w-full h-full block"}
        style={!fullScreen ? { imageRendering: 'pixelated' } : undefined}
        aria-label="Interactive portfolio game"
      />
    </>
  );

  return (
    <GameProvider
      value={{
        gameEngine: gameEngineRef.current,
        gameState,
        setGameState: handleSetGameState,
      }}
    >
      {fullScreen ? (
        <div className="w-full h-screen flex items-center justify-center" style={{ backgroundColor: '#eeeeee' }}>
          {content}
        </div>
      ) : (
        <div className="relative w-full h-full">
          {content}
        </div>
      )}
    </GameProvider>
  );
}
