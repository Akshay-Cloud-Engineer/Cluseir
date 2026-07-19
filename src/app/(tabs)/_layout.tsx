import React from "react";
import { Tabs } from "expo-router";
import { Text } from "../../components/ui/Text";
import { useThemeStore, useCallStore } from "../../store";

function TabIconText({ label, focused }: { label: string; focused: boolean }) {
  return (
    <Text style={{ fontSize: focused ? 24 : 20, opacity: focused ? 1 : 0.5 }}>
      {label}
    </Text>
  );
}

export default function TabLayout() {
  const mode = useThemeStore((s) => s.mode);
  const isDark = mode === "dark";
  const isActiveCall = useCallStore((s) => s.isActive);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? "#121212" : "#FFFFFF",
          borderTopColor: isDark ? "#333" : "#E5E5E5",
          borderTopWidth: 0.5,
          height: 85,
          paddingBottom: 25,
          paddingTop: 10,
        },
        tabBarActiveTintColor: "#ec4899",
        tabBarInactiveTintColor: isDark ? "#737373" : "#A3A3A3",
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => <TabIconText label="🏠" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="girls"
        options={{
          title: "Girls",
          tabBarIcon: ({ focused }) => <TabIconText label="👩" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => <TabIconText label="🔍" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Alerts",
          tabBarIcon: ({ focused }) => <TabIconText label="🔔" focused={focused} />,
          tabBarBadge: isActiveCall ? 3 : undefined,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => <TabIconText label="⚙️" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
