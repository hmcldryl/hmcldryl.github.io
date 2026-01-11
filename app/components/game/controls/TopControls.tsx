'use client';

import { IconButton } from '@/app/components/ui/IconButton';

interface TopControlsProps {
  onQuit: () => void;
  onMute: () => void;
  onShare: () => void;
  isMuted: boolean;
}

export function TopControls({ onQuit, onMute, onShare, isMuted }: TopControlsProps) {
  return (
    <div className="flex gap-2">
      <IconButton
        icon={<span className="text-xl">🔗</span>}
        onClick={onShare}
        ariaLabel="Share game"
      />
      <IconButton
        icon={<span className="text-xl">{isMuted ? '🔇' : '🔊'}</span>}
        onClick={onMute}
        ariaLabel="Toggle mute"
      />
      <IconButton
        icon={<span className="text-xl">✕</span>}
        onClick={onQuit}
        ariaLabel="Quit game"
      />
    </div>
  );
}
