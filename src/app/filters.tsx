import React, { useState, useCallback } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Text, Card, Button, Divider, Badge } from "../components";
import { FILTER_DEFAULTS } from "../constants";
import { useAuthStore } from "../store";

export default function FiltersScreen() {
  const router = useRouter();
  const [minAge, setMinAge] = useState(FILTER_DEFAULTS.minAge);
  const [maxAge, setMaxAge] = useState(FILTER_DEFAULTS.maxAge);
  const [maxPrice, setMaxPrice] = useState(FILTER_DEFAULTS.maxPrice);
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const services = ["Friendly Chat", "Advice", "Language Practice", "Virtual Date", "Life Coaching", "Career Guidance"];
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service],
    );
  };

  const applyFilters = useCallback(() => {
    const user = useAuthStore.getState().user;
    if (user) {
      useAuthStore.getState().setUser({
        ...user,
        preferences: {
          ...user.preferences,
          minAge,
          maxAge,
        },
      });
    }
    router.back();
  }, [minAge, maxAge, router]);

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <View className="px-5 pt-4 pb-2">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-[24px] text-text-light dark:text-text-dark">‹</Text>
            </TouchableOpacity>
            <Text variant="h2">Filters</Text>
          </View>
          <TouchableOpacity onPress={() => {
            setMinAge(FILTER_DEFAULTS.minAge);
            setMaxAge(FILTER_DEFAULTS.maxAge);
            setMaxPrice(FILTER_DEFAULTS.maxPrice);
            setOnlineOnly(false);
            setVerifiedOnly(false);
            setSelectedServices([]);
          }}>
            <Text variant="captionBold" className="text-primary-500">Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-5">
        <Card className="mb-4">
          <Text variant="h5" className="mb-3">Age Range</Text>
          <View className="flex-row items-center gap-3">
            <View className="flex-1 bg-surface-light dark:bg-[#121212] rounded-xl p-3 items-center">
              <Text variant="h3" className="text-primary-500">{minAge}</Text>
              <Text variant="tiny" className="text-muted-light dark:text-muted-dark">Min</Text>
            </View>
            <Text variant="h4" className="text-muted-light dark:text-muted-dark">-</Text>
            <View className="flex-1 bg-surface-light dark:bg-[#121212] rounded-xl p-3 items-center">
              <Text variant="h3" className="text-primary-500">{maxAge}</Text>
              <Text variant="tiny" className="text-muted-light dark:text-muted-dark">Max</Text>
            </View>
          </View>
        </Card>

        <Card className="mb-4">
          <Text variant="h5" className="mb-3">Max Price (per min)</Text>
          <View className="bg-surface-light dark:bg-[#121212] rounded-xl p-3 items-center">
            <Text variant="h3" className="text-primary-500">${maxPrice}</Text>
          </View>
        </Card>

        <Card className="mb-4">
          <Text variant="h5" className="mb-3">Services</Text>
          <View className="flex-row flex-wrap gap-2">
            {services.map((service) => (
              <TouchableOpacity key={service} onPress={() => toggleService(service)}>
                <Badge variant={selectedServices.includes(service) ? "primary" : "default"} size="md">
                  {service}
                </Badge>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <Card className="mb-4">
          <Text variant="h5" className="mb-3">Status</Text>
          <View className="gap-3">
            <TouchableOpacity
              onPress={() => setOnlineOnly(!onlineOnly)}
              className="flex-row items-center justify-between"
            >
              <Text variant="captionBold">Online Only</Text>
              <View className={`w-11 h-6 rounded-full p-0.5 justify-center ${
                onlineOnly ? "bg-primary-500 items-end" : "bg-neutral-300 dark:bg-neutral-800 items-start"
              }`}>
                <View className="w-5 h-5 rounded-full bg-white" />
              </View>
            </TouchableOpacity>
            <Divider marginVertical={4} />
            <TouchableOpacity
              onPress={() => setVerifiedOnly(!verifiedOnly)}
              className="flex-row items-center justify-between"
            >
              <Text variant="captionBold">Verified Only</Text>
              <View className={`w-11 h-6 rounded-full p-0.5 justify-center ${
                verifiedOnly ? "bg-primary-500 items-end" : "bg-neutral-300 dark:bg-neutral-800 items-start"
              }`}>
                <View className="w-5 h-5 rounded-full bg-white" />
              </View>
            </TouchableOpacity>
          </View>
        </Card>

        <Button
          variant="primary"
          size="lg"
          fullWidth
          onPress={applyFilters}
          className="mb-8"
        >
          Apply Filters
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
