import Debugger from "@/components/Debugger";
import GameCanvas from "@/components/gameCanvas/GameCanvas";
import { startGameLoop, stopGameLoop } from "@/game/gameLoop";
import { setBaseState } from "@/reduxSlices/gameSlice";
import { RootState } from "@/services/store";
import { PlayerState } from "@/types";
import { goToResults } from "@/utils/functions";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
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
  const { baseState, debug } = useSelector((s: RootState) => s.gameState);
  const router = useRouter();
  // uso useRef per mantenere lo stato del giocatore senza renderizzare il componente ad ogni cambiamento
  const playerState = useRef<PlayerState>({
    ...initialPlayerState,
  });
  const [position, setPosition] = useState(initialPlayerState.position);
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
    console.log(">>> useEffect mount RaceScreen");
    if (baseState !== "running") return;
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
        goToResults(router);
        console.log("gameover");
      }
    );

    return () => stopGameLoop();
  }, [dispatch, baseState, router]);

  return (
    <View style={styles.container}>
      {/* Canvas = background layer */}
      <GameCanvas position={position} />

      {/* Overlay = UI sopra al canvas */}
      <View style={styles.overlay}>
        {debug && (
          <Debugger
            positionInGameUnits={position}
            playerSpeed={playerState.current.speed}
          />
        )}

        <View style={styles.pressableContainer}>
          <Pressable
            style={styles.leftButton}
            onPress={() => handlePress("L")}
          />
          <Pressable
            style={styles.rightButton}
            onPress={() => handlePress("R")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end", // controlli in basso
    alignItems: "center",
    zIndex: 10,
    paddingBottom: 30,
  },
  pressableContainer: {
    flexDirection: "row",
    width: "100%",
  },
  leftButton: {
    backgroundColor: "lightblue",
    width: "50%",
    height: 200,
  },
  rightButton: {
    backgroundColor: "lightgreen",
    width: "50%",
    height: 200,
  },
});

export default RaceScreen;
