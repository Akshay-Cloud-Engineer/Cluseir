import React from "react";
import { View } from "react-native";
import { useThemeStore } from "../../store";

interface DividerProps {
  color?: string;
  thickness?: number;
  marginVertical?: number;
}

export const Divider = ({ color, thickness = 1, marginVertical = 16 }: DividerProps) => {
  const isDark = useThemeStore((s) => s.mode) === "dark";
  return (
    <View
      style={{
        height: thickness,
        backgroundColor: color || (isDark ? "#333" : "#E5E5E5"),
        marginVertical,
      }}
    />
  );
};
