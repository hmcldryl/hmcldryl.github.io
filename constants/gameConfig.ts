export const GAME_CONFIG = {
  // Frame rate
  TARGET_FPS: 60,
  FIXED_DELTA_TIME: 1000 / 60,

  // Canvas dimensions (target aspect ratio 16:9)
  CANVAS_WIDTH: 1280,
  CANVAS_HEIGHT: 720,

  // Player constants
  PLAYER_SCREEN_X: 150, // Fixed x position on screen
  PLAYER_WIDTH: 48,
  PLAYER_HEIGHT: 64,
  PLAYER_GROUND_Y: 550, // Ground level for player

  // Movement speeds (pixels per second)
  BIKE_SPEED: 200,
  MAX_VELOCITY_X: 300,

  // World constants
  GROUND_LEVEL: 600,
  INTRO_WIDTH: 500,
  SECTION_SPACING: 200,
  ITEM_SPACING: 400,
  BUILDING_WIDTH: 200,
  BUILDING_HEIGHT: 250,

  // Viewport culling buffer
  CULLING_BUFFER: 200,
} as const;
