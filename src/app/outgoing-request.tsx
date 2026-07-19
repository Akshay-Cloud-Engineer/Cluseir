import React from "react";
import { View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { Text, Card, Avatar, Badge, EmptyState } from "../components";
import { useCallStore } from "../store";
import { CallRequest } from "../types";

export default function OutgoingRequestScreen() {
  const router = useRouter();
  const requests = useCallStore((s) => s.callRequests);
  const outgoing = requests.filter((r) => r.type === "outgoing");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending": return <Badge variant="warning">Pending</Badge>;
      case "accepted": return <Badge variant="success">Accepted</Badge>;
      case "rejected": return <Badge variant="error">Rejected</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const renderItem = ({ item: req }: { item: CallRequest }) => (
    <View className="px-5 mb-3">
      <Card>
        <View className="flex-row items-center">
          <Avatar uri={req.girlAvatar} name={req.girlName} size={48} />
          <View className="flex-1 ml-3">
            <Text variant="captionBold">{req.girlName || "Unknown"}</Text>
            <Text variant="small" className="text-muted-light dark:text-muted-dark">{req.timestamp}</Text>
          </View>
          {getStatusBadge(req.status)}
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
          <Text variant="h2">Outgoing Requests</Text>
        </View>
      </View>
      <View className="flex-1 mt-2">
        {outgoing.length === 0 ? (
          <EmptyState
            icon="📤"
            title="No outgoing requests"
            message="Requests you send will appear here"
          />
        ) : (
          <FlashList
            data={outgoing}
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
