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
}

export interface ButtonProps {
  title: string;
  onPress: () => void;
}

export interface GameLogicProps {
  state: PlayerState;
  delta: number;
}
