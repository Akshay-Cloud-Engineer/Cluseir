import React from "react";
import { View } from "react-native";
import { Text } from "./ui/Text";
import { Button } from "./ui/Button";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState = ({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  onRetry,
}: ErrorStateProps) => {
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
      <Text
        variant="body"
        color="#A3A3A3"
        style={{ textAlign: "center", marginBottom: 24 }}
      >
        {message}
      </Text>
      {onRetry && (
        <Button variant="primary" onPress={onRetry}>
          Try Again
        </Button>
      )}
    </View>
  );
};
