import { View, StyleSheet } from "react-native";
import { MainContainer } from "../components/Containers";
import StyledTextInput from "../components/Inputs/StyledTextInput";
import SectionHead from "../components/Texts/SectionHead";
import Trending from "../components/Home/Trending";
import Featured from "../components/Home/Featured";

// data
import { trendingData, featuredData } from "../config/data";

const Home = () => {
  return (
    <MainContainer style={styles.container}>
      <View style={styles.spacing}>
        <StyledTextInput
          placeholder="Search coding, maths, etc..."
          icon="magnify"
        />
        <SectionHead option="Show all">Trending</SectionHead>
      </View>

      <Trending data={trendingData} />

      <View style={styles.spacing}>
        <SectionHead option="Show all">Featured</SectionHead>

        <Featured data={featuredData} />
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 25,
  },
  spacing: {
    marginLeft: 25,
    marginRight: 25,
  },
});

export default Home;
