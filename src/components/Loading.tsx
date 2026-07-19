import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Text } from "./ui/Text";

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

export const Loading = ({ message = "Loading...", fullScreen = false }: LoadingProps) => {
  return (
    <View
      style={[
        {
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        },
        fullScreen && { flex: 1, backgroundColor: "#000000" },
      ]}
    >
      <ActivityIndicator size="large" color="#ec4899" />
      <Text
        variant="caption"
        color="#A3A3A3"
        style={{ marginTop: 12 }}
      >
        {message}
      </Text>
    </View>
  );
};
