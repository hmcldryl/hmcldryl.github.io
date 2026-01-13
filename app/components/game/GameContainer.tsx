'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { DesktopGameFrame } from './DesktopGameFrame';
import { MobileGameFrame } from './MobileGameFrame';
import { useOrientation } from '@/lib/hooks/useOrientation';
import { GameProvider } from '@/lib/contexts/GameContext';
import { GameEngine } from '@/lib/game/core/GameEngine';
import { GameState } from '@/lib/game/GameState';

export function GameContainer() {
  const [isMobile, setIsMobile] = useState(false);
  const orientation = useOrientation();
  const [gameEngine, setGameEngine] = useState<GameEngine | null>(null);
  const [gameState, setGameState] = useState<GameState>('title');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const engineInitializedRef = useRef(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle engine initialization from canvas
  const handleEngineReady = useCallback(async (engine: GameEngine, ctx: CanvasRenderingContext2D) => {
    if (engineInitializedRef.current) return;
    engineInitializedRef.current = true;

    try {
      // Initialize asynchronously (loads assets)
      await engine.initialize();

      // Start the engine
      engine.start();

      setGameEngine(engine);
      setIsLoading(false);
    } catch (err) {
      console.error('Failed to initialize game:', err);
      setError(err instanceof Error ? err.message : 'Failed to load game');
      setIsLoading(false);
    }
  }, []);

  // Sync React state with GameEngine state
  useEffect(() => {
    if (!gameEngine) return;

    const stateManager = gameEngine.getStateManager();
    const unsubscribe = stateManager.subscribe((newState) => {
      setGameState(newState);
    });

    return () => {
      unsubscribe();
    };
  }, [gameEngine]);

  // Handle game state changes
  const handleSetGameState = useCallback((newState: GameState) => {
    if (!gameEngine) return;
    gameEngine.getStateManager().setState(newState);
  }, [gameEngine]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (gameEngine) {
        gameEngine.cleanup();
      }
    };
  }, [gameEngine]);

  return (
    <GameProvider
      value={{
        gameEngine,
        gameState,
        setGameState: handleSetGameState,
      }}
    >
      {isMobile ? (
        <MobileGameFrame
          orientation={orientation}
          gameEngine={gameEngine}
          isLoading={isLoading}
          error={error}
          gameState={gameState}
          onEngineReady={handleEngineReady}
        />
      ) : (
        <DesktopGameFrame
          gameEngine={gameEngine}
          isLoading={isLoading}
          error={error}
          gameState={gameState}
          onEngineReady={handleEngineReady}
        />
      )}
    </GameProvider>
  );
}
