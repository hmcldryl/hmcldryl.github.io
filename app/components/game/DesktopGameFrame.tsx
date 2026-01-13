'use client';

import { useCallback } from 'react';
import { GameCanvas } from './GameCanvas';
import { TopControls } from './controls/TopControls';
import { DirectionalControls } from './controls/DirectionalControls';
import { DecorativeFrame } from './DecorativeFrame';
import { TitleScreen } from './TitleScreen';
import { useGameControls } from '@/lib/hooks/useGameControls';
import { GameEngine } from '@/lib/game/core/GameEngine';
import { GameState } from '@/lib/game/GameState';

interface DesktopGameFrameProps {
  gameEngine: GameEngine | null;
  isLoading: boolean;
  error: string | null;
  gameState: GameState;
  onEngineReady: (engine: GameEngine, ctx: CanvasRenderingContext2D) => void;
}

export function DesktopGameFrame({
  gameEngine,
  isLoading,
  error,
  gameState,
  onEngineReady
}: DesktopGameFrameProps) {
  const { isMuted, handleQuit, handleMute, handleShare } = useGameControls();

  const handlePlay = useCallback(() => {
    console.log('handlePlay called, gameEngine:', gameEngine);
    if (!gameEngine) {
      console.log('No gameEngine available');
      return;
    }

    console.log('Enabling input and setting state to playing');
    // Enable input
    gameEngine.getInputManager().enable();

    // Set game state to playing
    gameEngine.getStateManager().setState('playing');
    console.log('State set to playing');
  }, [gameEngine]);

  return (
    <div className="w-full flex items-center justify-center py-8" style={{ backgroundColor: '#eeeeee' }}>
      {/* Game frame container - height-based sizing with aspect ratio */}
      <div className="relative p-6" style={{ height: '70vh', aspectRatio: '16/9' }}>
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

          {/* Controls only visible when playing */}
          {gameState === 'playing' && (
            <>
              {/* Top right controls - inside frame */}
              <div className="absolute top-4 right-4 z-20">
                <TopControls
                  onQuit={handleQuit}
                  onMute={handleMute}
                  onShare={handleShare}
                  isMuted={isMuted}
                />
              </div>

              {/* Bottom left directional controls - inside frame */}
              <div className="absolute bottom-4 left-4 z-20">
                <DirectionalControls />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
