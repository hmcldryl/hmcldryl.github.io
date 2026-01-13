import { GAME_CONFIG } from '@/constants/gameConfig';
import { COLORS } from '@/constants/colors';
import { InputManager } from './InputManager';
import { AssetLoader } from './AssetLoader';
import { Player } from '../entities/Player';
import { Monster } from '../entities/Monster';
import { Pizza } from '../entities/Pizza';
import { ParallaxBackground } from '../rendering/ParallaxBackground';
import { GameStateManager } from '../GameState';

export class GameEngine {
  private ctx: CanvasRenderingContext2D;
  private inputManager: InputManager;
  private assetLoader: AssetLoader;
  private player: Player;
  private parallaxBackground: ParallaxBackground;
  private stateManager: GameStateManager;
  private lastTime: number = 0;
  private animationFrameId: number | null = null;
  private isRunning: boolean = false;
  private isInitialized: boolean = false;
  private visibilityChangeHandler: () => void;

  // Monster management
  private monsters: Monster[] = [];
  private monsterSprite: HTMLImageElement | null = null;
  private spawnTimer: number = 0;
  private minSpawnInterval: number = 3000; // Minimum 3 seconds between spawns
  private maxSpawnInterval: number = 6000; // Maximum 6 seconds between spawns
  private nextSpawnTime: number = 0;
  private playerMoveDistance: number = 0; // Track player movement
  private lastPlayerX: number = 0;

  // Pizza management
  private pizzas: Pizza[] = [];
  private pizzaSprite: HTMLImageElement | null = null;
  private pizzaSpawnTimer: number = 0;
  private pizzaSpawnInterval: number = 4000; // Spawn pizza arc every 4 seconds
  private nextPizzaSpawnTime: number = 0;

  // Scoring system
  private score: number = 0;
  private readonly POINTS_MONSTER_KILL: number = 50;
  private readonly POINTS_PIZZA: number = 10;

  // Audio
  private bgm: HTMLAudioElement | null = null;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.inputManager = new InputManager();
    this.assetLoader = new AssetLoader();
    this.player = new Player();
    this.parallaxBackground = new ParallaxBackground();
    this.stateManager = new GameStateManager();
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
    console.log('Loading player sprites, monsters, pizzas, and backgrounds...');

    // Define sprite paths
    const spritePaths = [
      '/assets/sprites/player/idle.png',
      '/assets/sprites/player/cycling.png',
      '/assets/sprites/player/bunny_hop.png',
      '/assets/sprites/monster/mon1_sprite.png',
      '/assets/sprites/pizza/pizza.png',
    ];

    // Define background paths
    const backgroundPaths = [
      '/assets/backgrounds/sky.png',
      '/assets/backgrounds/buildings-distant.png',
      '/assets/backgrounds/buildings-close.png',
      '/assets/backgrounds/street-details.png',
      '/assets/backgrounds/road.png',
      '/assets/backgrounds/sidewalk.png',
    ];

    // Load all assets
    const allPaths = [...spritePaths, ...backgroundPaths];
    const [
      idleSprite,
      cyclingSprite,
      bunnyHopSprite,
      monsterSprite,
      pizzaSprite,
      skyBg,
      buildingsDistantBg,
      buildingsCloseBg,
      streetDetailsBg,
      roadBg,
      sidewalkBg,
    ] = await this.assetLoader.preloadAssets(allPaths);

    // Initialize player sprites
    this.player.initializeSprites(idleSprite, cyclingSprite, bunnyHopSprite);

    // Store monster sprite for spawning
    this.monsterSprite = monsterSprite;

    // Store pizza sprite for spawning
    this.pizzaSprite = pizzaSprite;

    // Initialize parallax layers (from back to front)
    // Sky - static background (speed factor 0)
    this.parallaxBackground.addLayer(skyBg, 0, 0, false);

    // Distant buildings - very slow parallax (speed factor 0.1)
    this.parallaxBackground.addLayer(buildingsDistantBg, 0.1, 100, true);

    // Close buildings - moderate parallax (speed factor 0.3)
    this.parallaxBackground.addLayer(buildingsCloseBg, 0.3, 150, true);

    // Street details (lamps, trees) - faster parallax (speed factor 0.6)
    this.parallaxBackground.addLayer(streetDetailsBg, 0.6, 250, true);

    // Sidewalk - moves with camera (speed factor 1.0)
    this.parallaxBackground.addLayer(sidewalkBg, 1.0, 400, true);

    // Road - also moves with camera (speed factor 1.0)
    this.parallaxBackground.addLayer(roadBg, 1.0, 450, true);

    console.log(`✓ Loaded ${this.parallaxBackground.getLayerCount()} parallax layers`);

    // Load background music
    this.bgm = new Audio('/assets/sounds/Cloud Dancer.mp3');
    this.bgm.loop = true;
    this.bgm.volume = 0.5; // Set volume to 50%
    console.log('✓ BGM loaded');
  }

  public start(): void {
    if (this.isRunning) return;
    if (!this.isInitialized) {
      console.error('Cannot start game - not initialized');
      return;
    }

    this.isRunning = true;
    this.lastTime = performance.now();
    this.nextSpawnTime = this.getRandomSpawnInterval();
    this.nextPizzaSpawnTime = this.pizzaSpawnInterval;
    this.lastPlayerX = this.player.getWorldX();
    this.score = 0;
    this.gameLoop(this.lastTime);

    // Play background music
    if (this.bgm) {
      this.bgm.play().catch((error) => {
        console.log('BGM autoplay prevented by browser:', error);
        console.log('BGM will play on user interaction');
      });
    }

    console.log('Game started');
  }

  public stop(): void {
    if (!this.isRunning) return;

    this.isRunning = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    // Pause background music
    if (this.bgm) {
      this.bgm.pause();
    }

    console.log('Game stopped');
  }

  public cleanup(): void {
    this.stop();
    this.inputManager.cleanup();
    this.assetLoader.clear();
    this.parallaxBackground.clear();
    document.removeEventListener('visibilitychange', this.visibilityChangeHandler);

    // Cleanup BGM
    if (this.bgm) {
      this.bgm.pause();
      this.bgm.currentTime = 0;
      this.bgm = null;
    }

    console.log('Game cleaned up');
  }

  private handleVisibilityChange(): void {
    if (document.hidden) {
      // Tab is hidden - pause BGM and game loop
      console.log('Tab hidden - pausing game loop');
      if (this.bgm && !this.bgm.paused) {
        this.bgm.pause();
      }
    } else {
      // Tab is visible again - reset timer and resume BGM
      console.log('Tab visible - resetting timer');
      this.lastTime = performance.now();
      if (this.bgm && this.isRunning) {
        this.bgm.play().catch((error) => {
          console.log('Could not resume BGM:', error);
        });
      }
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

    // Only update player when in playing state
    if (this.stateManager.getState() === 'playing') {
      this.player.update(deltaTime, this.inputManager);
      // Update parallax camera position based on player's world position
      this.parallaxBackground.updateCamera(this.player.getWorldX());

      // Track player movement for monster spawning
      const currentPlayerX = this.player.getWorldX();
      const movementDelta = currentPlayerX - this.lastPlayerX;
      if (movementDelta > 0) {
        this.playerMoveDistance += movementDelta;
      }
      this.lastPlayerX = currentPlayerX;

      // Update monster spawning
      this.updateMonsterSpawning(deltaTime);

      // Update all monsters
      this.updateMonsters(deltaTime);

      // Update pizza spawning
      this.updatePizzaSpawning(deltaTime);

      // Update all pizzas
      this.updatePizzas(deltaTime);

      // Check collisions
      this.checkCollisions();
    } else {
      // On title screen, just update player animation (idle state)
      this.player.update(deltaTime, this.inputManager);
    }
  }

  private render(): void {
    // Clear canvas
    this.clearCanvas();

    // Draw parallax background (replaces old gradient background)
    this.parallaxBackground.render(
      this.ctx,
      this.ctx.canvas.width,
      this.ctx.canvas.height
    );

    // Draw monsters (behind player)
    this.renderMonsters();

    // Draw pizzas
    this.renderPizzas();

    // Draw player
    this.player.render(this.ctx);

    // Draw score
    this.drawScore();

    // Debug tools (commented out for production)
    // this.drawCollisionBoxes();
    // this.drawDebugInfo();
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

  private drawScore(): void {
    // Draw score in center top of screen
    this.ctx.save();
    this.ctx.fillStyle = COLORS.white;
    this.ctx.font = 'bold 32px monospace';
    this.ctx.textAlign = 'center'; // Center alignment
    this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
    this.ctx.lineWidth = 4;

    const scoreText = `Score: ${this.score}`;
    const x = this.ctx.canvas.width / 2; // Center of screen
    const y = 40;

    // Draw text with outline for better visibility
    this.ctx.strokeText(scoreText, x, y);
    this.ctx.fillText(scoreText, x, y);

    this.ctx.restore();
  }

  private drawCollisionBoxes(): void {
    // Draw player hitbox (gets bounds from Player class - moves with animation)
    this.ctx.save();
    this.ctx.strokeStyle = 'rgba(0, 255, 0, 0.8)';
    this.ctx.lineWidth = 2;

    const playerBounds = this.player.getBounds();

    this.ctx.strokeRect(
      playerBounds.x,
      playerBounds.y,
      playerBounds.width,
      playerBounds.height
    );

    // Draw monster hitboxes
    this.ctx.strokeStyle = 'rgba(255, 0, 0, 0.8)';
    for (const monster of this.monsters) {
      if (monster.isActive && !monster.isDying()) {
        const bounds = monster.getBounds();
        this.ctx.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);
      }
    }

    // Draw pizza hitboxes
    this.ctx.strokeStyle = 'rgba(255, 255, 0, 0.8)';
    for (const pizza of this.pizzas) {
      if (pizza.isActive && !pizza.isCollected) {
        const bounds = pizza.getBounds();
        this.ctx.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);
      }
    }

    this.ctx.restore();
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
    this.ctx.fillText(
      `Monsters: ${this.monsters.filter(m => m.isActive).length} | Pizzas: ${this.pizzas.filter(p => p.isActive && !p.isCollected).length}`,
      10,
      100
    );
    this.ctx.fillText('Press D or → to move right', 10, 140);
    this.ctx.fillText('Press A or ← to move left', 10, 160);
    this.ctx.fillText('Press W, ↑, or Space to bunny hop', 10, 180);
    this.ctx.fillText('Jump to kill monsters & collect pizzas!', 10, 200);
  }

  private getRandomSpawnInterval(): number {
    return this.minSpawnInterval + Math.random() * (this.maxSpawnInterval - this.minSpawnInterval);
  }

  private updateMonsterSpawning(deltaTime: number): void {
    // Only spawn monsters if player is moving forward
    if (this.player.velocityX <= 0) return;

    this.spawnTimer += deltaTime;

    if (this.spawnTimer >= this.nextSpawnTime && this.playerMoveDistance > 100) {
      this.spawnMonster();
      this.spawnTimer = 0;
      this.nextSpawnTime = this.getRandomSpawnInterval();
    }
  }

  private spawnMonster(): void {
    if (!this.monsterSprite) return;

    // Spawn monster off screen to the right
    const spawnX = this.ctx.canvas.width + 100;
    const spawnY = GAME_CONFIG.PLAYER_GROUND_Y - 30; // Slightly above ground

    const monster = new Monster(spawnX, spawnY);
    monster.initializeSprite(this.monsterSprite);
    this.monsters.push(monster);

    console.log('Monster spawned at', spawnX, spawnY);
  }

  private updateMonsters(deltaTime: number): void {
    // Update all monsters
    for (const monster of this.monsters) {
      if (monster.isActive) {
        monster.update(deltaTime, this.player.velocityX);
      }
    }

    // Remove inactive monsters
    this.monsters = this.monsters.filter(m => m.isActive);
  }

  private renderMonsters(): void {
    for (const monster of this.monsters) {
      if (monster.isActive) {
        monster.render(this.ctx);
      }
    }
  }

  private updatePizzaSpawning(deltaTime: number): void {
    // Only spawn pizzas if player is moving forward
    if (this.player.velocityX <= 0) return;

    this.pizzaSpawnTimer += deltaTime;

    if (this.pizzaSpawnTimer >= this.nextPizzaSpawnTime && this.playerMoveDistance > 200) {
      // Randomly choose between arc and vertical line patterns
      if (Math.random() < 0.5) {
        this.spawnPizzaArc();
      } else {
        this.spawnPizzaVerticalLine();
      }
      this.pizzaSpawnTimer = 0;
      this.nextPizzaSpawnTime = this.pizzaSpawnInterval;
    }
  }

  private spawnPizzaArc(): void {
    if (!this.pizzaSprite) return;

    // Create an arc of pizzas with specific height positions:
    // - 1st and 5th (first/last): low - collectable without jumping
    // - 2nd and 4th: medium height - between low and high
    // - 3rd (middle): highest - requires jumping
    const startX = this.ctx.canvas.width + 100;
    const spacing = 70; // Spacing between pizzas

    // Define specific heights
    const lowY = GAME_CONFIG.PLAYER_GROUND_Y - 40; // Ground level
    const highY = GAME_CONFIG.PLAYER_GROUND_Y - 220; // High in air
    const midY = GAME_CONFIG.PLAYER_GROUND_Y - 130; // Between ground and high

    // Positions for 5 pizzas: low, mid, high, mid, low
    const heights = [lowY, midY, highY, midY, lowY];

    for (let i = 0; i < heights.length; i++) {
      const x = startX + (i * spacing);
      const y = heights[i];

      const pizza = new Pizza(x, y);
      pizza.initializeSprite(this.pizzaSprite);
      this.pizzas.push(pizza);
    }

    console.log('Pizza arc spawned with', heights.length, 'pizzas at varied heights');
  }

  private spawnPizzaVerticalLine(): void {
    if (!this.pizzaSprite) return;

    // Create a vertical line of 3 pizzas aligned with arc pizza heights
    const startX = this.ctx.canvas.width + 100;

    // Use same heights as arc pizzas for consistency
    const lowY = GAME_CONFIG.PLAYER_GROUND_Y - 40; // Ground level (same as arc)
    const midY = GAME_CONFIG.PLAYER_GROUND_Y - 130; // Mid height (same as arc)
    const highY = GAME_CONFIG.PLAYER_GROUND_Y - 220; // High level (same as arc)

    // Stack vertically: low, mid, high
    const heights = [lowY, midY, highY];

    for (let i = 0; i < heights.length; i++) {
      const x = startX;
      const y = heights[i];

      const pizza = new Pizza(x, y);
      pizza.initializeSprite(this.pizzaSprite);
      this.pizzas.push(pizza);
    }

    console.log('Vertical pizza line spawned with', heights.length, 'pizzas');
  }

  private updatePizzas(deltaTime: number): void {
    // Update all pizzas
    for (const pizza of this.pizzas) {
      if (pizza.isActive) {
        pizza.update(deltaTime, this.player.velocityX);
      }
    }

    // Remove inactive pizzas (collected or off screen)
    this.pizzas = this.pizzas.filter(p => {
      if (!p.isActive) return false;
      // Also remove if scrolled off screen to the left
      if (p.x < -100) return false;
      return true;
    });
  }

  private renderPizzas(): void {
    for (const pizza of this.pizzas) {
      if (pizza.isActive) {
        pizza.render(this.ctx);
      }
    }
  }

  private checkCollisions(): void {
    // Get player bounds from Player class (moves with animation)
    const playerBounds = this.player.getBounds();
    const isJumping = this.player.isJumping();
    const jumpHeight = this.player.getJumpHeight();

    // When jumping, skip monster collisions entirely
    if (!isJumping) {
      // Check collision between player and each monster (only when NOT jumping)
      for (const monster of this.monsters) {
        if (!monster.isActive || monster.isDying()) continue;

        const monsterBounds = monster.getBounds();

        if (this.checkRectCollision(playerBounds, monsterBounds)) {
          // Player got hit by monster
          console.log('Player hit by monster!');
          monster.die();
          // You can add game over logic or health system here
        }
      }
    }

    // Check collision between player and each pizza
    const lowPizzaY = GAME_CONFIG.PLAYER_GROUND_Y - 40; // Ground level pizzas
    const pizzaYTolerance = 20; // Tolerance for determining if pizza is "low"

    for (const pizza of this.pizzas) {
      if (!pizza.isActive || pizza.isCollected) continue;

      const pizzaBounds = pizza.getBounds();
      const isPizzaLow = Math.abs(pizzaBounds.y - lowPizzaY) < pizzaYTolerance;

      // Skip low pizzas when jumping
      if (isJumping && isPizzaLow) {
        continue; // Don't collect low pizzas while jumping
      }

      if (this.checkRectCollision(playerBounds, pizzaBounds)) {
        console.log('Player collected pizza! +' + this.POINTS_PIZZA + ' points');
        pizza.collect();
        this.score += this.POINTS_PIZZA;
      }
    }
  }

  private checkRectCollision(rect1: any, rect2: any): boolean {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  }

  public getPlayer(): Player {
    return this.player;
  }

  public getInputManager(): InputManager {
    return this.inputManager;
  }

  public getStateManager(): GameStateManager {
    return this.stateManager;
  }
}
