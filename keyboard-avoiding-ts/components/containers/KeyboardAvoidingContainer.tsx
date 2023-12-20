import { FC } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { KeyboardAvoidingContainerProps } from "./types";

const KeyboardAvoidingContainer: FC<KeyboardAvoidingContainerProps> = ({
  children,
  style,
  backgroundColor,
  headerAvailable = true,
}) => {
  const headerHeight = headerAvailable ? useHeaderHeight() + 10 : 10;

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: backgroundColor || "#f9fafb" }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={headerHeight}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            {
              padding: 20,
              paddingTop: headerAvailable
                ? 25
                : Platform.OS === "android"
                ? StatusBar.currentHeight + 50
                : 50,
            },
            style,
          ]}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default KeyboardAvoidingContainer;
