import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <Text>Kayak duel</Text>
        <Link href={"/race"}>Go to Race</Link>
        <Link href={"/result"}>Go to Result</Link>
      </View>
    </View>
  );
}
