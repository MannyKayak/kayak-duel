import { socket } from "@/lib/socket";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type ConnectionStatus = "idle" | "connecting" | "connected" | "error";

export default function Index() {
  const [status, setStatus] = useState<ConnectionStatus>("idle");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    socket.on("connect", () => {
      setStatus("connected");
      setMessage("Connessione OK: " + socket.id);
    });

    socket.on("connect_error", (error) => {
      setStatus("error");
      setMessage("Errore: " + error.message);
    });

    socket.on("disconnect", () => {
      setStatus("idle");
      setMessage("Socket disconnesso");
    });

    socket.on("match_start", (data) => {
      setMessage("Match trovato! Room: " + data.roomId);
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("disconnect");
      socket.off("match_start");
    };
  }, []);

  const connectToServer = () => {
    if (socket.connected || status === "connecting") return;
    setStatus("connecting");
    setMessage("Connessione in corso...");
    socket.connect();
  };

  const disconnectFromServer = () => {
    socket.disconnect();
    setStatus("idle");
    setMessage("");
  };

  const isConnecting = status === "connecting";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kayak Duel</Text>

      {isConnecting && (
        <View style={styles.loaderRow}>
          <ActivityIndicator />
          <Text style={styles.loaderText}>Connessione...</Text>
        </View>
      )}

      <Pressable
        style={[styles.button, isConnecting && styles.buttonDisabled]}
        disabled={isConnecting}
        onPress={socket.connected ? disconnectFromServer : connectToServer}
      >
        <Text style={styles.buttonText}>
          {socket.connected ? "Stop connection" : "Start connection"}
        </Text>
      </Pressable>

      <Text style={styles.msg}>{message}</Text>
      <Text style={styles.badge}>Status: {status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  title: { fontSize: 22, fontWeight: "700" },
  loaderRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  loaderText: { fontSize: 14 },
  button: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: "#0a84ff",
    borderRadius: 10,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: "white", fontWeight: "700" },
  msg: { marginTop: 12 },
  badge: { marginTop: 6, opacity: 0.7 },
});
