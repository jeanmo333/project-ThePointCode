import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../config/theme";
import { AppUserContext } from "../contexts/AppUserContext";

// screens
import { Home, Profile, ProfileEdit, Login } from "../screens";
import Avatar from "../components/Profile/Avatar";

const Stack = createStackNavigator();

const RootStack = () => {
  const { appUser } = useContext(AppUserContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors?.primary,
            borderBottomWidth: 0,
            shadowColor: "transparent",
            shadowOpacity: 0,
            elevation: 0,
          },
          headerTintColor: colors?.tint,
          headerBackTitleVisible: false,
          headerTitleAlign: "center",
          headerLeftContainerStyle: {
            left: 10,
          },
        }}
        initialRouteName="Home"
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Home",
            headerRightContainerStyle: {
              right: 25,
            },
            headerRight: () => {
              const navigation = useNavigation();

              return (
                <Avatar
                  aviOnly={true}
                  uri={appUser?.image}
                  onPress={() => {
                    navigation.navigate("Profile");
                  }}
                />
              );
            },
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ title: "Your Profile" }}
        />
        <Stack.Screen
          name="ProfileEdit"
          component={ProfileEdit}
          options={{ title: "Edit Profile" }}
        />

        {!appUser && (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: "Log In" }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
