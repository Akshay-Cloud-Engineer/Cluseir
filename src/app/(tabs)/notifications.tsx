import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Card, Avatar, Badge } from "../../components";
import { Notification } from "../../types";

const initialNotifications: Notification[] = [
  { id: "n1", type: "call_request", title: "Call Request", message: "Sophia wants to talk to you", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400", read: false, createdAt: "2 min ago" },
  { id: "n2", type: "call_end", title: "Call Ended", message: "Your call with Emma ended", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400", read: false, createdAt: "1 hour ago" },
  { id: "n3", type: "message", title: "New Message", message: "Olivia sent you a message", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400", read: true, createdAt: "3 hours ago" },
  { id: "n4", type: "system", title: "Welcome!", message: "Welcome to Cluseir! Start exploring.", read: false, createdAt: "1 day ago" },
];

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const unread = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "call_request": return "📞";
      case "call_end": return "✅";
      case "message": return "💬";
      case "system": return "🔔";
      default: return "📌";
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Text variant="h2">Notifications</Text>
          {unread > 0 && (
            <Badge variant="error" size="md">{unread} new</Badge>
          )}
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, paddingHorizontal: 20 }}>
        {notifications.length === 0 ? (
          <View style={{ flex: 1, alignItems: "center", paddingTop: 60 }}>
            <Text style={{ fontSize: 60, marginBottom: 16 }}>🔔</Text>
            <Text variant="h4" style={{ textAlign: "center" }}>No notifications</Text>
            <Text variant="body" color="#A3A3A3" style={{ textAlign: "center", marginTop: 8 }}>
              You&apos;re all caught up!
            </Text>
          </View>
        ) : (
          notifications.map((notification) => (
            <TouchableOpacity key={notification.id} activeOpacity={0.7} onPress={() => markAsRead(notification.id)}>
              <Card
                style={{
                  marginBottom: 8,
                  opacity: notification.read ? 0.6 : 1,
                  borderLeftWidth: notification.read ? 0 : 3,
                  borderLeftColor: "#ec4899",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {notification.avatar ? (
                    <Avatar uri={notification.avatar} size={48} />
                  ) : (
                    <View
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 24,
                        backgroundColor: "#333",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ fontSize: 22 }}>{getIcon(notification.type)}</Text>
                    </View>
                  )}
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text variant="captionBold">{notification.title}</Text>
                    <Text variant="small" color="#A3A3A3" style={{ marginTop: 2 }}>
                      {notification.message}
                    </Text>
                    <Text variant="tiny" color="#555" style={{ marginTop: 4 }}>
                      {notification.createdAt}
                    </Text>
                  </View>
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
