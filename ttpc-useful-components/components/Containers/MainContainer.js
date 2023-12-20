import React from "react";

// styled components
import styled from "styled-components/native";

import { colors } from "../colors";
const { black } = colors;

export const StyledView = styled.View`
  flex: 1;
  padding: 25px;
  padding-top: 40px;
  background-color: ${black};
`;

const MainContainer = (props) => {
  return <StyledView {...props}>{props.children}</StyledView>;
};

export default MainContainer;
