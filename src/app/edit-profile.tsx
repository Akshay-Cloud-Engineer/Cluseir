import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Text, Card, Input, Avatar, Button } from "../components";
import { useAuthStore } from "../store";

export default function EditProfileScreen() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [location, setLocation] = useState(user?.location || "");
  const [phone, setPhone] = useState(user?.phone || "");

  const handleSave = () => {
    if (!user) return;
    useAuthStore.getState().setUser({ ...user, name, bio, location, phone });
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={{ fontSize: 24, color: "#fff" }}>‹</Text>
          </TouchableOpacity>
          <Text variant="h2">Edit Profile</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, paddingHorizontal: 20 }}>
        <View style={{ alignItems: "center", marginBottom: 24 }}>
          <Avatar uri={user?.avatar} name={user?.name} size={100} />
          <TouchableOpacity style={{ marginTop: 8 }} onPress={() => {}}>
            <Text variant="captionBold" color="#ec4899">Change Photo</Text>
          </TouchableOpacity>
        </View>

        <Card style={{ marginBottom: 16 }}>
          <Input label="Full Name" value={name} onChangeText={setName} placeholder="Enter your name" />
          <Input label="Bio" value={bio} onChangeText={setBio} placeholder="Tell us about yourself" multiline numberOfLines={3} />
          <Input label="Location" value={location} onChangeText={setLocation} placeholder="Your location" />
          <Input label="Phone" value={phone} onChangeText={setPhone} placeholder="Phone number" keyboardType="phone-pad" />
        </Card>

        <Button variant="primary" size="lg" fullWidth onPress={handleSave} style={{ marginBottom: 32 }}>
          Save Changes
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
