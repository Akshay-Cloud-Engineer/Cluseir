import React, { ReactNode } from "react";
import { View, Modal as RNModal, TouchableWithoutFeedback } from "react-native";
import { Text } from "./ui/Text";
import { Button } from "./ui/Button";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  actions?: { label: string; onPress: () => void; variant?: "primary" | "secondary" | "outline" }[];
}

export const Modal = ({ visible, onClose, title, children, actions }: ModalProps) => {
  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-black/60 justify-center items-center p-6">
          <TouchableWithoutFeedback onPress={() => {}}>
            <View className="bg-surface-light dark:bg-surface-dark rounded-3xl p-6 w-full max-w-sm">
              {title && (
                <Text variant="h4" className="mb-3">
                  {title}
                </Text>
              )}
              {children}
              {actions && (
                <View className="flex-row gap-3 mt-5">
                  {actions.map((action, index) => (
                    <View key={index} className="flex-1">
                      <Button
                        variant={action.variant || "primary"}
                        onPress={action.onPress}
                        fullWidth
                      >
                        {action.label}
                      </Button>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

