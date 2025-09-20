// gameLogic.ts
import {
  ACCEL_TAP,
  DRAG_LIN,
  DRAG_QUAD,
  FINISH,
  MAX_SPEED,
  PENALTY_TAP,
} from "@/constants/Constants";
import { GameLogicProps } from "@/types";

export const gameLogic = ({ state, delta }: GameLogicProps): number => {
  // 1) Drag naturale sempre
  if (state.speed > 0) {
    const drag =
      (DRAG_LIN * state.speed +
        DRAG_QUAD * state.speed * Math.abs(state.speed)) *
      delta;
    state.speed = Math.max(0, state.speed - drag);
  }

  // 2) Gestione tap (consumo singolo evento)
  if (state.currentTap !== null) {
    if (state.lastTap === null || state.currentTap !== state.lastTap) {
      // tap alternato → accelera
      state.speed = Math.min(MAX_SPEED, state.speed + ACCEL_TAP * delta);
    } else {
      // stesso lato → penalità
      state.speed = Math.max(0, state.speed - PENALTY_TAP * delta);
    }
    state.lastTap = state.currentTap;
    state.currentTap = null; // consumo
  }

  // 3) Avanza in base alla velocità istantanea
  state.position += state.speed * delta;
  if (state.position >= FINISH) {
    state.position = FINISH;
  }
  return state.position;
};
