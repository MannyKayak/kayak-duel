import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Result = () => {
  return (
    <View style={styles.container}>
      <Text>Result Page</Text>
      <Link href="/">Go Home</Link>
      <Link href="/raceScreen">Go to race</Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Result;
