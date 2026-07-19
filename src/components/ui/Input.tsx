import React, { forwardRef } from "react";
import { TextInput, View, TextInputProps, ViewStyle } from "react-native";
import { Text } from "./Text";
import { useThemeStore } from "../../store";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ label, error, containerStyle, style, ...props }, ref) => {
    const isDark = useThemeStore((s) => s.mode) === "dark";

    return (
      <View style={[{ marginBottom: 16 }, containerStyle]}>
        {label && (
          <Text variant="captionBold" style={{ marginBottom: 8, color: isDark ? "#A3A3A3" : "#737373" }}>
            {label}
          </Text>
        )}
        <TextInput
          ref={ref}
          placeholderTextColor={isDark ? "#555" : "#999"}
          style={[
            {
              backgroundColor: isDark ? "#1E1E1E" : "#F5F5F5",
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 14,
              fontSize: 16,
              color: isDark ? "#FFFFFF" : "#000000",
              borderWidth: 1,
              borderColor: error
                ? "#ef4444"
                : isDark
                  ? "#333"
                  : "#E5E5E5",
            },
            style,
          ]}
          {...props}
        />
        {error && (
          <Text variant="small" color="#ef4444" style={{ marginTop: 4 }}>
            {error}
          </Text>
        )}
      </View>
    );
  },
);

Input.displayName = "Input";
