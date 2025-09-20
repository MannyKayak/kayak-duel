import Button from "@/components/Button";
import { setBaseState } from "@/reduxSlices/gameSlice";
import { RootState } from "@/services/store";
import { Link, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Index() {
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
      <View>
        <Text style={styles.title}>Kayak Duel!</Text>
        <Button title="Start Game" onPress={startGame} />

        <Link href={"/resultScreen"}>Go to Result</Link>

        <Text>Current State: {gameState}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});
