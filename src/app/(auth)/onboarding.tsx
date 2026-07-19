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
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <View className="flex-1 px-6">
        <View className="items-end pt-2">
          <Button variant="ghost" onPress={handleSkip}>
            Skip
          </Button>
        </View>

        <View className="flex-1 items-center justify-center">
          <Text className="text-[100px] mb-8">{slide.emoji}</Text>
          <Text
            variant="h1"
            className="text-center mb-4"
          >
            {slide.title}
          </Text>
          <Text
            variant="body"
            className="text-center text-muted-light dark:text-muted-dark leading-6"
          >
            {slide.description}
          </Text>
        </View>

        <View className="items-center mb-8">
          <View className="flex-row gap-2 mb-8">
            {slides.map((_, i) => (
              <View
                key={i}
                className={`h-2 rounded-full ${
                  currentSlide === i
                    ? "w-6 bg-primary-500"
                    : "w-2 bg-neutral-800"
                }`}
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
