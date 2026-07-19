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
      <Stack screenOptions={{ headerShown: false }} />
      <Toast />
    </AppProviders>
  );
}
