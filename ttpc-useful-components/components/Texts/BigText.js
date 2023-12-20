import React from "react";
import styled from "styled-components/native";

//colors
import { colors } from "../colors";

const StyledText = styled.Text`
  font-size: 30px;
  color: ${colors.white};
  text-align: center;
`;

const BigText = (props) => {
  return <StyledText {...props}>{props.children}</StyledText>;
};

export default BigText;
