import React from "react";
import { View } from "react-native";
import { Text } from "./ui/Text";
import { Button } from "./ui/Button";

interface EmptyStateProps {
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState = ({
  title,
  message,
  actionLabel,
  onAction,
}: EmptyStateProps) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 32,
      }}
    >
      <Text variant="h4" style={{ textAlign: "center", marginBottom: 8 }}>
        {title}
      </Text>
      {message && (
        <Text
          variant="body"
          color="#A3A3A3"
          style={{ textAlign: "center", marginBottom: 24 }}
        >
          {message}
        </Text>
      )}
      {actionLabel && onAction && (
        <Button variant="primary" onPress={onAction}>
          {actionLabel}
        </Button>
      )}
    </View>
  );
};
