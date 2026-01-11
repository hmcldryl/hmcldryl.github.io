export type GameState = 'title' | 'playing' | 'paused';

export class GameStateManager {
  private currentState: GameState = 'title';
  private listeners: Set<(state: GameState) => void> = new Set();

  getState(): GameState {
    return this.currentState;
  }

  setState(newState: GameState): void {
    if (this.currentState !== newState) {
      this.currentState = newState;
      this.notifyListeners();
    }
  }

  subscribe(listener: (state: GameState) => void): () => void {
    this.listeners.add(listener);
    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.currentState));
  }
}
