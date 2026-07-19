import React from "react";
import { View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Text, Card, Divider } from "../components";

export default function AboutScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={{ fontSize: 24, color: "#fff" }}>‹</Text>
          </TouchableOpacity>
          <Text variant="h2">About</Text>
        </View>
      </View>
      <View style={{ flex: 1, paddingHorizontal: 20, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 80, marginBottom: 16 }}>💬</Text>
        <Text variant="h1">Cluseir</Text>
        <Text variant="caption" color="#A3A3A3" style={{ marginTop: 4 }}>Version 1.0.0</Text>

        <Card style={{ marginTop: 32, width: "100%" }}>
          <Text variant="body" color="#A3A3A3" style={{ textAlign: "center", lineHeight: 24 }}>
            Cluseir connects you with amazing people from around the world through meaningful voice conversations.
          </Text>
        </Card>

        <Card style={{ marginTop: 16, width: "100%" }}>
          <View style={{ paddingVertical: 8 }}>
            {[
              { label: "Terms of Service", value: "" },
              { label: "Privacy Policy", value: "" },
              { label: "Community Guidelines", value: "" },
              { label: "Licenses", value: "" },
            ].map((item, index) => (
              <React.Fragment key={item.label}>
                <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 12 }} onPress={() => router.push(`/help`)}>
                  <Text variant="captionBold">{item.label}</Text>
                  <Text color="#555">›</Text>
                </TouchableOpacity>
                {index < 3 && <Divider marginVertical={0} />}
              </React.Fragment>
            ))}
          </View>
        </Card>

        <Text variant="small" color="#555" style={{ marginTop: 32 }}>
          © 2026 Cluseir. All rights reserved.
        </Text>
      </View>
    </SafeAreaView>
  );
}
