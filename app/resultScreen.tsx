import Octicons from "@expo/vector-icons/Octicons";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Result = () => {
  return (
    <View style={styles.container}>
      <Text>Result Page</Text>
      <Link style={styles.linkButton} href="/">
        <Octicons style={styles.homeIcon} name="home" size={30} />
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  linkButton: {
    backgroundColor: "blue",
    padding: 20,
    margin: 10,
    borderRadius: 20,
  },
  homeIcon: {
    color: "white",
  },
});

export default Result;
