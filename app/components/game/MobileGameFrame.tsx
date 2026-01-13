'use client';

import { useCallback } from 'react';
import { GameCanvas } from './GameCanvas';
import { DecorativeFrame } from './DecorativeFrame';
import { TopControls } from './controls/TopControls';
import { DirectionalControls } from './controls/DirectionalControls';
import { TitleScreen } from './TitleScreen';
import { useGameControls } from '@/lib/hooks/useGameControls';
import { GameEngine } from '@/lib/game/core/GameEngine';
import { GameState } from '@/lib/game/GameState';
import { Orientation } from '@/lib/hooks/useOrientation';

interface MobileGameFrameProps {
  orientation: Orientation;
  gameEngine: GameEngine | null;
  isLoading: boolean;
  error: string | null;
  gameState: GameState;
  onEngineReady: (engine: GameEngine, ctx: CanvasRenderingContext2D) => void;
}

export function MobileGameFrame({
  orientation,
  gameEngine,
  isLoading,
  error,
  gameState,
  onEngineReady
}: MobileGameFrameProps) {
  if (orientation === 'portrait') {
    return (
      <MobilePortraitLayout
        gameEngine={gameEngine}
        isLoading={isLoading}
        error={error}
        gameState={gameState}
        onEngineReady={onEngineReady}
      />
    );
  } else {
    return (
      <MobileLandscapeLayout
        gameEngine={gameEngine}
        isLoading={isLoading}
        error={error}
        gameState={gameState}
        onEngineReady={onEngineReady}
      />
    );
  }
}

interface MobileLayoutProps {
  gameEngine: GameEngine | null;
  isLoading: boolean;
  error: string | null;
  gameState: GameState;
  onEngineReady: (engine: GameEngine, ctx: CanvasRenderingContext2D) => void;
}

function MobilePortraitLayout({
  gameEngine,
  isLoading,
  error,
  gameState,
  onEngineReady
}: MobileLayoutProps) {
  const { isMuted, handleQuit, handleMute, handleShare } = useGameControls();

  const handlePlay = useCallback(() => {
    console.log('[Portrait] handlePlay called, gameEngine:', gameEngine);
    if (!gameEngine) {
      console.log('[Portrait] No gameEngine available');
      return;
    }

    console.log('[Portrait] Enabling input and setting state to playing');
    // Enable input
    gameEngine.getInputManager().enable();

    // Set game state to playing
    gameEngine.getStateManager().setState('playing');
    console.log('[Portrait] State set to playing');
  }, [gameEngine]);

  return (
    <div className="w-full h-screen flex flex-col" style={{ backgroundColor: '#eeeeee' }}>
      {/* Game area - takes available space minus controls */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="relative w-full max-w-full" style={{ aspectRatio: '16/9' }}>
          <div className="relative w-full h-full">
            <GameCanvas
              fullScreen={false}
              gameEngine={gameEngine}
              isLoading={isLoading}
              error={error}
              gameState={gameState}
              onEngineReady={onEngineReady}
            />
            <DecorativeFrame />

            {/* Title screen overlay */}
            {gameState === 'title' && <TitleScreen onPlay={handlePlay} />}

            {/* Top-right controls visible in playing state */}
            {gameState === 'playing' && (
              <div className="absolute top-2 right-2 z-20">
                <TopControls
                  onQuit={handleQuit}
                  onMute={handleMute}
                  onShare={handleShare}
                  isMuted={isMuted}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controls area - fixed at bottom */}
      {gameState === 'playing' && (
        <div className="flex justify-start items-center p-4 bg-gray-800">
          <DirectionalControls />
        </div>
      )}
    </div>
  );
}

function MobileLandscapeLayout({
  gameEngine,
  isLoading,
  error,
  gameState,
  onEngineReady
}: MobileLayoutProps) {
  const { isMuted, handleQuit, handleMute, handleShare } = useGameControls();

  const handlePlay = useCallback(() => {
    console.log('[Landscape] handlePlay called, gameEngine:', gameEngine);
    if (!gameEngine) {
      console.log('[Landscape] No gameEngine available');
      return;
    }

    console.log('[Landscape] Enabling input and setting state to playing');
    // Enable input
    gameEngine.getInputManager().enable();

    // Set game state to playing
    gameEngine.getStateManager().setState('playing');
    console.log('[Landscape] State set to playing');
  }, [gameEngine]);

  return (
    <div className="w-full h-screen flex items-center justify-center" style={{ backgroundColor: '#eeeeee' }}>
      {/* Minimal padding for frame, max screen usage */}
      <div className="relative h-full p-2" style={{ aspectRatio: '16/9' }}>
        <div className="relative w-full h-full">
          <GameCanvas
            fullScreen={false}
            gameEngine={gameEngine}
            isLoading={isLoading}
            error={error}
            gameState={gameState}
            onEngineReady={onEngineReady}
          />
          <DecorativeFrame />

          {/* Title screen */}
          {gameState === 'title' && <TitleScreen onPlay={handlePlay} />}

          {/* Controls overlay when playing */}
          {gameState === 'playing' && (
            <>
              {/* Top-right controls */}
              <div className="absolute top-2 right-2 z-20">
                <TopControls
                  onQuit={handleQuit}
                  onMute={handleMute}
                  onShare={handleShare}
                  isMuted={isMuted}
                />
              </div>

              {/* Bottom-left directional controls */}
              <div className="absolute bottom-2 left-2 z-20">
                <DirectionalControls />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
