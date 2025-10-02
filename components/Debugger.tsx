import { DebuggerProps } from "@/types";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Debugger(props: DebuggerProps) {
  return (
    <View style={styles.debugContainer}>
      <Text>Kayak position: {props.positionInGameUnits.toPrecision(2)}</Text>
      <Text>Kayak speed: {props.playerSpeed.toPrecision(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  debugContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "lightgray",
    padding: 4,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    zIndex: 100,
  },
});
