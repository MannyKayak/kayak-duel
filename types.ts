import { Router } from "expo-router";

export type PlayerState = {
  position: number;
  initialSpeed: number;
  speed: number;
  lastTap: Tap;
  currentTap: Tap;
  gameOver: "contdown" | "race" | "finished";
};
export type Tap = "L" | "R" | null;
export type Difficulty = "easy" | "medium" | "hard";

export type Countdown = {
  active: boolean;
  secondsLeft: number;
};

export interface GameState {
  baseState: "idle" | "running" | "finished";
  debug: boolean;
  endGameOverlay: boolean;
}

export interface ButtonProps {
  title: string;
  onPress: () => void;
}

export interface GameLogicProps {
  state: PlayerState;
  delta: number;
}

export interface GameCanvasProps {
  position: number;
}

export interface DebuggerProps {
  positionInGameUnits: number;
  playerSpeed: number;
}

export interface PressableContainerProps {
  handlePress: (side: "L" | "R") => void;
}

export interface CountdownBannerProps {
  secondsLeft: number;
}

export interface EndGameOverlayProps {
  router: Router;
}
