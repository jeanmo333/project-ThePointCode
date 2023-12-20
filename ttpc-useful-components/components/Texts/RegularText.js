import React from 'react';
import styled from 'styled-components/native';

//colors
import { colors } from '../colors';

const StyledText = styled.Text`
  font-size: 15px;
  color: ${colors.white};
  text-align: center;
`;

const RegularText = (props) => {
  return <StyledText {...props}>{props.children}</StyledText>;
};

export default RegularText;
