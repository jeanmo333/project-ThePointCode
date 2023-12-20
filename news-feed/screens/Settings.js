import { useState } from "react";
import { StyleSheet, Switch, View } from "react-native";

// components
import MainContainer from "../components/containers/MainContainer";
import StyledText from "../components/Texts/StyledText";
import SettingsItem from "../components/Settings/SettingsItem";
import SettingsButton from "../components/Settings/SettingsButton";
import { colors } from "../config/theme";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Settings() {
  const { theme, updateTheme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  const [isActive, setIsActive] = useState(theme.mode === "dark");
  const handleSwitch = () => {
    updateTheme();
    setIsActive((previousState) => !previousState);
  };
  return (
    <MainContainer style={styles.container}>
      <StyledText style={{ color: activeColors.accent }} bold>
        User
      </StyledText>

      <View style={styles.section}>
        <SettingsItem label="Name">
          <StyledText>Richard Barnes</StyledText>
        </SettingsItem>
        <SettingsItem label="Joined On">
          <StyledText>07 / 10 / 22</StyledText>
        </SettingsItem>
      </View>

      <StyledText style={{ color: activeColors.accent }} bold>
        Theme Switch
      </StyledText>

      <View style={styles.section}>
        <SettingsItem label="Dark Mode">
          <Switch
            value={isActive}
            onValueChange={handleSwitch}
            thumbColor={isActive ? activeColors.accent : activeColors.tertiary}
            ios_backgroundColor={activeColors.primary}
            trackColor={{
              false: activeColors.primary,
              true: activeColors.tertiary,
            }}
          />
        </SettingsItem>
      </View>

      <StyledText style={{ color: activeColors.accent }} bold>
        Theme Settings
      </StyledText>

      <View style={styles.section}>
        <SettingsButton
          label="Light"
          icon="lightbulb-on"
          isActive={theme.mode === "light" && !theme.system}
          onPress={() => updateTheme({ mode: "light" })}
        />
        <SettingsButton
          label="Dark"
          icon="weather-night"
          isActive={theme.mode === "dark" && !theme.system}
          onPress={() => updateTheme({ mode: "dark" })}
        />
        <SettingsButton
          label="System"
          icon="theme-light-dark"
          isActive={theme.system}
          onPress={() => updateTheme({ system: true })}
        />
      </View>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
  },
  section: {
    borderRadius: 30,
    overflow: "hidden",
    marginTop: 25,
    marginBottom: 25,
  },
});
