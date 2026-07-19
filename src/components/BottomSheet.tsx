import React, { useEffect, useRef, useState, ReactNode } from "react";
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
  const [rendered, setRendered] = useState(visible);
  const visibleRef = useRef(visible);
  visibleRef.current = visible;
  const translateY = useRef(new Animated.Value(height)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setRendered(true);
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          damping: 20,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: height,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (!visibleRef.current) setRendered(false);
      });
    }
  }, [visible, height, translateY, backdropOpacity]);

  if (!rendered) return null;

  return (
    <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000 }}>
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            opacity: backdropOpacity,
          }}
        />
      </TouchableWithoutFeedback>
      <Animated.View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height,
          backgroundColor: "#1E1E1E",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          padding: 20,
          transform: [{ translateY }],
        }}
      >
        <View
          style={{
            width: 40,
            height: 4,
            borderRadius: 2,
            backgroundColor: "#555",
            alignSelf: "center",
            marginBottom: 16,
          }}
        />
        {title && (
          <Text variant="h4" style={{ marginBottom: 16 }}>
            {title}
          </Text>
        )}
        {children}
      </Animated.View>
    </View>
  );
};
