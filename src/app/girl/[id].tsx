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
      <SafeAreaView style={{ flex: 1, backgroundColor: "#000", alignItems: "center", justifyContent: "center" }}>
        <Text variant="h4">Girl not found</Text>
        <Button variant="primary" style={{ marginTop: 16 }} onPress={() => router.back()}>
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={{ position: "relative" }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              position: "absolute",
              top: 12,
              left: 16,
              zIndex: 10,
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "rgba(0,0,0,0.5)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 20, color: "#fff" }}>‹</Text>
          </TouchableOpacity>
          <View style={{ alignItems: "center", paddingTop: 20, paddingBottom: 16 }}>
            <Avatar uri={girl.avatar} size={120} isOnline={girl.isOnline} />
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 12 }}>
              <Text variant="h2">{girl.name}</Text>
              <Text variant="body" color="#A3A3A3">{girl.age}</Text>
              {girl.isVerified && <Badge variant="primary">✓ Verified</Badge>}
            </View>
            <Text variant="caption" color="#A3A3A3">{girl.location}</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 8 }}>
              <Text variant="h4" color="#f59e0b">★ {girl.rating}</Text>
              <Text variant="caption" color="#A3A3A3">({girl.reviews} reviews)</Text>
            </View>
            <Badge variant={girl.isOnline ? "success" : "default"} size="md" style={{ marginTop: 8 }}>
              {girl.isOnline ? "● Online" : `Last active ${girl.lastActive}`}
            </Badge>
          </View>
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          <Card style={{ marginBottom: 16 }}>
            <Text variant="h5" style={{ marginBottom: 8 }}>About</Text>
            <Text variant="body" color="#A3A3A3">{girl.bio}</Text>
          </Card>

          <Card style={{ marginBottom: 16 }}>
            <Text variant="h5" style={{ marginBottom: 12 }}>Services</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {girl.services.map((service, i) => (
                <Badge key={i} variant="primary" size="md">{service}</Badge>
              ))}
            </View>
          </Card>

          <Card style={{ marginBottom: 16 }}>
            <Text variant="h5" style={{ marginBottom: 12 }}>Details</Text>
            <View style={{ gap: 12 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text variant="caption" color="#A3A3A3">Price</Text>
                <Text variant="captionBold" color="#ec4899">${girl.price}/min</Text>
              </View>
              <Divider marginVertical={0} />
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text variant="caption" color="#A3A3A3">Response Time</Text>
                <Text variant="captionBold">{girl.responseTime}</Text>
              </View>
              <Divider marginVertical={0} />
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text variant="caption" color="#A3A3A3">Languages</Text>
                <Text variant="captionBold">{girl.languages.join(", ")}</Text>
              </View>
              <Divider marginVertical={0} />
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text variant="caption" color="#A3A3A3">Availability</Text>
                <Text variant="captionBold" color={girl.isOnline ? "#22c55e" : "#A3A3A3"}>{girl.availability}</Text>
              </View>
            </View>
          </Card>

          <Card style={{ marginBottom: 24 }}>
            <Text variant="h5" style={{ marginBottom: 12 }}>Interests</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
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
            style={{ marginBottom: 32 }}
          >
            📞 Call Now - ${girl.price}/min
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
