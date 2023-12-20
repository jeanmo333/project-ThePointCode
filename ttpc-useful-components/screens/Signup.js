import React, { useState } from "react";

// colors
import { colors } from "./../components/colors";
const { white, lightSecondary } = colors;

// custom components
import MainContainer from "./../components/Containers/MainContainer";
import StyledTextInput from "../components/Inputs/StyledTextInput";
import BigText from "../components/Texts/BigText";
import RegularText from "../components/Texts/RegularText";
import SmallText from "../components/Texts/SmallText";
import RegularButton from "../components/Buttons/RegularButton";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <MainContainer style={{ justifyContent: "center" }}>
      <BigText>Demo App</BigText>
      <RegularText style={{ marginBottom: 25 }}>User Signup</RegularText>

      <>
        <StyledTextInput
          label="Full Name"
          placeholder="Richard Morrison"
          placeholderTextColor={lightSecondary}
          onChangeText={setName}
          value={name}
          keyboardType="email-address"
          icon="person"
          style={{ marginBottom: 25 }}
        />
        <StyledTextInput
          label="Email Address"
          placeholder="andyj@gmail.com"
          placeholderTextColor={lightSecondary}
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          icon="mail"
          style={{ marginBottom: 25 }}
        />
        <StyledTextInput
          label="Password"
          placeholder="* * * * * * * *"
          placeholderTextColor={lightSecondary}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={hidePassword}
          icon="lock"
          style={{ marginBottom: 25 }}
          isPassword={true}
          hidePassword={hidePassword}
          setHidePassword={setHidePassword}
        />

        <StyledTextInput
          label="Repeat Password"
          placeholder="* * * * * * * *"
          placeholderTextColor={lightSecondary}
          onChangeText={setRepeatPassword}
          value={repeatPassword}
          secureTextEntry={hidePassword}
          icon="lock"
          style={{ marginBottom: 25 }}
          isPassword={true}
          hidePassword={hidePassword}
          setHidePassword={setHidePassword}
        />

        <RegularButton onPress={() => {}}>Signup</RegularButton>

        <SmallText
          style={{ marginVertical: 15, textAlign: "center", color: white }}
        >
          Already have an account ?
        </SmallText>
      </>
    </MainContainer>
  );
};

export default Signup;
