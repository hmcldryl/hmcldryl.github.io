'use client';

import { SpriteButton } from '@/app/components/ui/SpriteButton';

interface TitleScreenProps {
  onPlay: () => void;
}

export function TitleScreen({ onPlay }: TitleScreenProps) {
  return (
    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/50">
      {/* Title text */}
      <h1 className="text-4xl md:text-6xl font-pixel text-white mb-8 drop-shadow-lg text-center px-4">
        JD'S PORTFOLIO
      </h1>

      {/* Subtitle */}
      <p className="text-sm md:text-base text-white/80 mb-12 text-center px-4">
        Press Play to Start
      </p>

      {/* Play button using sprite */}
      <SpriteButton
        spriteBasePath="/assets/ui/controls/play"
        onClick={onPlay}
        ariaLabel="Start game"
        size={96}
      />
    </div>
  );
}
