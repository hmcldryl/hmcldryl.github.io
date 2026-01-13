import { CONTROLS, isKeyInControl } from '@/constants/controls';

export class InputManager {
  private keys: Set<string> = new Set();
  private keyDownHandler: (e: KeyboardEvent) => void;
  private keyUpHandler: (e: KeyboardEvent) => void;
  private virtualInput = { up: false, down: false, left: false, right: false };
  private enabled: boolean = false;

  constructor() {
    this.keyDownHandler = this.handleKeyDown.bind(this);
    this.keyUpHandler = this.handleKeyUp.bind(this);
  }

  private handleKeyDown(e: KeyboardEvent): void {
    // Prevent default browser behavior for game keys
    if (this.isGameKey(e.key)) {
      e.preventDefault();
    }
    this.keys.add(e.key);
  }

  private handleKeyUp(e: KeyboardEvent): void {
    this.keys.delete(e.key);
  }

  private isGameKey(key: string): boolean {
    return (
      isKeyInControl(key, CONTROLS.MOVE_RIGHT) ||
      isKeyInControl(key, CONTROLS.MOVE_LEFT) ||
      isKeyInControl(key, CONTROLS.JUMP) ||
      isKeyInControl(key, CONTROLS.INTERACT) ||
      isKeyInControl(key, CONTROLS.PAUSE)
    );
  }

  public initialize(): void {
    window.addEventListener('keydown', this.keyDownHandler);
    window.addEventListener('keyup', this.keyUpHandler);
  }

  public cleanup(): void {
    window.removeEventListener('keydown', this.keyDownHandler);
    window.removeEventListener('keyup', this.keyUpHandler);
    this.keys.clear();
  }

  public isKeyDown(key: string): boolean {
    return this.keys.has(key);
  }

  public isAnyKeyDown(keys: readonly string[]): boolean {
    return keys.some((key) => this.keys.has(key));
  }

  public setVirtualDirection(direction: 'up' | 'down' | 'left' | 'right', pressed: boolean): void {
    this.virtualInput[direction] = pressed;
  }

  public enable(): void {
    this.enabled = true;
  }

  public disable(): void {
    this.enabled = false;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public isMoveRight(): boolean {
    return this.enabled && (this.isAnyKeyDown(CONTROLS.MOVE_RIGHT) || this.virtualInput.right);
  }

  public isMoveLeft(): boolean {
    return this.enabled && (this.isAnyKeyDown(CONTROLS.MOVE_LEFT) || this.virtualInput.left);
  }

  public isJump(): boolean {
    return this.enabled && (this.isAnyKeyDown(CONTROLS.JUMP) || this.virtualInput.up);
  }

  public isInteract(): boolean {
    return this.enabled && this.isAnyKeyDown(CONTROLS.INTERACT);
  }

  public isPause(): boolean {
    return this.enabled && this.isAnyKeyDown(CONTROLS.PAUSE);
  }

  public update(): void {
    // Called each frame - can be used for input processing
    // Currently not needed but useful for future features
  }
}
