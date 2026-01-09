export interface ParallaxLayer {
  image: HTMLImageElement | null;
  speedFactor: number; // How fast this layer moves (0-1, where 1 is same speed as camera)
  yOffset: number; // Vertical position offset
  repeat: boolean; // Whether to repeat horizontally
}

export class ParallaxBackground {
  private layers: ParallaxLayer[] = [];
  private cameraX: number = 0;

  constructor() {
    // Initialize empty layers
    this.layers = [];
  }

  /**
   * Add a parallax layer
   * @param image - The image to use for this layer
   * @param speedFactor - How fast this layer scrolls (0 = static, 1 = same speed as camera)
   * @param yOffset - Vertical offset from top of canvas
   * @param repeat - Whether to repeat the image horizontally
   */
  public addLayer(
    image: HTMLImageElement,
    speedFactor: number,
    yOffset: number = 0,
    repeat: boolean = true
  ): void {
    this.layers.push({
      image,
      speedFactor,
      yOffset,
      repeat,
    });
  }

  /**
   * Update camera position for parallax effect
   * @param worldX - The world X position (usually player's world position)
   */
  public updateCamera(worldX: number): void {
    this.cameraX = worldX;
  }

  /**
   * Render all parallax layers
   * @param ctx - Canvas rendering context
   * @param canvasWidth - Width of the canvas
   * @param canvasHeight - Height of the canvas
   */
  public render(
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number
  ): void {
    // Render layers from back to front (they should be added in that order)
    this.layers.forEach((layer) => {
      if (!layer.image) return;

      const layerOffset = this.cameraX * layer.speedFactor;

      if (layer.repeat) {
        this.renderRepeatingLayer(
          ctx,
          layer.image,
          layerOffset,
          layer.yOffset,
          canvasWidth,
          canvasHeight
        );
      } else {
        this.renderSingleLayer(
          ctx,
          layer.image,
          layerOffset,
          layer.yOffset,
          canvasWidth,
          canvasHeight
        );
      }
    });
  }

  private renderRepeatingLayer(
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    layerOffset: number,
    yOffset: number,
    canvasWidth: number,
    canvasHeight: number
  ): void {
    const imageWidth = image.width;
    const imageHeight = image.height;

    // Calculate the starting X position to ensure seamless scrolling
    const xOffset = -layerOffset % imageWidth;

    // Draw enough copies to fill the screen
    const numCopies = Math.ceil(canvasWidth / imageWidth) + 2;

    for (let i = -1; i < numCopies; i++) {
      const x = xOffset + i * imageWidth;
      ctx.drawImage(image, x, yOffset, imageWidth, imageHeight);
    }
  }

  private renderSingleLayer(
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    layerOffset: number,
    yOffset: number,
    canvasWidth: number,
    canvasHeight: number
  ): void {
    const imageWidth = image.width;
    const imageHeight = image.height;

    // Center the image and apply parallax offset
    const x = canvasWidth / 2 - imageWidth / 2 - layerOffset;

    ctx.drawImage(image, x, yOffset, imageWidth, imageHeight);
  }

  /**
   * Clear all layers
   */
  public clear(): void {
    this.layers = [];
  }

  /**
   * Get number of layers
   */
  public getLayerCount(): number {
    return this.layers.length;
  }
}
