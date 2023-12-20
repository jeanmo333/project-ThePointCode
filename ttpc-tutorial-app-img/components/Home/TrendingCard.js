import { StyleSheet, TouchableOpacity, Image, View } from "react-native";
import { colors } from "../../config/theme";
import StyledText from "../Texts/StyledText";

const TrendingCard = ({
  image,
  title,
  avatar,
  author,
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

      <View style={styles.bottomSection}>
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

        <View style={styles.author}>
          <Image source={avatar} style={styles.avatar} />
          <StyledText numberOfLines={1}>{author.split(" ")[0]}</StyledText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 310,
    borderRadius: 25,
    marginRight: 15,
    padding: 15,
  },
  image: {
    width: 280,
    height: 150,
    borderRadius: 20,
  },
  bottomSection: {
    flexDirection: "row",
    paddingTop: 20,
    justifyContent: "space-between",
  },
  author: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
});

export default TrendingCard;
