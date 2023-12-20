import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "./components/colors";

import Login from "./screens/Login";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Demo ToThePointCode App</Text>
      <StatusBar style="light" />
    </View>
  );

  // clear return above and uncomment this return to see the login page
  // return (
  //   <>
  //     <Login />
  //     <StatusBar style="light" />
  //   </>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.secondary,
    fontSize: 15,
  },
});
