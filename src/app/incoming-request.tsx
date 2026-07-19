import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Text, Card, Avatar, Button } from "../components";
import { useCallStore } from "../store";

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={{ fontSize: 24, color: "#fff" }}>‹</Text>
          </TouchableOpacity>
          <Text variant="h2">Incoming Requests</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, paddingHorizontal: 20 }}>
        {incoming.length === 0 ? (
          <View style={{ flex: 1, alignItems: "center", paddingTop: 60 }}>
            <Text style={{ fontSize: 60, marginBottom: 16 }}>📲</Text>
            <Text variant="h4">No incoming requests</Text>
            <Text variant="body" color="#A3A3A3" style={{ marginTop: 8 }}>
              When someone wants to call you, it will appear here
            </Text>
          </View>
        ) : (
          incoming.map((req) => (
            <Card key={req.id} style={{ marginBottom: 12 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Avatar uri={req.girlAvatar} name={req.girlName} size={56} />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text variant="h5">{req.girlName}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                    <Text variant="small" color="#f59e0b">★ {req.girlRating}</Text>
                    <Text variant="tiny" color="#A3A3A3">{req.timestamp}</Text>
                  </View>
                </View>
              </View>
              <View style={{ flexDirection: "row", gap: 12, marginTop: 12 }}>
                <View style={{ flex: 1 }}>
                  <Button
                    variant="primary"
                    fullWidth
                    onPress={() => handleAccept(req.id, req.girlId, req.girlName)}
                  >
                    Accept
                  </Button>
                </View>
                <View style={{ flex: 1 }}>
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
          ))
        )}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
