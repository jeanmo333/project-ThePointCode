import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { StyledContainer, TopHalf, BottomHalf, IconBg, PageTitle, InfoText,EmphasizeText, StyledButton, ButtonText, InlineGroup, TextLink, TextLinkContent, Colors } from '../components/styles';

//colors
const { brand, primary, green } = Colors;

// icon
import { Octicons, Ionicons } from '@expo/vector-icons';

import { View } from 'react-native';

const Verification = () => {
  return <StyledContainer 
        style={{
        alignItems: 'center',
      }}
    >
      <TopHalf>
        <IconBg>
          <StatusBar style="dark" />
          <Octicons name="mail-read" size={125} color={brand} />
        </IconBg>
      </TopHalf>
      <BottomHalf>
        <PageTitle style={{ fontSize: 25 }}>Account Verification</PageTitle>
        <InfoText>
          Please verify your email using the link sent to  
          <EmphasizeText> {`test.tothepointcode@gmail.com`}</EmphasizeText>
        </InfoText>

        <StyledButton
          onPress={() => {}}
          style={{ backgroundColor: green, flexDirection: 'row' }}
        >
          <ButtonText>Proceed </ButtonText>
          <Ionicons name="arrow-forward-circle" size={25} color={primary} />
        </StyledButton>
        <View>
            <InlineGroup>
                <InfoText>Didn't receive the email? </InfoText>
                <TextLink onPress={() => {}}>
                    <TextLinkContent style={{ textDecorationLine:'underline' }}>
                        Resend
                    </TextLinkContent>
                </TextLink>
            </InlineGroup>
            <InfoText>
                in <EmphasizeText>{`20`}</EmphasizeText> second(s)
            </InfoText>
        </View>
      </BottomHalf>
  </StyledContainer>;
};

export default Verification;
