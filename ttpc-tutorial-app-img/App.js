import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import RootStack from "./navigators/RootStack";

export default function App() {
  return (
    <>
      <RootStack />
      <StatusBar style="auto" />
    </>
  );
}
