import { Position, Dimensions, AnimationState } from './game';

export interface Entity {
  position: Position;
  dimensions: Dimensions;
  update(deltaTime: number): void;
  render(ctx: CanvasRenderingContext2D, cameraX: number): void;
}

export interface PlayerState {
  screenX: number;
  screenY: number;
  worldX: number;
  velocityX: number;
  velocityY: number;
  currentAnimation: AnimationState;
}

export interface WorldObjectData {
  worldX: number;
  worldY: number;
  width: number;
  height: number;
  color: string;
  type: string;
}
