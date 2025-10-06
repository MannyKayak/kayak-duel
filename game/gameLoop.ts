// gameLoop.ts
import { FINISH } from "@/constants/Constants";
import { PlayerState } from "@/types";
import { gameLogic } from "./gameLogic";

let frameId: number | null = null;
let running = false;

export function startGameLoop(
  playerState: PlayerState,
  onUpdate: (playerState: PlayerState) => void,
  onFinish: (state: PlayerState) => void
) {
  if (running) {
    console.warn("Game loop already running — start ignored");
    return;
  }
  running = true;

  let lastTime = performance.now();

  const loop = (time: number) => {
    if (!running) return;

    // clamp del delta per evitare spike (e.g. freeze dev tools)
    const raw = (time - lastTime) / 1000;
    const delta = Math.max(0, Math.min(raw, 0.05)); // max 50ms/frame
    lastTime = time;

    gameLogic({ state: playerState, delta });
    onUpdate(playerState);
    if (playerState.position === FINISH) {
      onFinish(playerState);
      stopGameLoop();
    }

    frameId = requestAnimationFrame(loop);
  };

  frameId = requestAnimationFrame(loop);
}

export function stopGameLoop() {
  if (frameId) cancelAnimationFrame(frameId);
  frameId = null;
  running = false;
}
