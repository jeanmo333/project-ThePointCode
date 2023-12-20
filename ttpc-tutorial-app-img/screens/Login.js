import { useState } from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { KeyboardAvoidingContainer } from "../components/Containers";
import StyledTextInput from "../components/Inputs/StyledTextInput";
import StyledButton from "../components/Buttons/StyledButton";

const Login = () => {
  const navigation = useNavigation();

  const [loggingIn, setLoggingIn] = useState(false);
  const onLogin = async () => {
    try {
      if (email && password) {
        setLoggingIn(true);
        // call backend api
        // const credentials = { email, password }
        // const loggedInUser = await axios.post("https://your-api-endpoint", credentials, config)

        setLoggingIn(false);
        navigation.navigate("Profile");
      } else {
        alert("Fill in all fields");
      }
    } catch ({ message }) {
      alert("Login Error! " + message);
      setLoggingIn(false);
    }
  };

  // inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingContainer style={styles.container}>
      <StyledTextInput
        placeholder="jbrown@hotmail.com"
        icon="email-outline"
        label="Email Address"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <StyledTextInput
        placeholder="* * * * * * * *"
        icon="lock-outline"
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <StyledButton isLoading={loggingIn} onPress={onLogin}>
        Submit
      </StyledButton>
    </KeyboardAvoidingContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 25,
    paddingHorizontal: 25,
  },
});

export default Login;
