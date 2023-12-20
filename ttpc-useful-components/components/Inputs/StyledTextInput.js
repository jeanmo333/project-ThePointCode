import React from "react";
import { View } from "react-native";

// icon
import { Octicons, Ionicons } from "@expo/vector-icons";

// custom components
import { colors } from "../colors";
const { white, secondary, primary } = colors;
import SmallText from "../Texts/SmallText";

// styled components
import styled from "styled-components/native";

export const InputField = styled.TextInput`
  background-color: ${primary};
  padding: 15px;
  padding-left: 55px;
  padding-right: 55px;
  border-radius: 10px;
  font-size: 16px;
  height: 60px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  color: ${white};
`;

export const LeftIcon = styled.View`
  left: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
  right: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

const StyledTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={secondary} />
      </LeftIcon>
      <SmallText>{label}</SmallText>
      <InputField {...props} />
      {isPassword && (
        <RightIcon
          onPress={() => {
            setHidePassword(!hidePassword);
          }}
        >
          <Ionicons
            name={hidePassword ? "md-eye-off" : "md-eye"}
            size={30}
            color={white}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default StyledTextInput;
