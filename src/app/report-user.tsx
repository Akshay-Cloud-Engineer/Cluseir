import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Text, Card, Button, Divider } from "../components";
import { useToastStore } from "../store";

const reportReasons = [
  "Inappropriate behavior",
  "Spam or scam",
  "Harassment",
  "Fake profile",
  "Offensive content",
  "Other",
];

export default function ReportUserScreen() {
  const router = useRouter();
  const [selectedReason, setSelectedReason] = useState<string>("");
  const showToast = useToastStore((s) => s.showToast);

  const handleSubmit = () => {
    if (!selectedReason) return;
    showToast("Report submitted successfully", "success");
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={{ fontSize: 24, color: "#fff" }}>‹</Text>
          </TouchableOpacity>
          <Text variant="h2">Report User</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, paddingHorizontal: 20 }}>
        <Text variant="body" color="#A3A3A3" style={{ marginBottom: 16 }}>
          Help us keep the community safe. Select a reason for reporting this user.
        </Text>

        <Card style={{ marginBottom: 16 }}>
          {reportReasons.map((reason, index) => (
            <React.Fragment key={reason}>
              <TouchableOpacity
                onPress={() => setSelectedReason(reason)}
                style={{ flexDirection: "row", alignItems: "center", paddingVertical: 14 }}
              >
                <View
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 11,
                    borderWidth: 2,
                    borderColor: selectedReason === reason ? "#ec4899" : "#555",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 12,
                  }}
                >
                  {selectedReason === reason && (
                    <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#ec4899" }} />
                  )}
                </View>
                <Text variant="captionBold">{reason}</Text>
              </TouchableOpacity>
              {index < reportReasons.length - 1 && <Divider marginVertical={0} />}
            </React.Fragment>
          ))}
        </Card>

        <Button
          variant="primary"
          size="lg"
          fullWidth
          onPress={handleSubmit}
          disabled={!selectedReason}
          style={{ marginBottom: 32 }}
        >
          Submit Report
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
