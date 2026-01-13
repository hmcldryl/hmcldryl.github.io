'use client';

import { useState, useCallback } from 'react';

export function useGameControls() {
  const [isMuted, setIsMuted] = useState(false);

  const handleQuit = useCallback(() => {
    if (confirm('Quit game?')) {
      window.location.href = '/';
    }
  }, []);

  const handleMute = useCallback(() => {
    setIsMuted(prev => !prev);
    // TODO: Integrate with audio system when implemented
  }, []);

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
      // Fallback: Copy to clipboard
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied!');
    }
  }, []);

  return { isMuted, handleQuit, handleMute, handleShare };
}
