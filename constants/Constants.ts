// Tuning (aggiusta a gusto)
export const MAX_SPEED = 8; // limite superiore
export const ACCEL_TAP = 12; // "spinta" da pagaiata corretta (u/s^2 * delta)
export const PENALTY_TAP = 7; // penalità per tap sbagliato (u/s^2 * delta)
// drag naturale: v' = v - (a_lin*v + a_quad*v*|v|) * dt
export const DRAG_LIN = 0.8;
export const DRAG_QUAD = 0.2;
export const FINISH = 10;
