import { Dimensions, ScaledSize } from "react-native";

export const useResponsive = () => {
  const { width, height }: ScaledSize = Dimensions.get("window");

  const isSmall = width < 375;
  const isMedium = width >= 375 && width < 768;
  const isLarge = width >= 768;

  const scale = (size: number): number => {
    const baseWidth = 375;
    return (width / baseWidth) * size;
  };

  return {
    width,
    height,
    isSmall,
    isMedium,
    isLarge,
    scale,
    hp: (percent: number) => (height * percent) / 100,
    wp: (percent: number) => (width * percent) / 100,
  };
};
