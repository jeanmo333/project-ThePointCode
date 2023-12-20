import "react-native-gesture-handler";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import KeyboardAvoidingContainer from "./components/KeyboardAvoidingContainer";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Home() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [otherNames, setOtherNames] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const [formReady, setFormReady] = useState(false);

  const onSubmit = () => {
    alert(`${fullName} ${email} ${dateOfBirth}`);
  };

  return (
    <KeyboardAvoidingContainer>
      <Text style={styles.head}>
        <MaterialCommunityIcons
          name="flower-tulip-outline"
          size={20}
          color="#075985"
        />{" "}
        Flowerio
      </Text>
      <Text style={styles.moto}>Make Every Flower Count</Text>
      <View>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Jerry"
          value={firstName}
          onChangeText={setFirstName}
          placeholderTextColor="#11182744"
        />
      </View>
      <View>
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Jay"
          value={lastName}
          onChangeText={setLastName}
          placeholderTextColor="#11182744"
        />
      </View>
      <View>
        <Text style={styles.label}>Other Names</Text>
        <TextInput
          style={styles.input}
          placeholder="Clark"
          value={otherNames}
          onChangeText={setOtherNames}
          placeholderTextColor="#11182744"
        />
      </View>
      <View>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="jerry.jay@gmail.com"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#11182744"
        />
      </View>
      <View>
        <Text style={styles.label}>Date Of Birth</Text>

        <TextInput
          style={styles.input}
          placeholder="Sat Aug 21 2004"
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
          placeholderTextColor="#11182744"
        />
      </View>
      <View>
        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input}
          placeholder="Helsinki"
          value={city}
          onChangeText={setCity}
          placeholderTextColor="#11182744"
        />
      </View>
      <View>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="No. 5, XYZ Street"
          value={address}
          onChangeText={setAddress}
          placeholderTextColor="#11182744"
        />
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: formReady ? "#075985" : "#11182711" },
        ]}
        disabled={!formReady}
        onPress={onSubmit}
      >
        <Text
          style={[
            styles.buttonText,
            { color: formReady ? "#fff" : "#11182766" },
          ]}
        >
          Submit
        </Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </KeyboardAvoidingContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    padding: 20,
    paddingTop: 50,
  },
  head: {
    fontWeight: "500",
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center",
    color: "#111827cc",
  },
  moto: {
    fontWeight: "400",
    fontSize: 15,
    marginBottom: 35,
    textAlign: "center",
    color: "#111827cc",
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 10,
    color: "#111827cc",
  },
  input: {
    backgroundColor: "transparent",
    height: 50,
    fontSize: 14,
    fontWeight: "500",
    color: "#111827cc",
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: "#11182711",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 15,
    backgroundColor: "#075985",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
  },
  datePicker: {
    height: 120,
    marginTop: -10,
  },
  pickerButton: {
    paddingHorizontal: 20,
  },
});
