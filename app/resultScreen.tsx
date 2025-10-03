import HomeIcon from "@/constants/icons/HomeIcon";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Result = () => {
  return (
    <View style={styles.container}>
      <Text>Result Page</Text>
      <Link style={styles.linkButton} href="/">
        <HomeIcon />
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
  buttonText: {
    color: "white",
    fontSize: 40,
    fontWeight: 600,
  },
});

export default Result;
