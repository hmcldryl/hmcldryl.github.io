import { GAME_CONFIG } from '@/constants/gameConfig';
import { COLORS } from '@/constants/colors';
import { InputManager } from './InputManager';
import { Player } from '../entities/Player';

export class GameEngine {
  private ctx: CanvasRenderingContext2D;
  private inputManager: InputManager;
  private player: Player;
  private lastTime: number = 0;
  private animationFrameId: number | null = null;
  private isRunning: boolean = false;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.inputManager = new InputManager();
    this.player = new Player();
  }

  public initialize(): void {
    // Initialize input manager
    this.inputManager.initialize();

    // Set canvas rendering properties for pixel art
    this.ctx.imageSmoothingEnabled = false;

    console.log('Game Engine initialized');
  }

  public start(): void {
    if (this.isRunning) return;

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
    console.log('Game cleaned up');
  }

  private gameLoop = (currentTime: number): void => {
    if (!this.isRunning) return;

    // Calculate delta time
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

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
    this.ctx.fillText('Press D or → to move right', 10, 100);
    this.ctx.fillText('Press A or ← to move left', 10, 120);
  }

  public getPlayer(): Player {
    return this.player;
  }
}
