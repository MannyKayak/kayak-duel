export interface PlayerState {
  position: number;
  lastTap: "L" | "R";
  gameOver: "contdown" | "race" | "finished";
}

export interface GameState {
  baseState: "idle" | "running";
}
