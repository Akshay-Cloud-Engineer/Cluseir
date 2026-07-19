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
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.6)",
            justifyContent: "center",
            alignItems: "center",
            padding: 24,
          }}
        >
          <TouchableWithoutFeedback onPress={() => {}}>
            <View
              style={{
                backgroundColor: "#1E1E1E",
                borderRadius: 20,
                padding: 24,
                width: "100%",
                maxWidth: 400,
              }}
            >
              {title && (
                <Text variant="h4" style={{ marginBottom: 12 }}>
                  {title}
                </Text>
              )}
              {children}
              {actions && (
                <View style={{ flexDirection: "row", gap: 12, marginTop: 20 }}>
                  {actions.map((action, index) => (
                    <View key={index} style={{ flex: 1 }}>
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
