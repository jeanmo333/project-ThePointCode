import { StyleSheet, TouchableOpacity, Image, View } from "react-native";
import { colors } from "../../config/theme";
import StyledText from "../Texts/StyledText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const TrendingCard = ({
  image,
  title,
  lessons,
  duration,
  content,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={() => {}}
      style={[{ backgroundColor: colors.secondary }, styles.container]}
      {...props}
    >
      <Image source={image} style={styles.image} />

      <View>
        <StyledText numberOfLines={1} style={{ marginBottom: 10 }} bold>
          {title}
        </StyledText>

        <StyledText
          numberOfLines={1}
          style={[{ color: colors.tertiary + "aa" }]}
          small
        >
          {lessons} Lessons ~ {duration}
        </StyledText>
      </View>

      <MaterialCommunityIcons
        name="chevron-right"
        size={30}
        color={colors.accent}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    borderRadius: 25,
    marginBottom: 15,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 15,
  },
});

export default TrendingCard;
