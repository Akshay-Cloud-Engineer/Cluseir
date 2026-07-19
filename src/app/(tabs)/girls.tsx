import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Text, Card, Avatar, Badge } from "../../components";
import { mockGirls } from "../../data";

export default function GirlsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 }}>
        <Text variant="h2">Girls</Text>
        <Text variant="caption" color="#A3A3A3">Find your perfect conversation partner</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, paddingHorizontal: 20 }}>
        {mockGirls.map((girl) => (
          <TouchableOpacity
            key={girl.id}
            onPress={() => router.push(`/girl/${girl.id}`)}
            activeOpacity={0.7}
          >
            <Card style={{ marginBottom: 12 }}>
              <View style={{ flexDirection: "row" }}>
                <Avatar uri={girl.avatar} size={72} isOnline={girl.isOnline} />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                    <Text variant="h5">{girl.name}</Text>
                    <Text variant="caption" color="#A3A3A3">{girl.age}</Text>
                    {girl.isVerified && (
                      <Badge variant="primary" size="sm">✓ Verified</Badge>
                    )}
                  </View>
                  <Text variant="small" color="#A3A3A3">{girl.location}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 }}>
                    <Text variant="small" color="#f59e0b">★</Text>
                    <Text variant="captionBold" color="#f59e0b">{girl.rating}</Text>
                    <Text variant="tiny" color="#A3A3A3">({girl.reviews})</Text>
                    <View style={{ flex: 1 }} />
                    <Text variant="captionBold" color="#ec4899">
                      ${girl.price}/min
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4, marginTop: 8 }}>
                    {girl.services.slice(0, 2).map((s, i) => (
                      <Badge key={i} size="sm">{s}</Badge>
                    ))}
                    {girl.services.length > 2 && (
                      <Badge size="sm">+{girl.services.length - 2}</Badge>
                    )}
                  </View>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
