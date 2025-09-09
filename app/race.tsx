import { startGameLoop, stopGameLoop } from "@/game/gameLoop";
import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";

export default function Race() {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    startGameLoop(
      { position: 0, lastTap: "L", gameOver: "race" },
      (state) => {
        // callback ogni tick
        setPosition(state.position);
      },
      (finalState) => {
        console.log("Race finished!", finalState);
      }
    );

    return () => stopGameLoop();
  }, []);

  return (
    <View>
      <Text>Race in progress...</Text>
      <Text>Position: {position.toFixed(1)}</Text>
      <Button title="Stop Race" onPress={stopGameLoop} />
    </View>
  );
}
