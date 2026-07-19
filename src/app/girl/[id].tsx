import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Text, Card, Avatar, Badge, Button, Divider } from "../../components";
import { mockGirls } from "../../data";
import { useCallStore } from "../../store";

export default function GirlProfileScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const girl = mockGirls.find((g) => g.id === id);
  const startCall = useCallStore((s) => s.startCall);

  if (!girl) {
    return (
      <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark items-center justify-center">
        <Text variant="h4">Girl not found</Text>
        <Button variant="primary" className="mt-4" onPress={() => router.back()}>
          Go Back
        </Button>
      </SafeAreaView>
    );
  }

  const handleCall = () => {
    startCall(girl.id, girl.name);
    router.push(`/call/${girl.id}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="relative">
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-3 left-4 z-10 w-10 h-10 rounded-full bg-black/50 items-center justify-center"
          >
            <Text className="text-[20px] text-white">‹</Text>
          </TouchableOpacity>
          <View className="items-center pt-5 pb-4">
            <Avatar uri={girl.avatar} size={120} isOnline={girl.isOnline} />
            <View className="flex-row items-center gap-2 mt-3">
              <Text variant="h2">{girl.name}</Text>
              <Text variant="body" className="text-muted-light dark:text-muted-dark">{girl.age}</Text>
              {girl.isVerified && <Badge variant="primary">✓ Verified</Badge>}
            </View>
            <Text variant="caption" className="text-muted-light dark:text-muted-dark">{girl.location}</Text>
            <View className="flex-row items-center gap-1 mt-2">
              <Text variant="h4" className="text-warning">★ {girl.rating}</Text>
              <Text variant="caption" className="text-muted-light dark:text-muted-dark">({girl.reviews} reviews)</Text>
            </View>
            <Badge variant={girl.isOnline ? "success" : "default"} size="md" className="mt-2">
              {girl.isOnline ? "● Online" : `Last active ${girl.lastActive}`}
            </Badge>
          </View>
        </View>

        <View className="px-5">
          <Card className="mb-4">
            <Text variant="h5" className="mb-2">About</Text>
            <Text variant="body" className="text-muted-light dark:text-muted-dark">{girl.bio}</Text>
          </Card>

          <Card className="mb-4">
            <Text variant="h5" className="mb-3">Services</Text>
            <View className="flex-row flex-wrap gap-2">
              {girl.services.map((service, i) => (
                <Badge key={i} variant="primary" size="md">{service}</Badge>
              ))}
            </View>
          </Card>

          <Card className="mb-4">
            <Text variant="h5" className="mb-3">Details</Text>
            <View className="gap-3">
              <View className="flex-row justify-between">
                <Text variant="caption" className="text-muted-light dark:text-muted-dark">Price</Text>
                <Text variant="captionBold" className="text-primary-500">${girl.price}/min</Text>
              </View>
              <Divider marginVertical={0} />
              <View className="flex-row justify-between">
                <Text variant="caption" className="text-muted-light dark:text-muted-dark">Response Time</Text>
                <Text variant="captionBold">{girl.responseTime}</Text>
              </View>
              <Divider marginVertical={0} />
              <View className="flex-row justify-between">
                <Text variant="caption" className="text-muted-light dark:text-muted-dark">Languages</Text>
                <Text variant="captionBold">{girl.languages.join(", ")}</Text>
              </View>
              <Divider marginVertical={0} />
              <View className="flex-row justify-between">
                <Text variant="caption" className="text-muted-light dark:text-muted-dark">Availability</Text>
                <Text variant="captionBold" className={girl.isOnline ? "text-success" : "text-muted-light dark:text-muted-dark"}>{girl.availability}</Text>
              </View>
            </View>
          </Card>

          <Card className="mb-6">
            <Text variant="h5" className="mb-3">Interests</Text>
            <View className="flex-row flex-wrap gap-2">
              {girl.interests.map((interest, i) => (
                <Badge key={i} variant="default" size="md">{interest}</Badge>
              ))}
            </View>
          </Card>

          <Button
            variant="primary"
            size="lg"
            fullWidth
            onPress={handleCall}
            className="mb-8"
          >
            📞 Call Now - ${girl.price}/min
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

