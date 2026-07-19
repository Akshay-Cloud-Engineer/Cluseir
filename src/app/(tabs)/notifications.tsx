import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { Text, Card, Avatar, Badge, EmptyState } from "../../components";
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

  const renderItem = ({ item: notification }: { item: Notification }) => (
    <TouchableOpacity activeOpacity={0.7} onPress={() => markAsRead(notification.id)} className="px-5 mb-2">
      <Card
        className={`${notification.read ? "opacity-60" : "border-l-4 border-l-primary-500"}`}
      >
        <View className="flex-row items-center">
          {notification.avatar ? (
            <Avatar uri={notification.avatar} size={48} />
          ) : (
            <View className="w-12 h-12 rounded-full bg-surface-light dark:bg-surface-dark items-center justify-center">
              <Text className="text-[22px]">{getIcon(notification.type)}</Text>
            </View>
          )}
          <View className="flex-1 ml-3">
            <Text variant="captionBold">{notification.title}</Text>
            <Text variant="small" className="mt-0.5 text-muted-light dark:text-muted-dark">
              {notification.message}
            </Text>
            <Text variant="tiny" className="mt-1 text-neutral-500">
              {notification.createdAt}
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <View className="px-5 pt-4 pb-2">
        <View className="flex-row items-center gap-2">
          <Text variant="h2">Notifications</Text>
          {unread > 0 && (
            <Badge variant="error" size="md">{unread} new</Badge>
          )}
        </View>
      </View>
      <View className="flex-1">
        {notifications.length === 0 ? (
          <EmptyState
            icon="🔔"
            title="No notifications"
            message="You're all caught up!"
          />
        ) : (
          <FlashList
            data={notifications}
            renderItem={renderItem}
            estimatedItemSize={80}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
