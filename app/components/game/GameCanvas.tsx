'use client';

import { useEffect } from 'react';
import { useGameCanvas } from '@/lib/hooks/useGameCanvas';
import { GameEngine } from '@/lib/game/core/GameEngine';
import { GameState } from '@/lib/game/GameState';

interface GameCanvasProps {
  fullScreen?: boolean;
  gameEngine: GameEngine | null;
  isLoading: boolean;
  error: string | null;
  gameState: GameState;
  onEngineReady?: (engine: GameEngine, ctx: CanvasRenderingContext2D) => void;
}

export function GameCanvas({
  fullScreen = true,
  gameEngine,
  isLoading,
  error,
  gameState,
  onEngineReady
}: GameCanvasProps) {
  const { canvasRef, getContext } = useGameCanvas();

  // Initialize canvas context and notify parent when ready
  useEffect(() => {
    if (!onEngineReady) return;

    const ctx = getContext();
    if (ctx) {
      // Notify parent that canvas is ready
      const engine = new GameEngine(ctx);
      onEngineReady(engine, ctx);
    }
  }, [getContext, onEngineReady]);

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
        style={!fullScreen ? {
          imageRendering: 'pixelated',
          pointerEvents: gameState === 'title' ? 'none' : 'auto'
        } : {
          pointerEvents: gameState === 'title' ? 'none' : 'auto'
        }}
        aria-label="Interactive portfolio game"
      />
    </>
  );

  if (fullScreen) {
    return (
      <div className="w-full h-screen flex items-center justify-center" style={{ backgroundColor: '#eeeeee' }}>
        {content}
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {content}
    </div>
  );
}
