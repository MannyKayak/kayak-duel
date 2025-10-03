import { setBaseState, setEndGameOverlay } from "@/reduxSlices/gameSlice";
import { EndGameOverlayProps } from "@/types";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";

export default function EndGameOverlay({ router }: EndGameOverlayProps) {
  const dispatch = useDispatch();
  const handlePress = () => {
    router.replace("/resultScreen");
    dispatch(setEndGameOverlay(false));
    dispatch(setBaseState("idle"));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Game Over!</Text>
      <Pressable style={styles.button} onPress={handlePress}>
        <Text style={styles.text}>Vai ai risultati</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    zIndex: 40,
    backgroundColor: "green",
    position: "absolute",
    top: 200,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: 300,
    margin: 20,
    borderRadius: 20,
    padding: 20,
    textAlign: "center",
  },

  content: {
    height: "20%",
    width: "80%",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  button: {
    backgroundColor: "darkgreen",
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
});
