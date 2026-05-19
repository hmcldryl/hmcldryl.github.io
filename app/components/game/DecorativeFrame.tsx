'use client';

export function DecorativeFrame() {
  return (
    <div
      className="absolute -inset-6 pointer-events-none z-10"
      style={{
        borderWidth: '24px',
        borderStyle: 'solid',
        borderTopColor: '#c49050',
        borderLeftColor: '#c49050',
        borderRightColor: '#2a1808',
        borderBottomColor: '#2a1808',
        boxShadow: [
          '0 0 0 3px #1a0c06',
          '0 0 0 6px #7a4c24',
          '0 0 0 9px #1a0c06',
          '10px 10px 0 rgba(0,0,0,0.45)',
          'inset 0 0 0 4px rgba(0,0,0,0.3)',
        ].join(', '),
        imageRendering: 'pixelated' as const,
      }}
    />
  );
}
