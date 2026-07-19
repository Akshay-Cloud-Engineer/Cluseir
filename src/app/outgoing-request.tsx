import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Text, Card, Avatar, Badge } from "../components";
import { useCallStore } from "../store";

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={{ fontSize: 24, color: "#fff" }}>‹</Text>
          </TouchableOpacity>
          <Text variant="h2">Outgoing Requests</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, paddingHorizontal: 20 }}>
        {outgoing.length === 0 ? (
          <View style={{ flex: 1, alignItems: "center", paddingTop: 60 }}>
            <Text style={{ fontSize: 60, marginBottom: 16 }}>📤</Text>
            <Text variant="h4">No outgoing requests</Text>
            <Text variant="body" color="#A3A3A3" style={{ marginTop: 8 }}>
              Requests you send will appear here
            </Text>
          </View>
        ) : (
          outgoing.map((req) => (
            <Card key={req.id} style={{ marginBottom: 12 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Avatar uri={req.girlAvatar} name={req.girlName} size={48} />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text variant="captionBold">{req.girlName || "Unknown"}</Text>
                  <Text variant="small" color="#A3A3A3">{req.timestamp}</Text>
                </View>
                {getStatusBadge(req.status)}
              </View>
            </Card>
          ))
        )}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
