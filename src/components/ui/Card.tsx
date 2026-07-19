import React, { ReactNode } from "react";
import { View, ViewStyle } from "react-native";
import { useThemeStore } from "../../store";

interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
  className?: string;
  padded?: boolean;
}

export const Card = ({ children, style, className, padded = true }: CardProps) => {
  const isDark = useThemeStore((s) => s.mode) === "dark";
  return (
    <View
      className={className}
      style={[
        {
          backgroundColor: isDark ? "#1E1E1E" : "#F5F5F5",
          borderRadius: 16,
          padding: padded ? 16 : 0,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 8,
          elevation: 5,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};
