import React from "react";
import { View } from "react-native";

interface DividerProps {
  color?: string;
  thickness?: number;
  marginVertical?: number;
}

export const Divider = ({ color = "#333", thickness = 1, marginVertical = 16 }: DividerProps) => {
  return (
    <View
      style={{
        height: thickness,
        backgroundColor: color,
        marginVertical,
      }}
    />
  );
};
