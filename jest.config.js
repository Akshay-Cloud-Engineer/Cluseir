/** @type {import('jest').Config} */
module.exports = {
  preset: "react-native",
  passWithNoTests: true,
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|expo|@expo|expo-router|react-native-reanimated|react-native-gesture-handler|react-native-screens|react-native-safe-area-context)/)",
  ],
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts"],
};
