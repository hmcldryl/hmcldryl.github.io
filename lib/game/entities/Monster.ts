export type MonsterState = 'idle' | 'dying';

export class Monster {
  public x: number;
  public y: number;
  public width: number = 50;
  public height: number = 50;
  public isActive: boolean = true;

  private monsterSprite: HTMLImageElement | null = null;
  private state: MonsterState = 'idle';
  private scale: number = 2.5; // Increased scale for visibility

  // Scroll with world
  private scrollSpeed: number = 200; // Scroll left with world at player speed

  // Animation tracking
  private currentFrame: number = 0;
  private frameTimer: number = 0;
  private frameRate: number = 10; // FPS
  private totalFrames: number = 8; // 8 frames total (5 from row 1 + 3 from row 2)

  // Death animation
  private deathAnimationComplete: boolean = false;
  private deathTimer: number = 0;
  private deathDuration: number = 500; // Death animation duration in ms

  constructor(startX: number, startY: number) {
    this.x = startX;
    this.y = startY;
  }

  public initializeSprite(monsterSprite: HTMLImageElement): void {
    this.monsterSprite = monsterSprite;
  }

  public update(deltaTime: number, playerVelocityX: number): void {
    // Handle death animation
    if (this.state === 'dying') {
      this.deathTimer += deltaTime;

      // Update animation frame for death
      this.frameTimer += deltaTime;
      const frameTime = 1000 / this.frameRate;

      if (this.frameTimer >= frameTime) {
        if (this.currentFrame < this.totalFrames - 1) {
          this.currentFrame++;
        }
        this.frameTimer -= frameTime;
      }

      // Also scroll with world during death
      if (playerVelocityX > 0) {
        this.x -= this.scrollSpeed * (deltaTime / 1000);
      }

      // Remove after death animation completes
      if (this.deathTimer >= this.deathDuration) {
        this.isActive = false;
      }
      return;
    }

    // Scroll left when player is moving right (to simulate world scrolling)
    if (playerVelocityX > 0) {
      this.x -= this.scrollSpeed * (deltaTime / 1000);
    }

    // Stationary - just play idle animation
    // Update animation frame
    this.frameTimer += deltaTime;
    const frameTime = 1000 / this.frameRate;

    if (this.frameTimer >= frameTime) {
      this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
      this.frameTimer -= frameTime;
    }

    // Deactivate when off screen (left side) due to world scrolling
    if (this.x < -this.width * this.scale) {
      this.isActive = false;
    }
  }

  public render(ctx: CanvasRenderingContext2D): void {
    if (!this.monsterSprite) return;

    let rowOffset = 0;
    let frameX = 0;

    if (this.state === 'dying') {
      // Use 3rd row for death animation (row index 2)
      rowOffset = 2;
      frameX = this.currentFrame * this.width;
    } else {
      // Idle animation: use frames 0-4 from row 0, then frames 0-2 from row 1
      if (this.currentFrame < 5) {
        // First 5 frames: row 0 (first row)
        rowOffset = 0;
        frameX = this.currentFrame * this.width;
      } else {
        // Frames 5-7: row 1 (second row), frames 0-2
        rowOffset = 1;
        frameX = (this.currentFrame - 5) * this.width;
      }
    }

    const frameY = rowOffset * this.height;

    // Draw the specific frame from the correct row
    ctx.drawImage(
      this.monsterSprite,
      frameX,
      frameY,
      this.width,
      this.height,
      Math.floor(this.x),
      Math.floor(this.y),
      Math.floor(this.width * this.scale),
      Math.floor(this.height * this.scale)
    );
  }

  public getBounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.width * this.scale,
      height: this.height * this.scale,
    };
  }

  public getState(): MonsterState {
    return this.state;
  }

  public die(): void {
    this.state = 'dying';
    this.currentFrame = 0; // Reset to first frame of death animation
  }

  public isDying(): boolean {
    return this.state === 'dying';
  }
}
