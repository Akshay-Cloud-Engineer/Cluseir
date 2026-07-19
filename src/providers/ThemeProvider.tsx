import React, { ReactNode } from "react";
import { StatusBar } from "expo-status-bar";
import { useThemeStore } from "../store";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const mode = useThemeStore((state) => state.mode);

  return (
    <>
      <StatusBar style={mode === "dark" ? "light" : "dark"} />
      {children}
    </>
  );
};
