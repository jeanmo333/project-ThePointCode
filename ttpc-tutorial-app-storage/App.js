import "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import RootStack from "./navigators/RootStack";
import { AppUserContext } from "./contexts/AppUserContext";
import { fetchSecurely } from "./utils/storage";

// Keep the splash screen visible
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appUser, setAppUser] = useState(null);

  const prepareApp = async () => {
    try {
      // fetch app data in secure storage / remote api
      const storedAppUser = await fetchSecurely("profileAppUser");

      if (storedAppUser) {
        // store in context
        setAppUser(storedAppUser);
      }
    } catch ({ message }) {
      alert(message);
    } finally {
      // dismiss splash screen
      await setTimeout(() => SplashScreen.hideAsync(), 1000);
    }
  };

  useEffect(() => {
    prepareApp();
  }, []);

  return (
    <AppUserContext.Provider value={{ appUser, setAppUser }}>
      <RootStack />
      <StatusBar style="auto" />
    </AppUserContext.Provider>
  );
}
