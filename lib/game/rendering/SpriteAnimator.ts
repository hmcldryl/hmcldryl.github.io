import { AnimationState } from '@/types/game';

interface SpriteSheetConfig {
  frameWidth: number;
  frameHeight: number;
  columns: number;
  rows: number;
  totalFrames: number;
  frameRate: number; // Frames per second for animation
}

interface AnimationConfig {
  spriteSheet: HTMLImageElement;
  config: SpriteSheetConfig;
}

export class SpriteAnimator {
  private animations: Map<AnimationState, AnimationConfig> = new Map();
  private currentAnimation: AnimationState = 'idle';
  private currentFrame: number = 0;
  private frameTimer: number = 0;
  private isLoaded: boolean = false;

  constructor() {}

  public addAnimation(
    state: AnimationState,
    spriteSheet: HTMLImageElement,
    config: SpriteSheetConfig
  ): void {
    this.animations.set(state, { spriteSheet, config });
    this.isLoaded = true;
  }

  public setAnimation(state: AnimationState): void {
    if (state !== this.currentAnimation) {
      this.currentAnimation = state;
      this.currentFrame = 0;
      this.frameTimer = 0;
    }
  }

  public update(deltaTime: number): void {
    const animation = this.animations.get(this.currentAnimation);
    if (!animation) return;

    this.frameTimer += deltaTime;

    // Calculate time per frame in milliseconds
    const frameTime = 1000 / animation.config.frameRate;

    // Advance frame if enough time has passed
    if (this.frameTimer >= frameTime) {
      this.currentFrame = (this.currentFrame + 1) % animation.config.totalFrames;
      this.frameTimer -= frameTime;
    }
  }

  public render(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    scale: number = 1
  ): void {
    if (!this.isLoaded) {
      // Fallback rendering if sprites not loaded
      ctx.fillStyle = '#ff00ff'; // Magenta placeholder
      ctx.fillRect(x, y, 48 * scale, 64 * scale);
      return;
    }

    const animation = this.animations.get(this.currentAnimation);
    if (!animation) return;

    const { spriteSheet, config } = animation;

    // Calculate source position in sprite sheet (6x6 grid, left to right, top to bottom)
    const col = this.currentFrame % config.columns;
    const row = Math.floor(this.currentFrame / config.columns);

    const srcX = col * config.frameWidth;
    const srcY = row * config.frameHeight;

    // Draw sprite
    ctx.drawImage(
      spriteSheet,
      srcX,
      srcY,
      config.frameWidth,
      config.frameHeight,
      Math.floor(x),
      Math.floor(y),
      Math.floor(config.frameWidth * scale),
      Math.floor(config.frameHeight * scale)
    );
  }

  public getCurrentAnimation(): AnimationState {
    return this.currentAnimation;
  }

  public getCurrentFrame(): number {
    return this.currentFrame;
  }

  public isAnimationLoaded(): boolean {
    return this.isLoaded;
  }
}
