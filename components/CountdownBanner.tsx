import { CountdownBannerProps } from "@/types";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CountdownBanner = ({ secondsLeft }: CountdownBannerProps) => {
  switch (secondsLeft) {
    case 2:
      return (
        <View style={styles.bannerContainer}>
          <Text style={styles.text}>Ready...</Text>
        </View>
      );
    case 1:
      return (
        <View style={styles.bannerContainer}>
          <Text style={styles.text}>Set...</Text>
        </View>
      );
    case 0:
      return (
        <View style={styles.bannerContainer}>
          <Text style={styles.text}>Go!</Text>
        </View>
      );
    default:
      return <View></View>;
  }
};

export default CountdownBanner;

const styles = StyleSheet.create({
  bannerContainer: {
    position: "absolute",
    top: "50%",
    margin: 0,
    width: "100%",
    height: 100,
    zIndex: 40,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 60,
    fontWeight: "500",
  },
});
