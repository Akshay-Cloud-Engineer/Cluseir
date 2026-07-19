import React, { useEffect, useRef, ReactNode } from "react";
import { View, Animated, Dimensions, TouchableWithoutFeedback } from "react-native";
import { Text } from "./ui/Text";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  height?: number;
}

export const BottomSheet = ({
  visible,
  onClose,
  title,
  children,
  height = SCREEN_HEIGHT * 0.5,
}: BottomSheetProps) => {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(translateY, {
        toValue: 0,
        damping: 20,
        stiffness: 90,
        useNativeDriver: true,
      }).start();
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }).start();
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, translateY, backdropOpacity]);

  return (
    <View className="absolute top-0 left-0 right-0 bottom-0 z-[1000]" pointerEvents={visible ? "auto" : "none"}>
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View
          style={[{ opacity: backdropOpacity }]}
          className="flex-1 bg-black/50"
        />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[{ height }, { transform: [{ translateY }] }]}
        className="absolute bottom-0 left-0 right-0 bg-surface-light dark:bg-[#1E1E1E] rounded-t-3xl p-5"
      >
        <View className="w-10 h-1 rounded-full bg-neutral-300 dark:bg-neutral-600 self-center mb-4" />
        {title && (
          <Text variant="h4" className="mb-4">
            {title}
          </Text>
        )}
        {children}
      </Animated.View>
    </View>
  );
};
