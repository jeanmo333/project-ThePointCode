import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';

import {
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  ButtonText,
  Line,
  WelcomeContainer,
  WelcomeImage,
  Avatar,
} from './../components/styles';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from './../components/CredentialsContext';

// google sign in
import * as GoogleSignIn from 'expo-google-sign-in';

const Welcome = () => {
  //context
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  let { name, email, photoUrl } = storedCredentials;
  const AvatarImg = photoUrl ? { uri: photoUrl } : require('./../assets/img/img1.png');

  // for google sign in
  name = name ? name : displayName;

  const clearLogin = async () => {
    try {
      if (!__DEV__) {
        await GoogleSignIn.signOutAsync();
        await AsyncStorage.removeItem('flowerCribCredentials');
      } else {
        await AsyncStorage.removeItem('flowerCribCredentials');
      }
        setStoredCredentials('');
    } catch ({message}){
      alert("Logout Error: "+ message);
    }
  };

  return (
    <>
      <StatusBar style="light" />
      <InnerContainer>
        <WelcomeImage resizeMode="cover" source={require('./../assets/img/img2.png')} />
        <WelcomeContainer>
          <PageTitle welcome={true}>Welcome! Buddy</PageTitle>
          <SubTitle welcome={true}>{name || 'Olga Simpson'}</SubTitle>
          <SubTitle welcome={true}>{email || 'olgasimp@gmail.com'}</SubTitle>

          <StyledFormArea>
            <Avatar resizeMode="cover" source={AvatarImg} />

            <Line />
            <StyledButton onPress={clearLogin}>
              <ButtonText>Logout</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

export default Welcome;
