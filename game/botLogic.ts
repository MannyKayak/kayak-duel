// bot logic

import { Difficulty, PlayerState, Tap } from "@/types";

/* 
struttura del bot:
- genera un tap casuale ogni tot ms
- il tap può essere left o right
- il bot non ha stato, ogni volta che deve generare un tap lo fa in modo indipendente dai tap precedenti
- il bot non ha velocità, la velocità è gestita dal gioco in base alla frequenza dei tap
- il bot non ha posizione, la posizione è gestita dal gioco in base alla velocità
*/

function generateBotTapRandom() {
  const sides = ["L", "R"] as const;
  return sides[Math.floor(Math.random() * sides.length)];
}
function generateBotTapWithErrors(lastTap: Tap) {
  if (!lastTap) return "L";

  // 15% di probabilità di errore
  if (Math.random() < 0.15) {
    return lastTap;
  }

  return lastTap === "L" ? "R" : "L";
}

export function startBot(botState: PlayerState, difficulty: Difficulty) {
  let lastTap: Tap = null;

  const interval = setInterval(() => {
    let tap: Tap = null;

    if (difficulty === "easy") {
      tap = generateBotTapRandom();
    } else if (difficulty === "hard") {
      tap = generateBotTapWithErrors(lastTap);
    }
    lastTap = tap;
    botState.currentTap = tap;
  }, 300); // ogni 300ms

  return () => clearInterval(interval);
}
