import React, { useState, useCallback } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Text, Card, Input, Avatar, Button } from "../components";
import { mockGirls } from "../data";
import { useToastStore } from "../store";

export default function BlockUserScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const showToast = useToastStore((s) => s.showToast);
  const [blockedUsers, setBlockedUsers] = useState<string[]>([]);

  const results = query
    ? mockGirls.filter((g) => g.name.toLowerCase().includes(query.toLowerCase()) && !blockedUsers.includes(g.id))
    : [];

  const handleBlock = useCallback((id: string, name: string) => {
    setBlockedUsers((prev) => [...prev, id]);
    showToast(`${name} has been blocked`, "success");
  }, [showToast]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={{ fontSize: 24, color: "#fff" }}>‹</Text>
          </TouchableOpacity>
          <Text variant="h2">Block User</Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 20, marginBottom: 12 }}>
        <Text variant="body" color="#A3A3A3" style={{ marginBottom: 12 }}>
          Search for a user to block them.
        </Text>
        <Input
          placeholder="Search by name..."
          value={query}
          onChangeText={setQuery}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, paddingHorizontal: 20 }}>
        {query && results.length === 0 ? (
          <Text variant="body" color="#A3A3A3" style={{ textAlign: "center", paddingTop: 40 }}>
            No users found
          </Text>
        ) : (
          results.map((girl) => (
            <Card key={girl.id} style={{ marginBottom: 8, flexDirection: "row", alignItems: "center" }}>
              <Avatar uri={girl.avatar} size={44} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text variant="captionBold">{girl.name}</Text>
                <Text variant="tiny" color="#A3A3A3">{girl.location}</Text>
              </View>
              <Button variant="outline" size="sm" onPress={() => handleBlock(girl.id, girl.name)}>
                Block
              </Button>
            </Card>
          ))
        )}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
