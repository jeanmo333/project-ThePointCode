import { useEffect, useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

import { colors } from "../config/theme";
import { MainContainer } from "../components/Containers";
import StyledText from "../components/Texts/StyledText";
import SectionHead from "../components/Texts/SectionHead";
import Avatar from "../components/Profile/Avatar";
import ProfileInfo from "../components/Profile/ProfileInfo";
import ProfileButton from "../components/Profile/ProfileButton";
import UploadModal from "../components/Profile/UploadModal";
import { AppUserContext } from "../contexts/AppUserContext";
import { saveSecurely } from "../utils/storage";

// for uploading image to backend
// const FormData = global.FormData;

const Profile = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(appUser?.image);
  const { appUser, setAppUser } = useContext(AppUserContext);

  // useEffect(() => {
  // get data from API
  // })

  const uploadImage = async (mode) => {
    try {
      let result = {};

      if (mode === "gallery") {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      } else {
        await ImagePicker.requestCameraPermissionsAsync();
        result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      }

      if (!result.canceled) {
        // save image
        await saveImage(result.assets[0].uri);
      }
    } catch (error) {
      alert("Error uploading image: " + error.message);
      setModalVisible(false);
    }
  };

  const removeImage = async () => {
    try {
      saveImage(null);
    } catch ({ message }) {
      alert(message);
      setModalVisible(false);
    }
  };

  const saveImage = async (image) => {
    try {
      // update displayed image
      setImage(image);

      // make api call to save
      // sendToBackend();

      const updatedUserData = {
        ...appUser,
        image,
      };
      await setAppUser(updatedUserData);
      await saveSecurely("profileAppUser", updatedUserData);

      setModalVisible(false);
    } catch (error) {
      throw error;
    }
  };

  // const sendToBackend = async () => {
  //   try {
  //     const formData = new FormData();

  //     formData.append("image", {
  //       uri: image,
  //       type: "image/png",
  //       name: "profile-image",
  //     });

  //     const config = {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //       transformRequest: () => {
  //         return formData;
  //       },
  //     };

  //     await axios.post("https://your-api-endpoint", formData, config);

  //     alert("success");
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  const onLogout = async () => {
    try {
      await setAppUser(null);
      await saveSecurely("profileAppUser", null);
    } catch ({ message }) {
      alert("Logout Error! " + message);
    }
  };

  return (
    <MainContainer style={styles.container}>
      {appUser && (
        <>
          <Avatar
            onButtonPress={() => setModalVisible(true)}
            uri={image || appUser?.image}
          />
          <StyledText big bold style={[styles.text, { marginBottom: 10 }]}>
            {appUser?.fullName}
          </StyledText>
          <StyledText style={[styles.text, { marginBottom: 5 }]}>
            {appUser?.bio}
          </StyledText>
          <StyledText small style={[styles.text, { color: colors.tertiary }]}>
            Active since - {appUser?.joinDate}
          </StyledText>
          <SectionHead
            option="Edit"
            style={{ marginTop: 20 }}
            onPress={() =>
              navigation.navigate("ProfileEdit", {
                ...appUser,
              })
            }
          >
            Personal Info
          </SectionHead>
          <View style={styles.section}>
            <ProfileInfo label="Email" icon="email-outline">
              <StyledText>{appUser?.email}</StyledText>
            </ProfileInfo>
            <ProfileInfo label="Phone" icon="phone-outline">
              <StyledText>{appUser?.phone}</StyledText>
            </ProfileInfo>
            <ProfileInfo label="Location" icon="map-marker-outline">
              <StyledText>{appUser?.location}</StyledText>
            </ProfileInfo>
          </View>
          <SectionHead style={{ marginTop: 20 }}>Utilities</SectionHead>
          <View style={styles.section}>
            <ProfileButton label="Downloads" icon="download-outline" />
            <ProfileButton label="Help" icon="help-circle-outline" />
            <ProfileButton
              label="Log Out"
              icon="logout-variant"
              onPress={onLogout}
            />
          </View>
          <UploadModal
            modalVisible={modalVisible}
            onBackPress={() => {
              setModalVisible(false);
            }}
            onCameraPress={() => uploadImage()}
            onGalleryPress={() => uploadImage("gallery")}
            onRemovePress={() => removeImage()}
          />
        </>
      )}

      {!appUser && (
        <>
          <StyledText style={{ marginTop: 10, marginBottom: 20 }}>
            Please log in an account
          </StyledText>

          <View style={styles.section}>
            <ProfileButton
              label="Log In"
              icon="login-variant"
              onPress={() => navigation.navigate("Login")}
            />
          </View>
        </>
      )}
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 25,
    paddingHorizontal: 25,
  },
  section: {
    borderRadius: 15,
    overflow: "hidden",
    marginTop: 5,
    marginBottom: 5,
  },
  text: {
    textAlign: "center",
  },
});

export default Profile;
