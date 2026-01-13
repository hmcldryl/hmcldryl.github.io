'use client';

import { IconButton } from '@/app/components/ui/IconButton';
import { VirtualDPad } from './VirtualDPad';

interface TouchControlsProps {
  onQuit: () => void;
  onMute: () => void;
  isMuted: boolean;
}

export function TouchControls({ onQuit, onMute, isMuted }: TouchControlsProps) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-4 right-4 flex gap-2 pointer-events-auto">
        <IconButton icon={<span className="text-xl">✕</span>} onClick={onQuit} ariaLabel="Quit" />
        <IconButton icon={<span className="text-xl">{isMuted ? '🔇' : '🔊'}</span>} onClick={onMute} ariaLabel="Mute" />
      </div>

      <div className="absolute bottom-4 left-4 pointer-events-auto">
        <VirtualDPad />
      </div>
    </div>
  );
}
