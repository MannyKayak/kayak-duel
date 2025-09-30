// bot logic

import { PlayerState } from "@/types";

// il bot deve semplicemente andare ad una velocità costante per ora
const initialBotState: Partial<PlayerState> = {
  currentTap: null,
  lastTap: null,
  position: 0,
  speed: 0,
};

export function generateRandomTap() {}
