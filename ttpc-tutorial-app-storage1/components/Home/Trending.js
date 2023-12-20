import { FlatList } from "react-native";
import TrendingCard from "./TrendingCard";

const NewsSection = ({ data }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <TrendingCard {...item} />}
      keyExtractor={({ id }) => id.toString()}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingLeft: 25,
        marginBottom: 25,
      }}
    />
  );
};

export default NewsSection;
