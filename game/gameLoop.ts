import { PlayerState } from "@/types";
import { gameLogic } from "./gameLogic";

let loopId: number | null = null;

export function startGameLoop(
  initialState: PlayerState,
  onUpdate: (state: PlayerState) => void,
  onFinish: (state: PlayerState) => void
) {
  let state = { ...initialState };
  loopId = setInterval(() => {
    onUpdate(state);
    // esegue la logica di gioco
    state = gameLogic(state);

    console.log(state.lastTap);
    if (state.gameOver === "finished") {
      stopGameLoop();
      onFinish(state);
    }
  }, 20); // questo 50 significa che il loop si ripete ogni 50 millisecondi => 20Hz
}

export function stopGameLoop() {
  if (loopId) {
    clearInterval(loopId);
    loopId = null;
  }
}
