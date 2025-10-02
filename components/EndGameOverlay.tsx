import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function EndGameOverlay() {
  return (
    <View style={styles.container}>
      <Text>Game Over!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 600,
    zIndex: 40,
    opacity: 0.6,
    backgroundColor: "green",
    position: "absolute",
    justifyContent: "center",
    alignSelf: "center",
    width: 300,
    margin: 20,
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
});
