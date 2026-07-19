import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "../store";

export default function Index() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isOnboarded = useAuthStore((s) => s.isOnboarded);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOnboarded) {
        router.replace("/(auth)/onboarding");
      } else if (isAuthenticated) {
        router.replace("/(tabs)");
      } else {
        router.replace("/(auth)/onboarding");
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, [isAuthenticated, isOnboarded, router]);

  return (
    <View className="flex-1 items-center justify-center bg-background-light dark:bg-background-dark">
      <ActivityIndicator size="large" color="#ec4899" />
    </View>
  );
}
