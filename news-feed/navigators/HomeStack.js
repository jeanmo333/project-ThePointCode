import { createStackNavigator } from "@react-navigation/stack";

// screens
import Home from "../screens/Home";
import Details from "../screens/Details";
import { colors } from "../config/theme";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTitleAlign: "left",
        headerTitleStyle: {
          paddingLeft: 10,
        },
        headerStyle: {
          backgroundColor: activeColors.secondary,
        },
        headerTintColor: activeColors.tint,
      }}
    >
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Details" component={Details} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
