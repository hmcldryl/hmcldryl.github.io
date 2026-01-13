export class Pizza {
  public x: number;
  public y: number;
  public width: number = 50;
  public height: number = 50;
  public isActive: boolean = true;
  public isCollected: boolean = false;

  private pizzaSprite: HTMLImageElement | null = null;
  private scale: number = 1.2; // Scale up pizza for visibility

  // Scroll with world
  private scrollSpeed: number = 200; // Scroll left with world at player speed

  // Animation tracking
  private currentFrame: number = 0;
  private frameTimer: number = 0;
  private frameRate: number = 8; // FPS
  private totalFrames: number = 5; // 5 frames in the sprite

  // Collection animation
  private collectionTimer: number = 0;
  private collectionDuration: number = 300; // How long collection animation lasts

  constructor(startX: number, startY: number) {
    this.x = startX;
    this.y = startY;
  }

  public initializeSprite(pizzaSprite: HTMLImageElement): void {
    this.pizzaSprite = pizzaSprite;
  }

  public update(deltaTime: number, playerVelocityX: number): void {
    // Handle collection animation
    if (this.isCollected) {
      this.collectionTimer += deltaTime;

      // Float upward during collection
      this.y -= 100 * (deltaTime / 1000);

      // Also scroll with world during collection
      if (playerVelocityX > 0) {
        this.x -= this.scrollSpeed * (deltaTime / 1000);
      }

      // Fade out and remove after duration
      if (this.collectionTimer >= this.collectionDuration) {
        this.isActive = false;
      }
      return;
    }

    // Scroll left when player is moving right (to simulate world scrolling)
    if (playerVelocityX > 0) {
      this.x -= this.scrollSpeed * (deltaTime / 1000);
    }

    // Update animation frame
    this.frameTimer += deltaTime;
    const frameTime = 1000 / this.frameRate;

    if (this.frameTimer >= frameTime) {
      this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
      this.frameTimer -= frameTime;
    }
  }

  public render(ctx: CanvasRenderingContext2D): void {
    if (!this.pizzaSprite) return;

    const frameX = this.currentFrame * this.width;
    const frameY = 0; // Only one row in pizza sprite

    // Calculate alpha for fade out during collection
    let alpha = 1.0;
    if (this.isCollected) {
      alpha = 1.0 - (this.collectionTimer / this.collectionDuration);
    }

    ctx.save();
    ctx.globalAlpha = alpha;

    // Draw the specific frame
    ctx.drawImage(
      this.pizzaSprite,
      frameX,
      frameY,
      this.width,
      this.height,
      Math.floor(this.x),
      Math.floor(this.y),
      Math.floor(this.width * this.scale),
      Math.floor(this.height * this.scale)
    );

    ctx.restore();
  }

  public getBounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.width * this.scale,
      height: this.height * this.scale,
    };
  }

  public collect(): void {
    this.isCollected = true;
  }
}
