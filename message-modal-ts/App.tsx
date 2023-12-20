import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import {
  StyledText,
  StyledButton,
  MessageModal,
  MessageTypes,
} from "./components";
import { appColors } from "./config/theme";
import { useMessageModal } from "./hooks";
import Profile from "./screens/Profile";

export default function App() {
  const {
    messageModalState,
    showMessageModal,
    hideModal,
    setIsLoading,
    setIsRejecting,
    setIsProceeding,
  } = useMessageModal();

  const handleProceed = () => {
    setIsProceeding(true);
    // do what you want here
    console.log("Proceeding");

    setTimeout(() => {
      setIsProceeding(false);
      hideModal();
    }, 4000);
    // hideModal();
  };

  const handleDismiss = () => {
    // do what you want here
    console.log("Dismissing");
    hideModal();
  };

  const handleReject = () => {
    setIsRejecting(true);
    // do what you want here
    console.log("Rejecting");

    setTimeout(() => {
      setIsRejecting(false);
      hideModal();
    }, 4000);

    // hideModal();
  };

  useEffect(() => {
    // setIsLoading(true);
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 4000);
  }, []);

  // return <Profile />

  return (
    <View style={styles.container}>
      <StyledText style={styles.text} big bold>
        CUSTOM MESSAGE MODALS
      </StyledText>
      <StyledButton
        style={{ backgroundColor: appColors.fail, marginBottom: 20 }}
        onPress={() => {
          showMessageModal(
            MessageTypes.FAIL,
            "Login Failed!",
            "No account with your email exists. Please sign up first.",
            handleProceed
          );
        }}
      >
        Fail
      </StyledButton>
      <StyledButton
        style={{ backgroundColor: appColors.success, marginBottom: 20 }}
        onPress={() => {
          showMessageModal(
            MessageTypes.SUCCESS,
            "Account Created!",
            "Your account has been created successfully. You can now proceed to login",
            handleProceed,
            {
              buttonText: "Proceed",
            }
          );
        }}
      >
        Success
      </StyledButton>
      <StyledButton
        style={{ backgroundColor: appColors.warning, marginBottom: 20 }}
        onPress={() => {
          showMessageModal(
            MessageTypes.WARNING,
            "Session Expiry",
            "Your login session will expire soon. You'll have to log in again.",
            handleProceed
          );
        }}
      >
        Warning
      </StyledButton>
      <StyledButton
        style={{ backgroundColor: appColors.decision, marginBottom: 20 }}
        onPress={() => {
          showMessageModal(
            MessageTypes.DECISION,
            "Confirmation",
            "You're about to update your account details. Do you want to proceed?",
            handleProceed,
            {
              buttonText: "Proceed",
              altButtonText: "Cancel",
            }
          );
        }}
      >
        Decision
      </StyledButton>
      <StyledButton
        style={{ backgroundColor: appColors.fail, marginBottom: 20 }}
        onPress={() => {
          showMessageModal(
            MessageTypes.DANGEROUS_DECISION,
            "Account Deletion",
            "You're about to delete your account. This is irreversible. Do you want to proceed?",
            handleProceed,
            { onReject: handleReject }
          );
        }}
      >
        Dangerous Decision
      </StyledButton>
      <StyledButton
        style={{ backgroundColor: appColors.info, marginBottom: 20 }}
        onPress={() => {
          showMessageModal(
            MessageTypes.INFO,
            "Note!",
            "This is a custom modal and it's fully reusable.",
            handleProceed,
            { onDismiss: handleDismiss }
          );
        }}
      >
        Info
      </StyledButton>

      <MessageModal {...messageModalState} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.primary,
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
  },
  text: {
    marginBottom: 20,
    textAlign: "center",
  },
});
