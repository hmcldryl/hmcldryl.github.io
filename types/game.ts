export interface Position {
  x: number;
  y: number;
}

export interface Velocity {
  x: number;
  y: number;
}

export interface Dimensions {
  width: number;
  height: number;
}

export interface Viewport {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type AnimationState = 'idle' | 'cycling' | 'jumping' | 'bunny_hop';

export type GameMode = 'start' | 'playing' | 'paused';

export interface InputState {
  keys: Set<string>;
}
