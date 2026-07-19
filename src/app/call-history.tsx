import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Text, Card, Avatar, Badge } from "../components";
import { useCallStore } from "../store";

export default function CallHistoryScreen() {
  const router = useRouter();
  const callHistory = useCallStore((s) => s.callHistory);
  const [filter, setFilter] = useState<"all" | "completed" | "missed" | "cancelled">("all");

  const filtered =
    filter === "all" ? callHistory : callHistory.filter((c) => c.status === filter);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={{ fontSize: 24, color: "#fff" }}>‹</Text>
          </TouchableOpacity>
          <Text variant="h2">Call History</Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 20, flexDirection: "row", gap: 8, marginBottom: 12 }}>
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
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, paddingHorizontal: 20 }}>
        {filtered.length === 0 ? (
          <View style={{ flex: 1, alignItems: "center", paddingTop: 60 }}>
            <Text style={{ fontSize: 60, marginBottom: 16 }}>📋</Text>
            <Text variant="h4">No call history</Text>
            <Text variant="body" color="#A3A3A3" style={{ marginTop: 8 }}>Start a call to see it here</Text>
          </View>
        ) : (
          filtered.map((call) => (
            <Card key={call.id} style={{ marginBottom: 8 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Avatar uri={call.girlAvatar} name={call.girlName} size={48} />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text variant="captionBold">{call.girlName}</Text>
                  <Text variant="tiny" color="#A3A3A3">{call.timestamp}</Text>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Badge
                    variant={call.status === "completed" ? "success" : call.status === "missed" ? "warning" : "default"}
                    size="sm"
                  >
                    {call.status}
                  </Badge>
                  {call.status === "completed" && (
                    <Text variant="small" color="#A3A3A3" style={{ marginTop: 4 }}>
                      {Math.floor(call.duration)} min | ${call.cost.toFixed(2)}
                    </Text>
                  )}
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
