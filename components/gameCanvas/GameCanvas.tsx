import { convertMotionToSpritePosition } from "@/utils/functions";
import { Canvas, Circle } from "@shopify/react-native-skia";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

interface GameCanvasProps {
  position: number;
}

export default function GameCanvas(props: GameCanvasProps) {
  // queste const regolano il movimento degli elementi, non sono numeri che influenzano il gioco
  const [kayakPosition, setKayakPosition] = useState<number>(500);
  useEffect(() => {
    setKayakPosition(() => convertMotionToSpritePosition(props.position));
  }, [props.position, kayakPosition]);

  return (
    <Canvas style={styles.canvas}>
      <Circle cx={200} cy={kayakPosition} r={20} color={"cyan"} />
    </Canvas>
  );
}

const styles = StyleSheet.create({
  canvas: {
    zIndex: 0,
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
});
