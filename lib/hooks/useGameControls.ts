'use client';

import { useState, useCallback } from 'react';
import { useGameContext } from '@/lib/contexts/GameContext';

export function useGameControls() {
  const { gameEngine } = useGameContext();
  const [isMuted, setIsMuted] = useState(false);

  const handleQuit = useCallback(() => {
    if (confirm('Quit game?')) {
      window.location.href = '/';
    }
  }, []);

  const handleMute = useCallback(() => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    gameEngine?.setMuted(newMuted);
  }, [isMuted, gameEngine]);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this game!',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied!');
    }
  }, []);

  return { isMuted, handleQuit, handleMute, handleShare };
}
