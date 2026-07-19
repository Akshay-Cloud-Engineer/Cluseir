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
      <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark items-center justify-center">
        <Text variant="h4">Call not found</Text>
        <Button variant="primary" className="mt-4" onPress={() => router.replace("/(tabs)")}>
          Go Back
        </Button>
      </SafeAreaView>
    );
  }

  const cost = duration * CALL_RATES.perMinute / 60;

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <View className="flex-1 items-center justify-center px-6">
        <Avatar uri={girl.avatar} size={160} />
        <Text variant="h2" className="mt-5">{girl.name}</Text>
        <View className="flex-row items-center gap-2 mt-2">
          <View className="w-2 h-2 rounded-full bg-success" />
          <Text variant="caption" className="text-success">Connected</Text>
        </View>

        <View className="mt-10 items-center">
          <Text variant="h1" className="tracking-widest">
            {formatDuration(duration)}
          </Text>
          <Text variant="caption" className="mt-2 text-muted-light dark:text-muted-dark">
            ${cost.toFixed(2)} charged so far
          </Text>
        </View>

        <View className="flex-row gap-8 mt-12">
          <Button variant="ghost" size="lg" onPress={() => {}}>
            <Text className="text-[28px]">🔇</Text>
          </Button>
          <Button variant="ghost" size="lg" onPress={() => {}}>
            <Text className="text-[28px]">📹</Text>
          </Button>
        </View>

        <Button
          variant="primary"
          size="lg"
          fullWidth
          onPress={handleEndCall}
          className="mt-12 bg-error"
        >
          End Call
        </Button>
      </View>
    </SafeAreaView>
  );
}

