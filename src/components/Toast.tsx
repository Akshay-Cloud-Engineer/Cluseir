import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "./ui/Text";
import { useToastStore } from "../store";

const ToastItem = ({ toast }: { toast: { id: string; message: string; type: "success" | "error" | "info" | "warning" } }) => {
  const translateY = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      damping: 15,
    }).start();
  }, [translateY]);

  const bgColor =
    toast.type === "success"
      ? "#22c55e"
      : toast.type === "error"
        ? "#ef4444"
        : toast.type === "warning"
          ? "#f59e0b"
          : "#3b82f6";

  return (
    <Animated.View
      style={{
        transform: [{ translateY }],
        backgroundColor: bgColor,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginHorizontal: 16,
        marginBottom: 8,
      }}
    >
      <Text variant="captionBold" color="#FFFFFF">
        {toast.message}
      </Text>
    </Animated.View>
  );
};

export const Toast = () => {
  const toasts = useToastStore((s) => s.toasts);

  if (toasts.length === 0) return null;

  return (
    <SafeAreaView
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        paddingTop: 50,
      }}
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </SafeAreaView>
  );
};
