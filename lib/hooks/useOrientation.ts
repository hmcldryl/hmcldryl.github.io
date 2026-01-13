import { useState, useEffect } from 'react';

export type Orientation = 'portrait' | 'landscape';

export function useOrientation(): Orientation {
  const [orientation, setOrientation] = useState<Orientation>('landscape');

  useEffect(() => {
    const handleOrientationChange = () => {
      const newOrientation = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
      setOrientation(newOrientation);
    };

    // Initial check
    handleOrientationChange();

    // Listen for resize events
    window.addEventListener('resize', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);

  return orientation;
}
