'use client';

import { IconButton } from '@/app/components/ui/IconButton';

interface BottomControlsProps {
  onShare: () => void;
}

export function BottomControls({ onShare }: BottomControlsProps) {
  return (
    <div className="flex items-center justify-between w-full max-w-3xl mt-4">
      <div className="flex gap-2 items-center font-pixel text-xs text-white">
        <div className="pixel-border px-2 py-1 bg-[#f5f5dc]">WASD</div>
        <span>or</span>
        <div className="pixel-border px-2 py-1 bg-[#f5f5dc]">← → ↑ ↓</div>
        <span>to move</span>
      </div>
      <IconButton
        icon={<span className="text-xl">🔗</span>}
        onClick={onShare}
        ariaLabel="Share game"
      />
    </div>
  );
}
