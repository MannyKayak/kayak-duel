export type PlayerState = {
  position: number;
  initialSpeed: number;
  speed: number;
  lastTap: "L" | "R" | null;
  currentTap: "L" | "R" | null;
  gameOver: "contdown" | "race" | "finished";
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
