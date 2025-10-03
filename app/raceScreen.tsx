import CountdownBanner from "@/components/CountdownBanner";
import Debugger from "@/components/Debugger";
import EndGameOverlay from "@/components/EndGameOverlay";
import GameCanvas from "@/components/gameCanvas/GameCanvas";
import PressableContainer from "@/components/PressableContainer";
import { startGameLoop, stopGameLoop } from "@/game/gameLoop";
import { setBaseState, setEndGameOverlay } from "@/reduxSlices/gameSlice";
import { RootState } from "@/services/store";
import { Countdown, PlayerState } from "@/types";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

// creo una costante per lo stato iniziale del giocatore
const initialPlayerState: PlayerState = {
  position: 0,
  lastTap: null,
  currentTap: null,
  gameOver: "race",
  speed: 0,
  initialSpeed: 0,
} as const;
const TAP_COOLDOWN_MS = 80;

const RaceScreen = () => {
  const dispatch = useDispatch();
  const { baseState, debug, endGameOverlay } = useSelector(
    (s: RootState) => s.gameState
  );
  const router = useRouter();
  // uso useRef per mantenere lo stato del giocatore senza renderizzare il componente ad ogni cambiamento
  const playerState = useRef<PlayerState>({
    ...initialPlayerState,
  });
  const [position, setPosition] = useState(initialPlayerState.position);
  const [countdown, setCountdown] = useState<Countdown>({
    active: true,
    secondsLeft: 2,
  });
  // funzione per capire che lato è stato premuto
  const handlePress = (side: PlayerState["currentTap"]) => {
    const now = performance.now();
    const ps = playerState.current as PlayerState & { lastTapTs?: number };

    // evita tap spam troppo ravvicinati
    if (ps.lastTapTs && now - ps.lastTapTs < TAP_COOLDOWN_MS) return;

    // consuma un solo evento per frame: se è già pendente, ignora
    if (ps.currentTap !== null) return;

    ps.currentTap = side;
    ps.lastTapTs = now;
  };

  useEffect(() => {
    if (!countdown.active) return;
    const tick = () => {
      if (countdown.secondsLeft > 0)
        setCountdown({ active: true, secondsLeft: countdown.secondsLeft - 1 });
      else setCountdown({ active: false, secondsLeft: 0 });
    };

    const timer = setTimeout(() => {
      tick();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [countdown]);

  useEffect(() => {
    console.log(">>> useEffect mount RaceScreen");
    if (baseState !== "running" || countdown.active) return;
    console.log(countdown);
    startGameLoop(
      playerState.current,
      (state) =>
        setPosition((prev) =>
          prev !== state.position ? state.position : prev
        ),
      (state) => {
        // metto fine al gioco alterando lo stato redux
        state.gameOver = "finished";
        dispatch(setBaseState("finished"));
        dispatch(setEndGameOverlay(true));
      }
    );

    return () => stopGameLoop();
  }, [dispatch, baseState, router, endGameOverlay, countdown]);

  return (
    <View style={styles.container}>
      {countdown.active && (
        <CountdownBanner secondsLeft={countdown.secondsLeft} />
      )}
      {debug && (
        <Debugger
          positionInGameUnits={position}
          playerSpeed={playerState.current.speed}
        />
      )}
      {/* Canvas = background layer */}
      <GameCanvas position={position} />

      {/* Overlay = UI sopra al canvas */}
      <PressableContainer handlePress={handlePress} />
      {endGameOverlay && <EndGameOverlay router={router} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RaceScreen;
