'use client';

import { useState, useEffect } from 'react';
import { DesktopGameFrame } from './DesktopGameFrame';
import { MobileGameFrame } from './MobileGameFrame';
import { useOrientation } from '@/lib/hooks/useOrientation';

export function GameContainer() {
  const [isMobile, setIsMobile] = useState(false);
  const orientation = useOrientation();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile ? <MobileGameFrame orientation={orientation} /> : <DesktopGameFrame />;
}
