import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { Text, Card, Input, Avatar, Button } from "../components";
import { useAuthStore } from "../store";

interface ProfileFormData {
  name: string;
  bio: string;
  location: string;
  phone: string;
}

export default function EditProfileScreen() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.name || "",
      bio: user?.bio || "",
      location: user?.location || "",
      phone: user?.phone || "",
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    if (!user) return;
    useAuthStore.getState().setUser({ ...user, ...data });
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <View className="px-5 pt-4 pb-2">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity onPress={() => router.back()} className="p-1">
            <Text className="text-[24px] text-text-light dark:text-text-dark">‹</Text>
          </TouchableOpacity>
          <Text variant="h2">Edit Profile</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-5">
        <View className="items-center mb-6 mt-2">
          <Avatar uri={user?.avatar} name={user?.name} size={100} />
          <TouchableOpacity className="mt-2" onPress={() => {}}>
            <Text variant="captionBold" className="text-primary-500">Change Photo</Text>
          </TouchableOpacity>
        </View>

        <Card className="mb-6 gap-2">
          <Controller
            control={control}
            name="name"
            rules={{ required: "Name is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Full Name"
                placeholder="Enter your name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="bio"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Bio"
                placeholder="Tell us about yourself"
                multiline
                numberOfLines={3}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="location"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Location"
                placeholder="Your location"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Phone"
                placeholder="Phone number"
                keyboardType="phone-pad"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </Card>

        <Button
          variant="primary"
          size="lg"
          fullWidth
          onPress={handleSubmit(onSubmit)}
          className="mb-8"
        >
          Save Changes
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
