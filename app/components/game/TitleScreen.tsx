'use client';

import { SpriteButton } from '@/app/components/ui/SpriteButton';

interface TitleScreenProps {
  onPlay: () => void;
}

export function TitleScreen({ onPlay }: TitleScreenProps) {
  return (
    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/50 pointer-events-none">
      <h1 className="text-4xl md:text-6xl font-pixel text-white mb-16 drop-shadow-lg text-center px-4">
        Dada&apos;s Ride Out
      </h1>

      <div className="mb-8 pointer-events-auto">
        <SpriteButton
          onClick={onPlay}
          ariaLabel="Start game"
          width={288}
          height={96}
          variant="play"
        >
          ▶ PLAY
        </SpriteButton>
      </div>

      <p className="text-sm md:text-base text-white/80 text-center px-4">
        Press Play to Start
      </p>
    </div>
  );
}
