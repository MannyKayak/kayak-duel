import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Race = () => {
  return (
    <View style={styles.container}>
      <Text>Race Page</Text>
      <Link href="/">Go Home</Link>
      <Link href="/result">Go to Result</Link>
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

export default Race;
