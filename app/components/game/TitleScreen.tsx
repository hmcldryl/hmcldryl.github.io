'use client';

import { SpriteButton } from '@/app/components/ui/SpriteButton';

interface TitleScreenProps {
  onPlay: () => void;
}

export function TitleScreen({ onPlay }: TitleScreenProps) {
  return (
    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/50 pointer-events-none">
      {/* Title text */}
      <h1 className="text-4xl md:text-6xl font-pixel text-white mb-16 drop-shadow-lg text-center px-4">
        Dada's Ride Out
      </h1>

      {/* Play button using sprite - 3x larger */}
      <div className="mb-8 pointer-events-auto">
        <SpriteButton
          spriteBasePath="/assets/ui/controls/play"
          onClick={onPlay}
          ariaLabel="Start game"
          width={288}
          height={144}
        />
      </div>

      {/* Subtitle */}
      <p className="text-sm md:text-base text-white/80 text-center px-4">
        Press Play to Start
      </p>
    </div>
  );
}
