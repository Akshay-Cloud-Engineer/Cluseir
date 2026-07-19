import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { Text, Card, Avatar, Badge, EmptyState } from "../components";
import { useCallStore } from "../store";
import { CallRecord } from "../types";

export default function CallHistoryScreen() {
  const router = useRouter();
  const callHistory = useCallStore((s) => s.callHistory);
  const [filter, setFilter] = useState<"all" | "completed" | "missed" | "cancelled">("all");

  const filtered =
    filter === "all" ? callHistory : callHistory.filter((c) => c.status === filter);

  const renderItem = ({ item: call }: { item: CallRecord }) => (
    <View className="px-5 mb-2">
      <Card>
        <View className="flex-row items-center">
          <Avatar uri={call.girlAvatar} name={call.girlName} size={48} />
          <View className="flex-1 ml-3">
            <Text variant="captionBold">{call.girlName}</Text>
            <Text variant="tiny" className="text-muted-light dark:text-muted-dark">{call.timestamp}</Text>
          </View>
          <View className="items-end">
            <Badge
              variant={call.status === "completed" ? "success" : call.status === "missed" ? "warning" : "default"}
              size="sm"
            >
              {call.status}
            </Badge>
            {call.status === "completed" && (
              <Text variant="small" className="text-muted-light dark:text-muted-dark mt-1">
                {Math.floor(call.duration)} min | ${call.cost.toFixed(2)}
              </Text>
            )}
          </View>
        </View>
      </Card>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <View className="px-5 pt-4 pb-2">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity onPress={() => router.back()} className="p-1">
            <Text className="text-[24px] text-text-light dark:text-text-dark">‹</Text>
          </TouchableOpacity>
          <Text variant="h2">Call History</Text>
        </View>
      </View>
      <View className="px-5 flex-row gap-2 mb-3">
        {["all", "completed", "missed", "cancelled"].map((f) => (
          <TouchableOpacity key={f} onPress={() => setFilter(f as "all" | "completed" | "missed" | "cancelled")}>
            <Badge
              variant={filter === f ? "primary" : "default"}
              size="md"
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Badge>
          </TouchableOpacity>
        ))}
      </View>
      <View className="flex-1">
        {filtered.length === 0 ? (
          <EmptyState
            icon="📋"
            title="No call history"
            message="Start a call to see it here"
          />
        ) : (
          <FlashList
            data={filtered}
            renderItem={renderItem}
            estimatedItemSize={80}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

