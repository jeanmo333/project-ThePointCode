import FeaturedCard from "./FeaturedCard";

const Featured = ({ data }) => {
  return (
    <>
      {data.map((item, index) => (
        <FeaturedCard key={index} {...item} />
      ))}
    </>
  );
};

export default Featured;
