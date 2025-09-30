import { Router } from "expo-router";

export function goToResults(router: Router) {
  // navigate to results page
  router.navigate("/resultScreen");
}

export function convertMotionToSpritePosition(position: number): number {
  return 500 - position * 50;
}
