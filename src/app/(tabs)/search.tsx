import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Text, Card, Avatar, Button } from "../../components";
import { mockGirls } from "../../data";

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 }}>
        <Text variant="h2">Search</Text>
        <Text variant="caption" color="#A3A3A3">Find someone special</Text>
      </View>
      <View style={{ paddingHorizontal: 20, marginBottom: 12 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#1E1E1E",
            borderRadius: 12,
            paddingHorizontal: 16,
            gap: 8,
          }}
        >
          <Text style={{ fontSize: 18 }}>🔍</Text>
          <TextInput
            placeholder="Search by name, location, or service..."
            placeholderTextColor="#555"
            value={query}
            onChangeText={setQuery}
            style={{
              flex: 1,
              paddingVertical: 14,
              fontSize: 16,
              color: "#FFFFFF",
            }}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery("")}>
              <Text style={{ color: "#A3A3A3", fontSize: 18 }}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
        <Button
          variant="outline"
          size="sm"
          style={{ marginTop: 8 }}
          onPress={() => router.push("/filters")}
        >
          Filters
        </Button>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, paddingHorizontal: 20 }}>
        {query === "" ? (
          <View style={{ flex: 1, alignItems: "center", paddingTop: 60 }}>
            <Text style={{ fontSize: 60, marginBottom: 16 }}>🔍</Text>
            <Text variant="h4" style={{ textAlign: "center" }}>
              Search for girls
            </Text>
            <Text variant="body" color="#A3A3A3" style={{ textAlign: "center", marginTop: 8 }}>
              Find by name, location, or services
            </Text>
          </View>
        ) : results.length === 0 ? (
          <View style={{ flex: 1, alignItems: "center", paddingTop: 60 }}>
            <Text style={{ fontSize: 60, marginBottom: 16 }}>😕</Text>
            <Text variant="h4" style={{ textAlign: "center" }}>
              No results found
            </Text>
            <Text variant="body" color="#A3A3A3" style={{ textAlign: "center", marginTop: 8 }}>
              Try a different search term
            </Text>
          </View>
        ) : (
          results.map((girl) => (
            <TouchableOpacity
              key={girl.id}
              onPress={() => router.push(`/girl/${girl.id}`)}
              activeOpacity={0.7}
            >
              <Card style={{ marginBottom: 12 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Avatar uri={girl.avatar} size={60} isOnline={girl.isOnline} />
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                      <Text variant="h5">{girl.name}</Text>
                      <Text variant="caption" color="#A3A3A3">{girl.age}</Text>
                    </View>
                    <Text variant="small" color="#A3A3A3">{girl.location}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 }}>
                      <Text variant="small" color="#f59e0b">★</Text>
                      <Text variant="small" color="#f59e0b">{girl.rating}</Text>
                      <Text variant="tiny" color="#A3A3A3">({girl.reviews})</Text>
                    </View>
                  </View>
                  <Text variant="captionBold" color="#ec4899">${girl.price}/min</Text>
                </View>
              </Card>
            </TouchableOpacity>
          ))
        )}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
