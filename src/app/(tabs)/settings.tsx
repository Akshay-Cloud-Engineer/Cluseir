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
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <View className="px-5 pt-4 pb-2">
        <Text variant="h2">Settings</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-5">
        <Card className="mb-4 flex-row items-center">
          <Avatar uri={mockUser.avatar} size={64} />
          <View className="ml-4 flex-1">
            <Text variant="h5">{mockUser.name}</Text>
            <Text variant="caption" className="text-muted-light dark:text-muted-dark">{mockUser.email}</Text>
            <View className="flex-row items-center gap-1 mt-1">
              <Text variant="captionBold" className="text-primary-500">${mockUser.credits}</Text>
              <Text variant="small" className="text-muted-light dark:text-muted-dark">credits</Text>
            </View>
          </View>
        </Card>

        <Card className="mb-4 p-0">
          <TouchableOpacity onPress={toggleTheme} activeOpacity={0.7}>
            <View className="flex-row items-center justify-between py-3 px-4">
              <View className="flex-row items-center gap-3">
                <Text className="text-[22px]">{mode === "dark" ? "🌙" : "☀️"}</Text>
                <View>
                  <Text variant="captionBold">Dark Mode</Text>
                  <Text variant="tiny" className="text-muted-light dark:text-muted-dark">{mode === "dark" ? "Enabled" : "Disabled"}</Text>
                </View>
              </View>
              <View
                className={`w-11 h-6 rounded-full p-0.5 justify-center ${
                  mode === "dark" ? "bg-primary-500 items-end" : "bg-neutral-300 dark:bg-neutral-800 items-start"
                }`}
              >
                <View className="w-5 h-5 rounded-full bg-white" />
              </View>
            </View>
          </TouchableOpacity>
        </Card>

        <Card className="mb-4">
          {menuItems.map((item, index) => (
            <React.Fragment key={item.label}>
              <TouchableOpacity
                onPress={() => router.push(item.route)}
                activeOpacity={0.7}
                className="flex-row items-center py-3.5"
              >
                <Text className="text-[20px] mr-3">{item.icon}</Text>
                <Text variant="captionBold" className="flex-1">{item.label}</Text>
                <Text className="text-neutral-500">›</Text>
              </TouchableOpacity>
              {index < menuItems.length - 1 && <Divider marginVertical={0} />}
            </React.Fragment>
          ))}
        </Card>

        <Button variant="outline" className="mt-2 mb-8" onPress={() => {
          useAuthStore.getState().logout();
          router.replace("/(auth)/onboarding");
        }}>
          Sign Out
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
