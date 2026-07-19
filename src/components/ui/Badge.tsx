import React, { ReactNode } from "react";
import { View, ViewStyle } from "react-native";
import { Text } from "./Text";
import { useThemeStore } from "../../store";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "primary" | "success" | "warning" | "error";
  size?: "sm" | "md";
  style?: ViewStyle;
}

const useBgColors = () => {
  const isDark = useThemeStore((s) => s.mode) === "dark";
  return {
    default: isDark ? "#333" : "#E5E5E5",
    primary: "#ec489920",
    success: "#22c55e20",
    warning: "#f59e0b20",
    error: "#ef444420",
  };
};

const useTextColors = () => {
  const isDark = useThemeStore((s) => s.mode) === "dark";
  return {
    default: isDark ? "#A3A3A3" : "#737373",
    primary: "#ec4899",
    success: "#22c55e",
    warning: "#f59e0b",
    error: "#ef4444",
  };
};

export const Badge = ({ children, variant = "default", size = "sm", style }: BadgeProps) => {
  const bgColors = useBgColors();
  const textColors = useTextColors();
  return (
    <View
      style={[{
        backgroundColor: bgColors[variant],
        borderRadius: 100,
        paddingHorizontal: size === "sm" ? 8 : 12,
        paddingVertical: size === "sm" ? 3 : 6,
        alignSelf: "flex-start",
      }, style]}
    >
      <Text
        variant={size === "sm" ? "tiny" : "small"}
        color={textColors[variant]}
      >
        {children}
      </Text>
    </View>
  );
};
