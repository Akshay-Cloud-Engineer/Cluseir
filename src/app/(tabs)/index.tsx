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
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="px-5 pt-4">
          <View className="flex-row justify-between items-center mb-6">
            <View>
              <Text variant="h2">Hello, {mockUser.name}!</Text>
              <Text variant="caption" className="text-muted-light dark:text-muted-dark">Ready for a conversation?</Text>
            </View>
            <Avatar uri={mockUser.avatar} size={52} />
          </View>

          {isActiveCall && (
            <Card className="mb-4 bg-teal-500/10 border border-teal-600">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <View className="w-2.5 h-2.5 rounded-full bg-success" />
                  <View>
                    <Text variant="captionBold" className="text-success">Active Call</Text>
                    <Text variant="small" className="text-muted-light dark:text-muted-dark">Tap to return to your call</Text>
                  </View>
                </View>
                <Button variant="primary" size="sm" onPress={() => router.push(`/call/${activeGirlId}`)}>
                  Return
                </Button>
              </View>
            </Card>
          )}

          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-3">
              <Text variant="h4">Credits</Text>
              <Text variant="h4" className="text-primary-500">${mockUser.credits.toFixed(2)}</Text>
            </View>
          </View>

          <Text variant="h4" className="mb-3">Categories</Text>
          <View className="flex-row flex-wrap gap-2 mb-6">
            {mockCategories.slice(0, 6).map((cat) => (
              <Badge key={cat.id} variant="primary" size="md">
                {cat.name} ({cat.count})
              </Badge>
            ))}
          </View>

          <View className="flex-row justify-between items-center mb-3">
            <Text variant="h4">Online Now</Text>
            <Button variant="ghost" size="sm" onPress={() => router.push("/(tabs)/girls")}>
              See All
            </Button>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            {onlineGirls.slice(0, 6).map((girl) => (
              <Card key={girl.id} className="mr-3" style={{ width: wp(40) }}>
                <View className="items-center p-3">
                  <Avatar uri={girl.avatar} size={64} isOnline />
                  <Text variant="captionBold" className="mt-2 text-center">{girl.name}</Text>
                  <Text variant="tiny" className="text-muted-light dark:text-muted-dark">{girl.age} yrs</Text>
                  <View className="flex-row items-center gap-1 mt-1">
                    <Text variant="tiny" className="text-warning">★</Text>
                    <Text variant="tiny" className="text-muted-light dark:text-muted-dark">{girl.rating}</Text>
                  </View>
                  <Button
                    variant="primary"
                    size="sm"
                    className="mt-2 px-4"
                    onPress={() => router.push(`/girl/${girl.id}`)}
                  >
                    Call
                  </Button>
                </View>
              </Card>
            ))}
          </ScrollView>

          <View className="flex-row justify-between items-center mb-3">
            <Text variant="h4">Recent Activity</Text>
            <Button variant="ghost" size="sm" onPress={() => router.push("/call-history")}>
              History
            </Button>
          </View>
          <Card>
            <View className="p-1">
              <Text variant="caption" className="text-center py-5 text-muted-light dark:text-muted-dark">
                No recent activity
              </Text>
            </View>
          </Card>
          <View className="h-10" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
