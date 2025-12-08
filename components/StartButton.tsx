import { LinearGradient } from "expo-linear-gradient";
import React, { useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

const StartButton = ({ onPress }: { onPress: () => void }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 30,
      bounciness: 6,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 8,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
      >
        <LinearGradient
          colors={["#00F5A0", "#00D9F5"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.buttonContainer}
        >
          <View style={styles.glowLayer} />
          <Text style={styles.buttonText}>START</Text>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: 200,
    height: 70,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#00F5A0",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  glowLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,255,200,0.2)",
    borderRadius: 35,
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 4,
    textShadowColor: "rgba(0,255,255,0.7)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
});

export default StartButton;
