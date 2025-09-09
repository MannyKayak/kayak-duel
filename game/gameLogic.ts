import { PlayerState } from "@/types";

// GLOBALS
const finish = 100; // utility poi lo cambio

export const gameLogic = (initialState: PlayerState) => {
  // questa funzione gestisce le dinamiche di gioco
  let playerState: PlayerState = { ...initialState };

  // check se il gioco è finito
  playerState = applyMovement(playerState);

  return playerState as PlayerState;
};

const applyMovement = (state: PlayerState): PlayerState => {
  state.position += 1; // velocità costante
  if (state.position >= finish) {
    state.position = finish;
    state.gameOver = "finished";
  }
  return state;
};
