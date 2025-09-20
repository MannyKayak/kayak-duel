import { startGameLoop, stopGameLoop } from "@/game/gameLoop";
import { setBaseState } from "@/reduxSlices/gameSlice";
import { RootState } from "@/services/store";
import { PlayerState } from "@/types";
import { goToResults } from "@/utils/functions";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
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
  const gameState = useSelector((s: RootState) => s.gameState.baseState);
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
    if (gameState !== "running") return;
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
  }, [dispatch, gameState, router]);

  return (
    <View style={styles.container}>
      <Text>Kayak position: {position}</Text>
      <Text>Kayak speed: {playerState.current.speed}</Text>
      <View style={styles.pressableContainer}>
        <Pressable
          style={styles.leftButton}
          onPress={() => handlePress("L")}
        ></Pressable>
        <Pressable
          style={styles.rightButton}
          onPress={() => handlePress("R")}
        ></Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pressableContainer: {
    display: "flex",
    flexDirection: "row",
  },
  leftButton: {
    backgroundColor: "lightblue",
    padding: 20,
    margin: 0,
    width: "50%",
    height: 300,
  },
  rightButton: {
    backgroundColor: "lightgreen",
    padding: 20,
    margin: 0,
    width: "50%",
    height: 300,
  },
});

export default RaceScreen;
