import { setBaseState } from "@/reduxSlices/gameSlice";
import { RootState } from "@/services/store";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import StartButton from "./StartButton";

export default function MainMenu() {
  const router = useRouter();
  // qunando il bottone di start viene premuto si passa alla schermata di gara e viene aggiornato lo sato
  const dispatch = useDispatch();
  const gameState = useSelector((s: RootState) => s.gameState.baseState);

  const startGame = () => {
    dispatch(setBaseState("running"));
    router.navigate("/raceScreen");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kayak Duel</Text>

      <StartButton onPress={startGame} />

      <Pressable
        style={styles.startButton}
        onPress={() => router.navigate("/racePage")}
      >
        <Text>Race Page</Text>
      </Pressable>

      <Link href={"/resultScreen"}>Go to Result</Link>

      <Text>Current State: {gameState}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "900",
    marginBottom: 40,
    textAlign: "center",
    color: "blue",
    textTransform: "uppercase",
  },
  startButton: {
    margin: 10,
    borderColor: "blue",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 20,
    padding: 10,
  },
});
