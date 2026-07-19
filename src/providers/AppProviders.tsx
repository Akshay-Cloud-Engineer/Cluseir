import React, { ReactNode } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryProvider } from "./QueryProvider";
import { ThemeProvider } from "./ThemeProvider";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </QueryProvider>
    </GestureHandlerRootView>
  );
};
