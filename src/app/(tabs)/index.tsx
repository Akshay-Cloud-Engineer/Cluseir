import React from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Text, Card, Avatar, Badge, Button } from "../../components";
import { mockGirls, mockCategories, mockUser } from "../../data";
import { useCallStore } from "../../store";
import { useResponsive } from "../../hooks";

export default function HomeScreen() {
  const router = useRouter();
  const { wp } = useResponsive();
  const isActiveCall = useCallStore((s) => s.isActive);
  const activeGirlId = useCallStore((s) => s.activeGirlId);
  const onlineGirls = mockGirls.filter((g) => g.isOnline);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 20, paddingTop: 16 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <View>
              <Text variant="h2">Hello, {mockUser.name}!</Text>
              <Text variant="caption" color="#A3A3A3">Ready for a conversation?</Text>
            </View>
            <Avatar uri={mockUser.avatar} size={52} />
          </View>

          {isActiveCall && (
            <Card style={{ marginBottom: 16, backgroundColor: "#0d948820", borderWidth: 1, borderColor: "#0d9488" }}>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                  <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "#22c55e" }} />
                  <View>
                    <Text variant="captionBold" color="#22c55e">Active Call</Text>
                    <Text variant="small" color="#A3A3A3">Tap to return to your call</Text>
                  </View>
                </View>
                <Button variant="primary" size="sm" onPress={() => router.push(`/call/${activeGirlId}`)}>
                  Return
                </Button>
              </View>
            </Card>
          )}

          <View style={{ marginBottom: 24 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <Text variant="h4">Credits</Text>
              <Text variant="h4" color="#ec4899">${mockUser.credits.toFixed(2)}</Text>
            </View>
          </View>

          <Text variant="h4" style={{ marginBottom: 12 }}>Categories</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
            {mockCategories.slice(0, 6).map((cat) => (
              <Badge key={cat.id} variant="primary" size="md">
                {cat.name} ({cat.count})
              </Badge>
            ))}
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <Text variant="h4">Online Now</Text>
            <Button variant="ghost" size="sm" onPress={() => router.push("/(tabs)/girls")}>
              See All
            </Button>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 24 }}>
            {onlineGirls.slice(0, 6).map((girl) => (
              <Card key={girl.id} style={{ marginRight: 12, width: wp(40) }}>
                <View style={{ alignItems: "center", padding: 12 }}>
                  <Avatar uri={girl.avatar} size={64} isOnline />
                  <Text variant="captionBold" style={{ marginTop: 8 }}>{girl.name}</Text>
                  <Text variant="tiny" color="#A3A3A3">{girl.age} yrs</Text>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 }}>
                    <Text variant="tiny" color="#f59e0b">★</Text>
                    <Text variant="tiny" color="#A3A3A3">{girl.rating}</Text>
                  </View>
                  <Button
                    variant="primary"
                    size="sm"
                    style={{ marginTop: 8, paddingHorizontal: 16 }}
                    onPress={() => router.push(`/girl/${girl.id}`)}
                  >
                    Call
                  </Button>
                </View>
              </Card>
            ))}
          </ScrollView>

          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <Text variant="h4">Recent Activity</Text>
            <Button variant="ghost" size="sm" onPress={() => router.push("/call-history")}>
              History
            </Button>
          </View>
          <Card>
            <View style={{ padding: 4 }}>
              <Text variant="caption" color="#A3A3A3" style={{ textAlign: "center", paddingVertical: 20 }}>
                No recent activity
              </Text>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
