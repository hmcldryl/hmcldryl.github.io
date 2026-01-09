import { GAME_CONFIG } from '@/constants/gameConfig';
import { AnimationState } from '@/types/game';
import { InputManager } from '../core/InputManager';
import { SpriteAnimator } from '../rendering/SpriteAnimator';

export class Player {
  // Screen position (fixed on left side)
  public screenX: number;
  public screenY: number;

  // World position (increases as player moves right)
  public worldX: number = 0;

  // Dimensions (based on sprite size - using cycling as reference)
  public width: number = 260;  // Cycling frame: 260 (idle: 249)
  public height: number = 267; // Max height: 267 (idle: 267, cycling: 264)

  // Display scale (to fit game size)
  private scale: number = 0.35; // Adjust this to make character bigger/smaller

  // Velocity
  public velocityX: number = 0;
  public velocityY: number = 0;

  // Animation
  public currentAnimation: AnimationState = 'idle';
  private spriteAnimator: SpriteAnimator;

  constructor() {
    this.screenX = GAME_CONFIG.PLAYER_SCREEN_X;
    this.screenY = GAME_CONFIG.PLAYER_GROUND_Y;
    this.spriteAnimator = new SpriteAnimator();
  }

  public initializeSprites(
    idleSprite: HTMLImageElement,
    cyclingSprite: HTMLImageElement
  ): void {
    // Idle animation config
    // Image: 1494x1602 pixels, 6x6 grid = 249x267 per frame
    const idleConfig = {
      frameWidth: 249,
      frameHeight: 267,
      columns: 6,
      rows: 6,
      totalFrames: 36,
      frameRate: 12, // 12 FPS for smooth animation (adjust as needed)
    };

    // Cycling animation config
    // Image: 1560x1584 pixels, 6x6 grid = 260x264 per frame
    const cyclingConfig = {
      frameWidth: 260,
      frameHeight: 264,
      columns: 6,
      rows: 6,
      totalFrames: 36,
      frameRate: 12,
    };

    this.spriteAnimator.addAnimation('idle', idleSprite, idleConfig);
    this.spriteAnimator.addAnimation('cycling', cyclingSprite, cyclingConfig);

    console.log('✓ Player sprites initialized (idle: 249x267, cycling: 260x264)');
  }

  public update(deltaTime: number, input: InputManager): void {
    // Handle horizontal movement
    if (input.isMoveRight()) {
      this.velocityX = GAME_CONFIG.BIKE_SPEED;
      this.currentAnimation = 'cycling';
      // Increase world position
      this.worldX += this.velocityX * (deltaTime / 1000);
    } else if (input.isMoveLeft() && this.worldX > 0) {
      // Allow moving left only if not at the start
      this.velocityX = -GAME_CONFIG.BIKE_SPEED;
      this.currentAnimation = 'cycling';
      this.worldX += this.velocityX * (deltaTime / 1000);
      // Clamp to zero
      if (this.worldX < 0) this.worldX = 0;
    } else {
      this.velocityX = 0;
      this.currentAnimation = 'idle';
    }

    // Update sprite animation
    this.spriteAnimator.setAnimation(this.currentAnimation);
    this.spriteAnimator.update(deltaTime);
  }

  public render(ctx: CanvasRenderingContext2D): void {
    // Calculate render position (sprite is centered at player position)
    const renderX = this.screenX - (this.width * this.scale) / 2 + 24;
    const renderY = this.screenY - (this.height * this.scale) + 64;

    // Render sprite
    this.spriteAnimator.render(ctx, renderX, renderY, this.scale);
  }

  public getWorldX(): number {
    return this.worldX;
  }

  public isSpritesLoaded(): boolean {
    return this.spriteAnimator.isAnimationLoaded();
  }
}
