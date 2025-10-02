import { PressableContainerProps } from "@/types";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

export default function PressableContainer({
  handlePress,
}: PressableContainerProps) {
  return (
    <View style={styles.pressableContainer}>
      <Pressable style={styles.leftButton} onPress={() => handlePress("L")} />
      <Pressable style={styles.rightButton} onPress={() => handlePress("R")} />
    </View>
  );
}

const styles = StyleSheet.create({
  pressableContainer: {
    flexDirection: "row",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 100,
    justifyContent: "flex-end", // controlli in basso
    alignItems: "center",
    zIndex: 20,
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
