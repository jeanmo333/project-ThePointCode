import { View } from "react-native";
import {
  StyledText,
  StyledButton,
  MessageModal,
  MessageTypes,
} from "../components";
import { useMessageModal } from "../hooks";

const Profile = () => {
  const { messageModalState, showMessageModal, hideModal } = useMessageModal();

  return (
    <View
      style={{
        flex: 1,
        padding: 25,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StyledText style={{ marginBottom: 20 }} big bold>
        PROFILE PAGE
      </StyledText>
      <StyledButton
        onPress={() => {
          showMessageModal(
            MessageTypes.INFO,
            "Profile Details",
            "You're John Doe and you joined this platform 2 years ago.",
            hideModal
          );
        }}
      >
        Show Details
      </StyledButton>
      <MessageModal {...messageModalState} />
    </View>
  );
};

export default Profile;
