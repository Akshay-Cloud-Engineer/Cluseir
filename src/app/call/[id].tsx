import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Text, Avatar, Button } from "../../components";
import { mockGirls } from "../../data";
import { useCallStore } from "../../store";
import { formatDuration } from "../../utils";
import { CALL_RATES } from "../../constants";

export default function ActiveCallScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const girl = mockGirls.find((g) => g.id === id);
  const { isActive, duration, tickDuration, endCall } = useCallStore();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isActive) {
      router.replace("/(tabs)");
      return;
    }
    intervalRef.current = setInterval(() => {
      tickDuration();
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, tickDuration, router]);

  const handleEndCall = () => {
    endCall();
  };

  if (!girl) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#000", alignItems: "center", justifyContent: "center" }}>
        <Text variant="h4">Call not found</Text>
        <Button variant="primary" style={{ marginTop: 16 }} onPress={() => router.replace("/(tabs)")}>
          Go Back
        </Button>
      </SafeAreaView>
    );
  }

  const cost = duration * CALL_RATES.perMinute / 60;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 24 }}>
        <Avatar uri={girl.avatar} size={160} />
        <Text variant="h2" style={{ marginTop: 20 }}>{girl.name}</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 8 }}>
          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#22c55e" }} />
          <Text variant="caption" color="#22c55e">Connected</Text>
        </View>

        <View style={{ marginTop: 40, alignItems: "center" }}>
          <Text variant="h1" style={{ letterSpacing: 4 }}>
            {formatDuration(duration)}
          </Text>
          <Text variant="caption" color="#A3A3A3" style={{ marginTop: 8 }}>
            ${cost.toFixed(2)} charged so far
          </Text>
        </View>

        <View style={{ flexDirection: "row", gap: 32, marginTop: 48 }}>
          <Button variant="ghost" size="lg" onPress={() => {}}>
            <Text style={{ fontSize: 28 }}>🔇</Text>
          </Button>
          <Button variant="ghost" size="lg" onPress={() => {}}>
            <Text style={{ fontSize: 28 }}>📹</Text>
          </Button>
        </View>

        <Button
          variant="primary"
          size="lg"
          fullWidth
          onPress={handleEndCall}
          style={{
            marginTop: 48,
            backgroundColor: "#ef4444",
          }}
        >
          End Call
        </Button>
      </View>
    </SafeAreaView>
  );
}
