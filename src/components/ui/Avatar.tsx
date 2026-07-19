import React from "react";
import { Image, View } from "react-native";
import { Text } from "./Text";
import { getInitials } from "../../utils";

interface AvatarProps {
  uri?: string;
  name?: string;
  size?: number;
  isOnline?: boolean;
}

export const Avatar = ({ uri, name = "", size = 48, isOnline }: AvatarProps) => {
  return (
    <View style={{ position: "relative" }}>
      {uri ? (
        <Image
          source={{ uri }}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: "#333",
          }}
        />
      ) : (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: "#ec4899",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            variant="bodyBold"
            color="#FFFFFF"
            style={{ fontSize: size * 0.4 }}
          >
            {getInitials(name)}
          </Text>
        </View>
      )}
      {isOnline !== undefined && (
        <View
          style={{
            position: "absolute",
            bottom: 2,
            right: 2,
            width: size * 0.25,
            height: size * 0.25,
            borderRadius: (size * 0.25) / 2,
            backgroundColor: isOnline ? "#22c55e" : "#737373",
            borderWidth: 2,
            borderColor: "#1E1E1E",
          }}
        />
      )}
    </View>
  );
};
