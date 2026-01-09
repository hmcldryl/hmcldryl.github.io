import { GAME_CONFIG } from '@/constants/gameConfig';
import { COLORS } from '@/constants/colors';
import { InputManager } from './InputManager';
import { AssetLoader } from './AssetLoader';
import { Player } from '../entities/Player';

export class GameEngine {
  private ctx: CanvasRenderingContext2D;
  private inputManager: InputManager;
  private assetLoader: AssetLoader;
  private player: Player;
  private lastTime: number = 0;
  private animationFrameId: number | null = null;
  private isRunning: boolean = false;
  private isInitialized: boolean = false;
  private visibilityChangeHandler: () => void;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.inputManager = new InputManager();
    this.assetLoader = new AssetLoader();
    this.player = new Player();
    this.visibilityChangeHandler = this.handleVisibilityChange.bind(this);
  }

  public async initialize(): Promise<void> {
    console.log('Initializing Game Engine...');

    // Initialize input manager
    this.inputManager.initialize();

    // Set canvas rendering properties for pixel art
    this.ctx.imageSmoothingEnabled = false;

    // Listen for tab visibility changes to reset timer
    document.addEventListener('visibilitychange', this.visibilityChangeHandler);

    // Load sprite assets
    try {
      await this.loadAssets();
      this.isInitialized = true;
      console.log('✓ Game Engine initialized');
    } catch (error) {
      console.error('✗ Failed to initialize game:', error);
      throw error;
    }
  }

  private async loadAssets(): Promise<void> {
    console.log('Loading player sprites...');

    // Define sprite paths
    const spritePaths = [
      '/assets/sprites/player/idle.png',
      '/assets/sprites/player/cycling.png',
    ];

    // Load all sprites
    const [idleSprite, cyclingSprite] = await this.assetLoader.preloadAssets(
      spritePaths
    );

    // Initialize player sprites
    this.player.initializeSprites(idleSprite, cyclingSprite);
  }

  public start(): void {
    if (this.isRunning) return;
    if (!this.isInitialized) {
      console.error('Cannot start game - not initialized');
      return;
    }

    this.isRunning = true;
    this.lastTime = performance.now();
    this.gameLoop(this.lastTime);

    console.log('Game started');
  }

  public stop(): void {
    if (!this.isRunning) return;

    this.isRunning = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    console.log('Game stopped');
  }

  public cleanup(): void {
    this.stop();
    this.inputManager.cleanup();
    this.assetLoader.clear();
    document.removeEventListener('visibilitychange', this.visibilityChangeHandler);
    console.log('Game cleaned up');
  }

  private handleVisibilityChange(): void {
    if (document.hidden) {
      // Tab is hidden - game loop will pause automatically
      console.log('Tab hidden - pausing game loop');
    } else {
      // Tab is visible again - reset timer to prevent huge deltaTime
      console.log('Tab visible - resetting timer');
      this.lastTime = performance.now();
    }
  }

  private gameLoop = (currentTime: number): void => {
    if (!this.isRunning) return;

    // Calculate delta time
    let deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    // Clamp delta time to prevent huge jumps when tab is inactive
    // Max 100ms (about 6 frames at 60fps) to prevent speed-up
    const MAX_DELTA_TIME = 100;
    if (deltaTime > MAX_DELTA_TIME) {
      deltaTime = MAX_DELTA_TIME;
    }

    // Update game state
    this.update(deltaTime);

    // Render
    this.render();

    // Schedule next frame
    this.animationFrameId = requestAnimationFrame(this.gameLoop);
  };

  private update(deltaTime: number): void {
    // Update input manager
    this.inputManager.update();

    // Update player
    this.player.update(deltaTime, this.inputManager);

    // Camera will be added in Phase 2
    // World objects will be updated in Phase 2
  }

  private render(): void {
    // Clear canvas
    this.clearCanvas();

    // Draw background
    this.drawBackground();

    // Draw ground line (simple for Phase 1)
    this.drawGround();

    // Draw player
    this.player.render(this.ctx);

    // Draw debug info
    this.drawDebugInfo();
  }

  private clearCanvas(): void {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  private drawBackground(): void {
    // Simple gradient background for Phase 1
    const gradient = this.ctx.createLinearGradient(
      0,
      0,
      0,
      this.ctx.canvas.height
    );
    gradient.addColorStop(0, COLORS.skyTop);
    gradient.addColorStop(1, COLORS.skyBottom);

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  private drawGround(): void {
    // Draw ground as a simple colored rectangle
    this.ctx.fillStyle = COLORS.grassDark;
    this.ctx.fillRect(
      0,
      GAME_CONFIG.GROUND_LEVEL,
      this.ctx.canvas.width,
      this.ctx.canvas.height - GAME_CONFIG.GROUND_LEVEL
    );

    // Draw grass line
    this.ctx.fillStyle = COLORS.grassLight;
    this.ctx.fillRect(0, GAME_CONFIG.GROUND_LEVEL, this.ctx.canvas.width, 10);
  }

  private drawDebugInfo(): void {
    // Draw debug information
    this.ctx.fillStyle = COLORS.white;
    this.ctx.font = '12px monospace';
    this.ctx.fillText(
      `World X: ${Math.floor(this.player.getWorldX())}`,
      10,
      20
    );
    this.ctx.fillText(
      `Velocity: ${Math.floor(this.player.velocityX)}`,
      10,
      40
    );
    this.ctx.fillText(
      `Animation: ${this.player.currentAnimation}`,
      10,
      60
    );
    this.ctx.fillText(
      `Sprites: ${this.player.isSpritesLoaded() ? 'Loaded' : 'Loading...'}`,
      10,
      80
    );
    this.ctx.fillText('Press D or → to move right', 10, 120);
    this.ctx.fillText('Press A or ← to move left', 10, 140);
  }

  public getPlayer(): Player {
    return this.player;
  }
}
