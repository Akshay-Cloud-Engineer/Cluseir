import React, { useState } from "react";
import { View, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { Text, Card, Avatar, Button, EmptyState } from "../../components";
import { mockGirls } from "../../data";
import { Girl } from "../../types";

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const results = query
    ? mockGirls.filter(
        (g) =>
          g.name.toLowerCase().includes(query.toLowerCase()) ||
          g.location.toLowerCase().includes(query.toLowerCase()) ||
          g.services.some((s) => s.toLowerCase().includes(query.toLowerCase())),
      )
    : [];

  const renderItem = ({ item: girl }: { item: Girl }) => (
    <TouchableOpacity
      onPress={() => router.push(`/girl/${girl.id}`)}
      activeOpacity={0.7}
      className="px-5 mb-3"
    >
      <Card>
        <View className="flex-row items-center">
          <Avatar uri={girl.avatar} size={60} isOnline={girl.isOnline} />
          <View className="flex-1 ml-3">
            <View className="flex-row items-center gap-2">
              <Text variant="h5">{girl.name}</Text>
              <Text variant="caption" className="text-muted-light dark:text-muted-dark">{girl.age}</Text>
            </View>
            <Text variant="small" className="text-muted-light dark:text-muted-dark">{girl.location}</Text>
            <View className="flex-row items-center gap-1 mt-1">
              <Text variant="small" className="text-warning">★</Text>
              <Text variant="small" className="text-warning">{girl.rating}</Text>
              <Text variant="tiny" className="text-muted-light dark:text-muted-dark">({girl.reviews})</Text>
            </View>
          </View>
          <Text variant="captionBold" className="text-primary-500">${girl.price}/min</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <View className="px-5 pt-4 pb-2">
        <Text variant="h2">Search</Text>
        <Text variant="caption" className="text-muted-light dark:text-muted-dark">Find someone special</Text>
      </View>
      <View className="px-5 mb-3">
        <View className="flex-row items-center bg-surface-light dark:bg-surface-dark rounded-xl px-4 gap-2 border border-border-light dark:border-border-dark">
          <Text className="text-[18px]">🔍</Text>
          <TextInput
            placeholder="Search by name, location, or service..."
            placeholderTextColor="#737373"
            value={query}
            onChangeText={setQuery}
            className="flex-1 py-3 text-base text-text-light dark:text-text-dark"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery("")}>
              <Text className="text-muted-light dark:text-muted-dark text-[18px]">✕</Text>
            </TouchableOpacity>
          )}
        </View>
        <Button
          variant="outline"
          size="sm"
          className="mt-2"
          onPress={() => router.push("/filters")}
        >
          Filters
        </Button>
      </View>
      <View className="flex-1">
        {query === "" ? (
          <EmptyState 
            icon="🔍" 
            title="Search for girls" 
            message="Find by name, location, or services" 
          />
        ) : results.length === 0 ? (
          <EmptyState 
            icon="😕" 
            title="No results found" 
            message="Try a different search term" 
          />
        ) : (
          <FlashList
            data={results}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
