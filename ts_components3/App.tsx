import { StatusBar } from "expo-status-bar";
import { useState } from "react";

import MainContainer from "./components/Containers/MainContainer";
import BigText from "./components/Texts/BigText";
import RegularText from "./components/Texts/RegularText";
import SmallText from "./components/Texts/SmallText";
import StyledTextInput from "./components/Inputs/StyledTextInput";
import RegularButton from "./components/Buttons/RegularButton";

export default function App() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <MainContainer>
      <BigText>Yo! Big Text here</BigText>
      <RegularText>Yo! Regular Text here</RegularText>
      <SmallText style={{ marginBottom: 20 }}>Yo! Small Text here</SmallText>

      <StyledTextInput
        label="Email Address"
        icon="email-variant"
        value={email}
        onChangeText={setEmail}
        placeholder="richard12@gmail.com"
        keyboardType="email-address"
        style={{ marginBottom: 20 }}
      />

      <StyledTextInput
        label="Full Name"
        icon="account"
        value={fullName}
        onChangeText={setFullName}
        placeholder="Richard Johnson"
        style={{ marginBottom: 20 }}
      />

      <StyledTextInput
        label="Password"
        icon="lock-open"
        value={password}
        onChangeText={setPassword}
        placeholder="* * * * * * * *"
        isPassword={true}
        style={{ marginBottom: 30 }}
      />

      <RegularButton
        onPress={() => {
          alert("You pressed me!");
        }}
      >
        Press me!
      </RegularButton>

      <StatusBar style="auto" />
    </MainContainer>
  );
}
