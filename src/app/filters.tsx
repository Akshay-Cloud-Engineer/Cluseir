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
          maxPrice,
          onlineOnly,
          verifiedOnly,
          services: selectedServices,
        },
      });
    }
    router.back();
  }, [minAge, maxAge, maxPrice, onlineOnly, verifiedOnly, selectedServices, router]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={{ fontSize: 24, color: "#fff" }}>‹</Text>
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
            <Text variant="captionBold" color="#ec4899">Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, paddingHorizontal: 20 }}>
        <Card style={{ marginBottom: 16 }}>
          <Text variant="h5" style={{ marginBottom: 12 }}>Age Range</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View style={{ flex: 1, backgroundColor: "#121212", borderRadius: 12, padding: 12, alignItems: "center" }}>
              <Text variant="h3" color="#ec4899">{minAge}</Text>
              <Text variant="tiny" color="#A3A3A3">Min</Text>
            </View>
            <Text variant="h4" color="#A3A3A3">-</Text>
            <View style={{ flex: 1, backgroundColor: "#121212", borderRadius: 12, padding: 12, alignItems: "center" }}>
              <Text variant="h3" color="#ec4899">{maxAge}</Text>
              <Text variant="tiny" color="#A3A3A3">Max</Text>
            </View>
          </View>
        </Card>

        <Card style={{ marginBottom: 16 }}>
          <Text variant="h5" style={{ marginBottom: 12 }}>Max Price (per min)</Text>
          <View style={{ backgroundColor: "#121212", borderRadius: 12, padding: 12, alignItems: "center" }}>
            <Text variant="h3" color="#ec4899">${maxPrice}</Text>
          </View>
        </Card>

        <Card style={{ marginBottom: 16 }}>
          <Text variant="h5" style={{ marginBottom: 12 }}>Services</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
            {services.map((service) => (
              <TouchableOpacity key={service} onPress={() => toggleService(service)}>
                <Badge variant={selectedServices.includes(service) ? "primary" : "default"} size="md">
                  {service}
                </Badge>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <Card style={{ marginBottom: 16 }}>
          <Text variant="h5" style={{ marginBottom: 12 }}>Status</Text>
          <View style={{ gap: 12 }}>
            <TouchableOpacity
              onPress={() => setOnlineOnly(!onlineOnly)}
              style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
            >
              <Text variant="captionBold">Online Only</Text>
              <View style={{
                width: 44, height: 24, borderRadius: 12, backgroundColor: onlineOnly ? "#ec4899" : "#333", padding: 2,
              }}>
                <View style={{
                  width: 20, height: 20, borderRadius: 10, backgroundColor: "#fff",
                  alignSelf: onlineOnly ? "flex-end" : "flex-start",
                }} />
              </View>
            </TouchableOpacity>
            <Divider marginVertical={4} />
            <TouchableOpacity
              onPress={() => setVerifiedOnly(!verifiedOnly)}
              style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
            >
              <Text variant="captionBold">Verified Only</Text>
              <View style={{
                width: 44, height: 24, borderRadius: 12, backgroundColor: verifiedOnly ? "#ec4899" : "#333", padding: 2,
              }}>
                <View style={{
                  width: 20, height: 20, borderRadius: 10, backgroundColor: "#fff",
                  alignSelf: verifiedOnly ? "flex-end" : "flex-start",
                }} />
              </View>
            </TouchableOpacity>
          </View>
        </Card>

        <Button
          variant="primary"
          size="lg"
          fullWidth
          onPress={applyFilters}
          style={{ marginBottom: 32 }}
        >
          Apply Filters
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
