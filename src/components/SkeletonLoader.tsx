import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";

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
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: "#1E1E1E",
          opacity,
        },
        style,
      ]}
    />
  );
};

export const CardSkeleton = () => (
  <View
    style={{
      backgroundColor: "#1E1E1E",
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
    }}
  >
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <SkeletonLoader width={56} height={56} borderRadius={28} />
      <View style={{ marginLeft: 12, flex: 1 }}>
        <SkeletonLoader width="60%" height={18} style={{ marginBottom: 8 }} />
        <SkeletonLoader width="40%" height={14} />
      </View>
    </View>
    <SkeletonLoader width="100%" height={14} style={{ marginTop: 12 }} />
    <SkeletonLoader width="80%" height={14} style={{ marginTop: 8 }} />
    <View style={{ flexDirection: "row", marginTop: 12, gap: 8 }}>
      <SkeletonLoader width={60} height={24} borderRadius={12} />
      <SkeletonLoader width={80} height={24} borderRadius={12} />
      <SkeletonLoader width={50} height={24} borderRadius={12} />
    </View>
  </View>
);
