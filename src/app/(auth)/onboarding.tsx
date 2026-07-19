import React, { useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Button } from "../../components";
import { useAuthStore } from "../../store";

const slides = [
  {
    title: "Welcome to Cluseir",
    description: "Connect with amazing people from around the world through meaningful voice conversations.",
    emoji: "🌍",
  },
  {
    title: "Find Your Match",
    description: "Browse through our curated selection of wonderful conversationalists and find your perfect match.",
    emoji: "💫",
  },
  {
    title: "Start Talking",
    description: "One tap and you're connected. Enjoy high-quality voice calls with people who care.",
    emoji: "🎧",
  },
];

export default function OnboardingScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();
  const setOnboarded = useAuthStore((s) => s.setOnboarded);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setOnboarded(true);
      router.replace("/(tabs)");
    }
  };

  const handleSkip = () => {
    setOnboarded(true);
    router.replace("/(tabs)");
  };

  const slide = slides[currentSlide];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={{ flex: 1, paddingHorizontal: 24 }}>
        <View style={{ alignItems: "flex-end", paddingTop: 8 }}>
          <Button variant="ghost" onPress={handleSkip}>
            Skip
          </Button>
        </View>

        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 100, marginBottom: 32 }}>{slide.emoji}</Text>
          <Text
            variant="h1"
            style={{ textAlign: "center", marginBottom: 16 }}
          >
            {slide.title}
          </Text>
          <Text
            variant="body"
            color="#A3A3A3"
            style={{ textAlign: "center", lineHeight: 24 }}
          >
            {slide.description}
          </Text>
        </View>

        <View style={{ alignItems: "center", marginBottom: 32 }}>
          <View style={{ flexDirection: "row", gap: 8, marginBottom: 32 }}>
            {slides.map((_, i) => (
              <View
                key={i}
                style={{
                  width: currentSlide === i ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: currentSlide === i ? "#ec4899" : "#333",
                }}
              />
            ))}
          </View>
          <Button variant="primary" size="lg" fullWidth onPress={handleNext}>
            {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
