import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function App() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const [formReady, setFormReady] = useState(false);

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatepicker();
        setDateOfBirth(currentDate.toDateString());
      }
    } else {
      toggleDatepicker();
    }
  };

  const confirmIOSDate = () => {
    setDateOfBirth(date.toDateString());
    toggleDatepicker();
  };

  const formatDate = (rawDate) => {
    let date = new Date(rawDate);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${day}-${month}-${year}`;
  };

  const onSubmit = () => {
    alert(`${fullName} ${email} ${dateOfBirth}`);
  };

  useEffect(() => {
    setFormReady(fullName && email && dateOfBirth);
    return () => {
      setFormReady(false);
    };
  }, [fullName, email, dateOfBirth]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={10}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
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
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Jerry Jay"
              value={fullName}
              onChangeText={setFullName}
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

            {showPicker && (
              <DateTimePicker
                mode="date"
                display="spinner"
                value={date}
                onChange={onChange}
                style={styles.datePicker}
              />
            )}

            {showPicker && Platform.OS === "ios" && (
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.pickerButton,
                    { backgroundColor: "#11182711" },
                  ]}
                  onPress={toggleDatepicker}
                >
                  <Text style={[styles.buttonText, { color: "#075985" }]}>
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.pickerButton]}
                  onPress={confirmIOSDate}
                >
                  <Text style={[styles.buttonText]}>Confirm</Text>
                </TouchableOpacity>
              </View>
            )}

            {!showPicker && (
              <Pressable onPress={toggleDatepicker}>
                <TextInput
                  style={styles.input}
                  placeholder="Sat Aug 21 2004"
                  value={dateOfBirth}
                  onChangeText={setDateOfBirth}
                  placeholderTextColor="#11182744"
                  editable={false}
                  onPressIn={toggleDatepicker}
                />
              </Pressable>
            )}
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  contentContainer: {
    padding: 20,
    paddingTop: Platform.OS === "android" ? Constants.statusBarHeight + 50 : 50,
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
