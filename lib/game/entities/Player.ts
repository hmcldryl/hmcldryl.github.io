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
  private scale: number = 0.7; // Adjust this to make character bigger/smaller

  // Velocity
  public velocityX: number = 0;
  public velocityY: number = 0;

  // Animation
  public currentAnimation: AnimationState = 'idle';
  private spriteAnimator: SpriteAnimator;

  // Bunny hop state
  private isBunnyHopping: boolean = false;
  private previousFrame: number = 0;
  private jumpHeight: number = 0; // Current vertical offset from ground during jump
  private readonly MAX_JUMP_HEIGHT: number = 180; // Maximum jump height in pixels

  constructor() {
    this.screenX = GAME_CONFIG.PLAYER_SCREEN_X;
    this.screenY = GAME_CONFIG.PLAYER_GROUND_Y;
    this.spriteAnimator = new SpriteAnimator();
  }

  public initializeSprites(
    idleSprite: HTMLImageElement,
    cyclingSprite: HTMLImageElement,
    bunnyHopSprite: HTMLImageElement
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

    // Bunny hop animation config
    // Image: 1704x1230 pixels, 6x3 grid = 284x410 per frame
    const bunnyHopConfig = {
      frameWidth: 284,
      frameHeight: 410,
      columns: 6,
      rows: 3,
      totalFrames: 18,
      frameRate: 15, // Slightly faster for snappy jump animation
    };

    this.spriteAnimator.addAnimation('idle', idleSprite, idleConfig);
    this.spriteAnimator.addAnimation('cycling', cyclingSprite, cyclingConfig);
    this.spriteAnimator.addAnimation('bunny_hop', bunnyHopSprite, bunnyHopConfig);

    console.log('✓ Player sprites initialized (idle: 249x267, cycling: 260x264, bunny_hop: 284x410)');
  }

  public update(deltaTime: number, input: InputManager): void {
    // Check if bunny hop animation is complete
    if (this.isBunnyHopping) {
      const currentFrame = this.spriteAnimator.getCurrentFrame();
      // Detect animation completion: when frame cycles back to 0 from 17
      if (currentFrame === 0 && this.previousFrame === 17) {
        this.isBunnyHopping = false;
      }
      this.previousFrame = currentFrame;
    }

    // Handle bunny hop input - only if not currently bunny hopping
    if (!this.isBunnyHopping && input.isJump()) {
      this.isBunnyHopping = true;
      this.previousFrame = 0;
      this.currentAnimation = 'bunny_hop';
    }

    // Only handle movement if not bunny hopping
    if (!this.isBunnyHopping) {
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
    } else {
      // During bunny hop, maintain current velocity
      this.worldX += this.velocityX * (deltaTime / 1000);
      if (this.worldX < 0) this.worldX = 0;
    }

    // Update sprite animation
    this.spriteAnimator.setAnimation(this.currentAnimation);
    this.spriteAnimator.update(deltaTime);
  }

  public render(ctx: CanvasRenderingContext2D): void {
    // Get current animation dimensions
    let renderWidth = this.width;
    let renderHeight = this.height;
    let yOffset = 64;

    // Adjust dimensions based on current animation
    if (this.currentAnimation === 'bunny_hop') {
      renderWidth = 284;
      renderHeight = 410;
      yOffset = 64; // Keep same ground alignment
    }

    // Calculate render position (sprite is centered at player position)
    const renderX = this.screenX - (renderWidth * this.scale) / 2 + 24;
    const renderY = this.screenY - (renderHeight * this.scale) + yOffset;

    // Render sprite
    this.spriteAnimator.render(ctx, renderX, renderY, this.scale);
  }

  public getWorldX(): number {
    return this.worldX;
  }

  public isSpritesLoaded(): boolean {
    return this.spriteAnimator.isAnimationLoaded();
  }

  public isJumping(): boolean {
    return this.isBunnyHopping;
  }

  public getBounds() {
    // Get current animation dimensions
    let renderWidth = this.width;
    let renderHeight = this.height;
    let yOffset = 64;

    // Adjust dimensions based on current animation
    if (this.currentAnimation === 'bunny_hop') {
      renderWidth = 284;
      renderHeight = 410;
      yOffset = 64;
    }

    // Calculate actual render position (same as render method)
    const renderX = this.screenX - (renderWidth * this.scale) / 2 + 24;
    const renderY = this.screenY - (renderHeight * this.scale) + yOffset;

    // Calculate scaled dimensions
    const scaledWidth = renderWidth * this.scale;
    const scaledHeight = renderHeight * this.scale;

    // Return a smaller hitbox centered on the sprite
    // Reduce width by 30% on each side, height by 20% on each side (taller hitbox)
    const hitboxReductionWidth = 0.3;
    const hitboxReductionHeight = 0.2; // Less reduction for height = taller hitbox
    const hitboxWidth = scaledWidth * (1 - hitboxReductionWidth * 2);
    const hitboxHeight = scaledHeight * (1 - hitboxReductionHeight * 2);
    const hitboxOffsetX = scaledWidth * hitboxReductionWidth;
    const hitboxOffsetY = scaledHeight * hitboxReductionHeight;

    return {
      x: renderX + hitboxOffsetX,
      y: renderY + hitboxOffsetY,
      width: hitboxWidth,
      height: hitboxHeight,
    };
  }
}
