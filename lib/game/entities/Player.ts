import { GAME_CONFIG } from '@/constants/gameConfig';
import { COLORS } from '@/constants/colors';
import { AnimationState } from '@/types/game';
import { InputManager } from '../core/InputManager';

export class Player {
  // Screen position (fixed on left side)
  public screenX: number;
  public screenY: number;

  // World position (increases as player moves right)
  public worldX: number = 0;

  // Dimensions
  public width: number;
  public height: number;

  // Velocity
  public velocityX: number = 0;
  public velocityY: number = 0;

  // Animation state
  public currentAnimation: AnimationState = 'idle';
  private animationFrame: number = 0;
  private frameTimer: number = 0;

  constructor() {
    this.screenX = GAME_CONFIG.PLAYER_SCREEN_X;
    this.screenY = GAME_CONFIG.PLAYER_GROUND_Y;
    this.width = GAME_CONFIG.PLAYER_WIDTH;
    this.height = GAME_CONFIG.PLAYER_HEIGHT;
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

    // Update animation frame
    this.updateAnimation(deltaTime);
  }

  private updateAnimation(deltaTime: number): void {
    // Simple animation timer
    // In Phase 4, this will cycle through sprite frames
    this.frameTimer += deltaTime;
    if (this.frameTimer >= 200) {
      // 5 FPS for animation
      this.animationFrame = (this.animationFrame + 1) % 4;
      this.frameTimer = 0;
    }
  }

  public render(ctx: CanvasRenderingContext2D): void {
    // For Phase 1, render as a simple colored rectangle (placeholder)
    // This will be replaced with sprite rendering in Phase 4

    // Draw character body
    ctx.fillStyle = COLORS.characterShirt;
    ctx.fillRect(
      Math.floor(this.screenX),
      Math.floor(this.screenY),
      this.width,
      this.height
    );

    // Draw head
    ctx.fillStyle = COLORS.characterSkin;
    ctx.fillRect(
      Math.floor(this.screenX + 12),
      Math.floor(this.screenY - 20),
      24,
      20
    );

    // Draw bike frame (simple representation)
    ctx.fillStyle = COLORS.bikeFrame;
    ctx.fillRect(
      Math.floor(this.screenX + 5),
      Math.floor(this.screenY + this.height - 20),
      38,
      4
    );

    // Draw bike wheels (simple circles)
    ctx.fillStyle = COLORS.bikeWheel;
    // Front wheel
    ctx.beginPath();
    ctx.arc(
      Math.floor(this.screenX + 35),
      Math.floor(this.screenY + this.height - 10),
      8,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Back wheel with simple animation
    ctx.beginPath();
    ctx.arc(
      Math.floor(this.screenX + 10),
      Math.floor(this.screenY + this.height - 10),
      8,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Add a simple animation indicator
    if (this.currentAnimation === 'cycling') {
      // Draw a small line to show wheel rotation
      ctx.strokeStyle = COLORS.white;
      ctx.lineWidth = 2;
      const angle = (this.frameTimer / 200) * Math.PI * 2;
      const wheelX = Math.floor(this.screenX + 35);
      const wheelY = Math.floor(this.screenY + this.height - 10);
      ctx.beginPath();
      ctx.moveTo(wheelX, wheelY);
      ctx.lineTo(
        wheelX + Math.cos(angle) * 6,
        wheelY + Math.sin(angle) * 6
      );
      ctx.stroke();
    }
  }

  public getWorldX(): number {
    return this.worldX;
  }
}
