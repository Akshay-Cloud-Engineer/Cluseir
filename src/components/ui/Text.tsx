import React, { ReactNode } from "react";
import { Text as RNText, TextProps as RNTextProps, TextStyle } from "react-native";
import { useThemeStore } from "../../store";

type TextVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "body" | "bodyBold" | "caption" | "captionBold" | "small" | "smallBold" | "tiny";

const variantStyles: Record<TextVariant, TextStyle> = {
  h1: { fontSize: 32, fontWeight: "700", lineHeight: 40 },
  h2: { fontSize: 28, fontWeight: "700", lineHeight: 36 },
  h3: { fontSize: 24, fontWeight: "600", lineHeight: 32 },
  h4: { fontSize: 20, fontWeight: "600", lineHeight: 28 },
  h5: { fontSize: 18, fontWeight: "600", lineHeight: 24 },
  body: { fontSize: 16, fontWeight: "400", lineHeight: 24 },
  bodyBold: { fontSize: 16, fontWeight: "600", lineHeight: 24 },
  caption: { fontSize: 14, fontWeight: "400", lineHeight: 20 },
  captionBold: { fontSize: 14, fontWeight: "600", lineHeight: 20 },
  small: { fontSize: 12, fontWeight: "400", lineHeight: 16 },
  smallBold: { fontSize: 12, fontWeight: "600", lineHeight: 16 },
  tiny: { fontSize: 10, fontWeight: "400", lineHeight: 14 },
};

interface TextProps extends RNTextProps {
  variant?: TextVariant;
  color?: string;
  children: ReactNode;
}

export const Text = ({ variant = "body", color, style, children, ...props }: TextProps) => {
  const mode = useThemeStore((s) => s.mode);
  const defaultColor = mode === "dark" ? "#FFFFFF" : "#000000";

  return (
    <RNText
      style={[
        variantStyles[variant],
        { color: color || defaultColor },
        style as TextStyle,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};
