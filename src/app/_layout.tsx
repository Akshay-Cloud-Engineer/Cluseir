import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { AppProviders } from "../providers/AppProviders";
import { Toast } from "../components/Toast";
import * as SplashScreen from "expo-splash-screen";
import "../theme/global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTimeout(async () => {
      setReady(true);
      await SplashScreen.hideAsync();
    }, 2000);
  }, []);

  if (!ready) return null;

  return (
    <AppProviders>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="girl/[id]" options={{ animation: "slide_from_right" }} />
        <Stack.Screen name="call/[id]" options={{ animation: "slide_from_bottom" }} />
        <Stack.Screen name="call-history" options={{ animation: "slide_from_right" }} />
        <Stack.Screen name="incoming-request" options={{ animation: "slide_from_bottom" }} />
        <Stack.Screen name="outgoing-request" options={{ animation: "slide_from_right" }} />
        <Stack.Screen name="filters" options={{ animation: "slide_from_bottom" }} />
        <Stack.Screen name="edit-profile" options={{ animation: "slide_from_right" }} />
        <Stack.Screen name="report-user" options={{ animation: "slide_from_right" }} />
        <Stack.Screen name="block-user" options={{ animation: "slide_from_right" }} />
        <Stack.Screen name="help" options={{ animation: "slide_from_right" }} />
        <Stack.Screen name="about" options={{ animation: "slide_from_right" }} />
      </Stack>
      <Toast />
    </AppProviders>
  );
}
