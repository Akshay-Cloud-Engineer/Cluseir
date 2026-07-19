import React from "react";
import { View } from "react-native";
import { Text } from "./ui/Text";
import { Button } from "./ui/Button";

interface EmptyStateProps {
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: string;
}

export const EmptyState = ({
  title,
  message,
  actionLabel,
  onAction,
  icon,
}: EmptyStateProps) => {
  return (
    <View className="flex-1 items-center justify-center p-8 pt-20">
      {icon && <Text className="text-[60px] mb-4">{icon}</Text>}
      <Text variant="h4" className="text-center mb-2">
        {title}
      </Text>
      {message && (
        <Text
          variant="body"
          className="text-center mb-6 text-muted-light dark:text-muted-dark"
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
