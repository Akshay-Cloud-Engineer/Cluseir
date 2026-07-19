import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Text, Card, Divider } from "../components";

const faqs = [
  { q: "How do I make a call?", a: "Browse girls, tap on their profile, and press the Call button to start a conversation." },
  { q: "How does billing work?", a: "You are charged per minute of conversation. Your credits are displayed in your profile." },
  { q: "Can I get a refund?", a: "Please contact our support team for any refund requests within 24 hours of the call." },
  { q: "How do I block someone?", a: "Go to Settings > Block User and search for the user you want to block." },
  { q: "Is my data secure?", a: "Yes, we take privacy and security seriously. All conversations are encrypted." },
];

export default function HelpScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={{ fontSize: 24, color: "#fff" }}>‹</Text>
          </TouchableOpacity>
          <Text variant="h2">Help</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, paddingHorizontal: 20 }}>
        <Card style={{ marginBottom: 16 }}>
          {faqs.map((faq, index) => (
            <React.Fragment key={index}>
              <View style={{ paddingVertical: 14 }}>
                <Text variant="captionBold" style={{ marginBottom: 4 }}>{faq.q}</Text>
                <Text variant="small" color="#A3A3A3">{faq.a}</Text>
              </View>
              {index < faqs.length - 1 && <Divider marginVertical={0} />}
            </React.Fragment>
          ))}
        </Card>

        <Text variant="body" color="#A3A3A3" style={{ textAlign: "center", marginBottom: 32 }}>
          Need more help? Contact support@cluseir.com
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
