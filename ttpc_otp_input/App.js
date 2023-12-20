import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable, Keyboard } from "react-native";

import { colors } from "./components/colors";

// custom components
import OTPInputField from "./components/OTPInputField";

import styled from "styled-components/native";

const StyledButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${colors.secondary};
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-vertical: 5px;
  height: 60px;
  width: 70%;
`;

export const ButtonText = styled.Text`
  color: ${colors.white};
  font-size: 15px;
`;

export default function App() {
  const [code, setCode] = useState("");
  const [pinReady, setPinReady] = useState(false);
  const MAX_CODE_LENGTH = 4;

  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <StatusBar style="light" />
      <Text style={styles.text}>Enter the received OTP</Text>
      <OTPInputField 
        setPinReady={setPinReady}
        code={code}
        setCode={setCode}
        maxLength={MAX_CODE_LENGTH}
      />
      <StyledButton
        disabled={!pinReady}
        style={{
          backgroundColor: !pinReady ? colors.lightSecondary : colors.secondary,
        }}
      >
        <ButtonText
          style={{
            color: !pinReady ? colors.primary : colors.white,
          }}
        >
          Submit
        </ButtonText>
      </StyledButton>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.white,
    fontSize: 15,
  },
});
