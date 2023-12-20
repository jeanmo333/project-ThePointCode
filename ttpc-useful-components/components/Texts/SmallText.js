import React from "react";
import styled from "styled-components/native";

//colors
import { colors } from "../colors";

const StyledText = styled.Text`
  font-size: 13px;
  color: ${colors.white};
  text-align: left;
`;

const SmallText = (props) => {
  return <StyledText {...props}>{props.children}</StyledText>;
};

export default SmallText;
