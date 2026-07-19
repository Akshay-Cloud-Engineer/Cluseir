import React from "react";
import { View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { Text, Card, Avatar, Button, EmptyState } from "../components";
import { useCallStore } from "../store";
import { CallRequest } from "../types";

export default function IncomingRequestScreen() {
  const router = useRouter();
  const requests = useCallStore((s) => s.callRequests);
  const { acceptRequest, rejectRequest, startCall } = useCallStore();
  const incoming = requests.filter((r) => r.type === "incoming" && r.status === "pending");

  const handleAccept = (requestId: string, girlId: string, girlName: string) => {
    acceptRequest(requestId);
    startCall(girlId, girlName);
    router.push(`/call/${girlId}`);
  };

  const handleReject = (requestId: string) => {
    rejectRequest(requestId);
  };

  const renderItem = ({ item: req }: { item: CallRequest }) => (
    <View className="px-5 mb-3">
      <Card>
        <View className="flex-row items-center">
          <Avatar uri={req.girlAvatar} name={req.girlName} size={56} />
          <View className="flex-1 ml-3">
            <Text variant="h5">{req.girlName}</Text>
            <View className="flex-row items-center gap-1 mt-1">
              <Text variant="small" className="text-warning">★ {req.girlRating}</Text>
              <Text variant="tiny" className="text-muted-light dark:text-muted-dark ml-1">{req.timestamp}</Text>
            </View>
          </View>
        </View>
        <View className="flex-row gap-3 mt-3">
          <View className="flex-1">
            <Button
              variant="primary"
              fullWidth
              onPress={() => handleAccept(req.id, req.girlId, req.girlName)}
            >
              Accept
            </Button>
          </View>
          <View className="flex-1">
            <Button
              variant="outline"
              fullWidth
              onPress={() => handleReject(req.id)}
            >
              Decline
            </Button>
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
          <Text variant="h2">Incoming Requests</Text>
        </View>
      </View>
      <View className="flex-1 mt-2">
        {incoming.length === 0 ? (
          <EmptyState
            icon="📲"
            title="No incoming requests"
            message="When someone wants to call you, it will appear here"
          />
        ) : (
          <FlashList
            data={incoming}
            renderItem={renderItem}
            estimatedItemSize={120}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
