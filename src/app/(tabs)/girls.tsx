import React from "react";
import { View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { Text, Card, Avatar, Badge } from "../../components";
import { mockGirls } from "../../data";
import { Girl } from "../../types";

export default function GirlsScreen() {
  const router = useRouter();

  const renderItem = ({ item: girl }: { item: Girl }) => (
    <TouchableOpacity
      onPress={() => router.push(`/girl/${girl.id}`)}
      activeOpacity={0.7}
      className="px-5 mb-3"
    >
      <Card>
        <View className="flex-row">
          <Avatar uri={girl.avatar} size={72} isOnline={girl.isOnline} />
          <View className="flex-1 ml-3">
            <View className="flex-row items-center gap-2">
              <Text variant="h5">{girl.name}</Text>
              <Text variant="caption" className="text-muted-light dark:text-muted-dark">{girl.age}</Text>
              {girl.isVerified && (
                <Badge variant="primary" size="sm">✓ Verified</Badge>
              )}
            </View>
            <Text variant="small" className="text-muted-light dark:text-muted-dark">{girl.location}</Text>
            <View className="flex-row items-center gap-1 mt-1">
              <Text variant="small" className="text-warning">★</Text>
              <Text variant="captionBold" className="text-warning">{girl.rating}</Text>
              <Text variant="tiny" className="text-muted-light dark:text-muted-dark">({girl.reviews})</Text>
              <View className="flex-1" />
              <Text variant="captionBold" className="text-primary-500">
                ${girl.price}/min
              </Text>
            </View>
            <View className="flex-row flex-wrap gap-1 mt-2">
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
  );

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <View className="px-5 pt-4 pb-2">
        <Text variant="h2">Girls</Text>
        <Text variant="caption" className="text-muted-light dark:text-muted-dark">Find your perfect conversation partner</Text>
      </View>
      <View className="flex-1">
        <FlashList
          data={mockGirls}
          renderItem={renderItem}
          estimatedItemSize={140}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
}

