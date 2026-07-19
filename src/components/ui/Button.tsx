import React, { ReactNode } from "react";
import { TouchableOpacity, ActivityIndicator, Text, ViewStyle, TextStyle } from "react-native";
import { useThemeStore } from "../../store";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
  children: ReactNode;
  style?: ViewStyle;
  className?: string;
  fullWidth?: boolean;
}

export const Button = ({
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  onPress,
  children,
  style,
  className,
  fullWidth = false,
}: ButtonProps) => {
  const isDark = useThemeStore((s) => s.mode) === "dark";

  const sizeStyles: Record<ButtonSize, ViewStyle> = {
    sm: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 },
    md: { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 12 },
    lg: { paddingVertical: 16, paddingHorizontal: 32, borderRadius: 16 },
  };

  const variantStyles: Record<ButtonVariant, ViewStyle> = {
    primary: { backgroundColor: "#ec4899" },
    secondary: { backgroundColor: "#8b5cf6" },
    outline: {
      backgroundColor: "transparent",
      borderWidth: 1.5,
      borderColor: isDark ? "#333" : "#E5E5E5",
    },
    ghost: { backgroundColor: "transparent" },
  };

  const textColors: Record<ButtonVariant, string> = {
    primary: "#FFFFFF",
    secondary: "#FFFFFF",
    outline: isDark ? "#FFFFFF" : "#000000",
    ghost: "#ec4899",
  };

  const sizeTextStyles: Record<ButtonSize, TextStyle> = {
    sm: { fontSize: 14, fontWeight: "600" },
    md: { fontSize: 16, fontWeight: "600" },
    lg: { fontSize: 18, fontWeight: "600" },
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      className={className}
      style={[
        sizeStyles[size],
        variantStyles[variant],
        { flexDirection: "row", alignItems: "center", justifyContent: "center" },
        fullWidth && { width: "100%" },
        disabled && { opacity: 0.5 },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColors[variant]} />
      ) : typeof children === "string" ? (
        <Text style={[sizeTextStyles[size], { color: textColors[variant] }]}>
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};


