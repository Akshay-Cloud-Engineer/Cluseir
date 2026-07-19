import React, { useEffect, ReactNode } from "react";
import { View, Dimensions, TouchableWithoutFeedback } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
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
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const backdropOpacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0, {
        damping: 20,
        stiffness: 90,
      });
      backdropOpacity.value = withTiming(1, { duration: 300 });
    } else {
      translateY.value = withTiming(SCREEN_HEIGHT, { duration: 250 });
      backdropOpacity.value = withTiming(0, { duration: 250 });
    }
  }, [visible, translateY, backdropOpacity]);

  const animatedBackdropStyle = useAnimatedStyle(() => {
    return {
      opacity: backdropOpacity.value,
      // hide completely when not visible and animation finished
      display: backdropOpacity.value === 0 && !visible ? "none" : "flex",
    };
  });

  const animatedSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  // Always render to allow exit animations, but pointer events handled by display: none on backdrop
  return (
    <View className="absolute top-0 left-0 right-0 bottom-0 z-[1000]" pointerEvents={visible ? "auto" : "none"}>
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View
          style={[animatedBackdropStyle]}
          className="flex-1 bg-black/50"
        />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[{ height }, animatedSheetStyle]}
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

