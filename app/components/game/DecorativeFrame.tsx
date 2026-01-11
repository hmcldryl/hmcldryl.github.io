'use client';

const TILE_SIZE = 128;
const FRAME_BASE_PATH = '/assets/ui/game_frame';

// Individual tile images
const TILES = {
  topLeft: `${FRAME_BASE_PATH}/top_left.png`,
  topRight: `${FRAME_BASE_PATH}/top_right.png`,
  bottomLeft: `${FRAME_BASE_PATH}/bottom_left.png`,
  bottomRight: `${FRAME_BASE_PATH}/bottom_right.png`,
  topSide: `${FRAME_BASE_PATH}/top_side.png`,
  bottomSide: `${FRAME_BASE_PATH}/bottom_side.png`,
  leftSide: `${FRAME_BASE_PATH}/left_side.png`,
  rightSide: `${FRAME_BASE_PATH}/right_side.png`,
};

export function DecorativeFrame() {
  const baseStyle = {
    imageRendering: 'pixelated' as const,
    backgroundSize: '128px 128px',
  };

  return (
    <div className="absolute -inset-6 pointer-events-none z-10">
      {/* Top-left corner */}
      <div
        className="absolute top-0 left-0 w-32 h-32"
        style={{
          ...baseStyle,
          backgroundImage: `url(${TILES.topLeft})`,
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Top-right corner */}
      <div
        className="absolute top-0 right-0 w-32 h-32"
        style={{
          ...baseStyle,
          backgroundImage: `url(${TILES.topRight})`,
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Bottom-left corner */}
      <div
        className="absolute bottom-0 left-0 w-32 h-32"
        style={{
          ...baseStyle,
          backgroundImage: `url(${TILES.bottomLeft})`,
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Bottom-right corner */}
      <div
        className="absolute bottom-0 right-0 w-32 h-32"
        style={{
          ...baseStyle,
          backgroundImage: `url(${TILES.bottomRight})`,
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Top side - repeating between corners */}
      <div
        className="absolute top-0 left-32 right-32 h-32"
        style={{
          ...baseStyle,
          backgroundImage: `url(${TILES.topSide})`,
          backgroundRepeat: 'repeat-x',
        }}
      />

      {/* Bottom side - repeating between corners */}
      <div
        className="absolute bottom-0 left-32 right-32 h-32"
        style={{
          ...baseStyle,
          backgroundImage: `url(${TILES.bottomSide})`,
          backgroundRepeat: 'repeat-x',
        }}
      />

      {/* Left side - repeating between corners */}
      <div
        className="absolute left-0 top-32 bottom-32 w-32"
        style={{
          ...baseStyle,
          backgroundImage: `url(${TILES.leftSide})`,
          backgroundRepeat: 'repeat-y',
        }}
      />

      {/* Right side - repeating between corners */}
      <div
        className="absolute right-0 top-32 bottom-32 w-32"
        style={{
          ...baseStyle,
          backgroundImage: `url(${TILES.rightSide})`,
          backgroundRepeat: 'repeat-y',
        }}
      />
    </div>
  );
}
