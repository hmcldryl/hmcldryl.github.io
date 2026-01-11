'use client';

import { useState, useCallback, useEffect } from 'react';
import { GameCanvas } from './GameCanvas';
import { TopControls } from './controls/TopControls';
import { DirectionalControls } from './controls/DirectionalControls';
import { DecorativeFrame } from './DecorativeFrame';
import { TitleScreen } from './TitleScreen';
import { useGameControls } from '@/lib/hooks/useGameControls';
import { useGameContext } from '@/lib/contexts/GameContext';
import { GameState } from '@/lib/game/GameState';

export function DesktopGameFrame() {
  const { isMuted, handleQuit, handleMute, handleShare } = useGameControls();
  const { gameEngine } = useGameContext();
  const [gameState, setGameState] = useState<GameState>('title');

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

  const handlePlay = useCallback(() => {
    if (!gameEngine) return;

    // Enable input
    gameEngine.getInputManager().enable();

    // Set game state to playing
    gameEngine.getStateManager().setState('playing');
  }, [gameEngine]);

  return (
    <div className="w-full h-screen flex items-center justify-center" style={{ backgroundColor: '#eeeeee' }}>
      {/* Changed h-full to h-[75vh] for 75% viewport height */}
      <div className="relative h-[75vh] p-6" style={{ aspectRatio: '16/9' }}>
        <div className="relative w-full h-full">
          <GameCanvas fullScreen={false} />
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

              {/* Bottom center directional controls - inside frame */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                <DirectionalControls />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
