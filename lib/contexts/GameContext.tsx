'use client';

import { createContext, useContext } from 'react';
import { GameEngine } from '@/lib/game/core/GameEngine';
import { GameState } from '@/lib/game/GameState';

interface GameContextValue {
  gameEngine: GameEngine | null;
  gameState: GameState;
  setGameState: (state: GameState) => void;
}

const GameContext = createContext<GameContextValue>({
  gameEngine: null,
  gameState: 'title',
  setGameState: () => {},
});

export const useGameContext = () => useContext(GameContext);
export const GameProvider = GameContext.Provider;
