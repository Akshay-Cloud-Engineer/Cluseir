import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

interface SkeletonLoaderProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: object;
}

export const SkeletonLoader = ({
  width = "100%",
  height = 20,
  borderRadius = 8,
  style,
}: SkeletonLoaderProps) => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 800 }),
        withTiming(0.3, { duration: 800 })
      ),
      -1,
      true
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
        },
        animatedStyle,
        style,
      ]}
      className="bg-neutral-300 dark:bg-neutral-800"
    />
  );
};

export const CardSkeleton = () => (
  <View className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 mb-3">
    <View className="flex-row items-center">
      <SkeletonLoader width={56} height={56} borderRadius={28} />
      <View className="ml-3 flex-1">
        <SkeletonLoader width="60%" height={18} style={{ marginBottom: 8 }} />
        <SkeletonLoader width="40%" height={14} />
      </View>
    </View>
    <SkeletonLoader width="100%" height={14} style={{ marginTop: 12 }} />
    <SkeletonLoader width="80%" height={14} style={{ marginTop: 8 }} />
    <View className="flex-row mt-3 gap-2">
      <SkeletonLoader width={60} height={24} borderRadius={12} />
      <SkeletonLoader width={80} height={24} borderRadius={12} />
      <SkeletonLoader width={50} height={24} borderRadius={12} />
    </View>
  </View>
);

