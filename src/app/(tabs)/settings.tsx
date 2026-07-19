import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Text, Card, Avatar, Button, Divider } from "../../components";
import { mockUser } from "../../data";
import { useThemeStore, useAuthStore } from "../../store";

export default function SettingsScreen() {
  const router = useRouter();
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const mode = useThemeStore((s) => s.mode);

  const menuItems: { label: string; icon: string; route: `/${string}` }[] = [
    { label: "Edit Profile", icon: "✏️", route: "/edit-profile" },
    { label: "Call History", icon: "📋", route: "/call-history" },
    { label: "Incoming Requests", icon: "📲", route: "/incoming-request" },
    { label: "Outgoing Requests", icon: "📤", route: "/outgoing-request" },
    { label: "Report User", icon: "🚨", route: "/report-user" },
    { label: "Block User", icon: "🚫", route: "/block-user" },
    { label: "Help", icon: "❓", route: "/help" },
    { label: "About", icon: "ℹ️", route: "/about" },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 }}>
        <Text variant="h2">Settings</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, paddingHorizontal: 20 }}>
        <Card style={{ marginBottom: 16, flexDirection: "row", alignItems: "center" }}>
          <Avatar uri={mockUser.avatar} size={64} />
          <View style={{ marginLeft: 16, flex: 1 }}>
            <Text variant="h5">{mockUser.name}</Text>
            <Text variant="caption" color="#A3A3A3">{mockUser.email}</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 }}>
              <Text variant="captionBold" color="#ec4899">${mockUser.credits}</Text>
              <Text variant="small" color="#A3A3A3">credits</Text>
            </View>
          </View>
        </Card>

        <Card style={{ marginBottom: 16 }}>
          <TouchableOpacity onPress={toggleTheme} activeOpacity={0.7}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 8 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <Text style={{ fontSize: 22 }}>{mode === "dark" ? "🌙" : "☀️"}</Text>
                <View>
                  <Text variant="captionBold">Dark Mode</Text>
                  <Text variant="tiny" color="#A3A3A3">{mode === "dark" ? "Enabled" : "Disabled"}</Text>
                </View>
              </View>
              <View
                style={{
                  width: 44,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor: mode === "dark" ? "#ec4899" : "#333",
                  padding: 2,
                }}
              >
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: "#fff",
                    alignSelf: mode === "dark" ? "flex-end" : "flex-start",
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
        </Card>

        <Card style={{ marginBottom: 16 }}>
          {menuItems.map((item, index) => (
            <React.Fragment key={item.label}>
              <TouchableOpacity
                onPress={() => router.push(item.route)}
                activeOpacity={0.7}
                style={{ flexDirection: "row", alignItems: "center", paddingVertical: 14 }}
              >
                <Text style={{ fontSize: 20, marginRight: 12 }}>{item.icon}</Text>
                <Text variant="captionBold" style={{ flex: 1 }}>{item.label}</Text>
                <Text color="#555">›</Text>
              </TouchableOpacity>
              {index < menuItems.length - 1 && <Divider marginVertical={0} />}
            </React.Fragment>
          ))}
        </Card>

        <Button variant="outline" style={{ marginTop: 8, marginBottom: 32 }} onPress={() => {
          useAuthStore.getState().logout();
          router.replace("/(auth)/onboarding");
        }}>
          Sign Out
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
