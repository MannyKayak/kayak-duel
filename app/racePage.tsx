import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const RacePage: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  // check user login:
  // if logged => wait for other player
  // else => create player

  if (!userId)
    return (
      <View style={styles.container}>
        <Text>User not logged</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text>User logged with id: {userId}</Text>
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

export default RacePage;
