import { ReactNode } from "react";
import { StyleProp, ViewStyle, ColorValue } from "react-native";

export type KeyboardAvoidingContainerProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: ColorValue;
  headerAvailable?: boolean;
};
