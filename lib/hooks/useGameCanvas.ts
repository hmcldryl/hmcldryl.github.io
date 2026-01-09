import { useRef, useEffect, useCallback } from 'react';
import { GAME_CONFIG } from '@/constants/gameConfig';

interface UseGameCanvasReturn {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  getContext: () => CanvasRenderingContext2D | null;
}

export function useGameCanvas(): UseGameCanvasReturn {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getContext = useCallback((): CanvasRenderingContext2D | null => {
    if (!canvasRef.current) return null;
    return canvasRef.current.getContext('2d');
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const container = canvas.parentElement;
      if (!container) return;

      const aspectRatio = GAME_CONFIG.CANVAS_WIDTH / GAME_CONFIG.CANVAS_HEIGHT;

      // Get container dimensions
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      // Calculate canvas size maintaining aspect ratio
      let width = containerWidth;
      let height = width / aspectRatio;

      // If height is too tall, constrain by height instead
      if (height > containerHeight) {
        height = containerHeight;
        width = height * aspectRatio;
      }

      // Set display size (CSS pixels)
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Set actual canvas size (accounting for device pixel ratio)
      const scale = window.devicePixelRatio || 1;
      canvas.width = GAME_CONFIG.CANVAS_WIDTH;
      canvas.height = GAME_CONFIG.CANVAS_HEIGHT;

      // Scale context for device pixel ratio
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Reset transform
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        // No additional scaling needed - we're using fixed internal resolution
        ctx.imageSmoothingEnabled = false;
      }
    };

    // Initial resize
    handleResize();

    // Listen for window resize
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { canvasRef, getContext };
}
