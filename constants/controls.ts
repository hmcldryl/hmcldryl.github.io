// Key bindings for game controls
export const CONTROLS = {
  // Movement
  MOVE_RIGHT: ['ArrowRight', 'd', 'D'],
  MOVE_LEFT: ['ArrowLeft', 'a', 'A'],
  JUMP: ['ArrowUp', 'w', 'W', ' '], // Space bar for jump

  // Actions
  INTERACT: ['e', 'E', 'Enter'],
  PAUSE: ['Escape', 'p', 'P'],
} as const;

export function isKeyInControl(key: string, control: readonly string[]): boolean {
  return control.includes(key);
}
