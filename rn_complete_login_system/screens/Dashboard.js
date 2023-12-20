import React from 'react';

import { colors } from '../components/colors';
const { darkGray } = colors;

// custom components
import MainContainer from '../components/Containers/MainContainer';
import BigText from '../components/Texts/BigText';
import InfoCard from '../components/Cards/InfoCard';

// styled components
import styled from 'styled-components/native';
import { ScreenHeight } from '../components/shared';

const TopBg = styled.View`
  background-color: ${darkGray};
  width: 100%;
  height: ${ScreenHeight * 0.3}px;
  border-radius: 30px;
  position: absolute;
  top: -30px;
`;

const Dashboard = ({ navigation }) => {
  const moveTo = (screen, payload) => {
    navigation.navigate(screen, { ...payload });
  };

  return (
    <MainContainer style={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0 }}>
      <TopBg />
      <MainContainer style={{ backgroundColor: 'transparent' }}>
        <BigText style={{ marginBottom: 25, fontWeight: 'bold' }}>Hello, Walt!</BigText>
        <InfoCard
          icon="chart-timeline-variant"
          title="Balance"
          value="13,288.84"
          date="13/05/2022"
          style={{ marginBottom: 25 }}
        />
        <InfoCard icon="chart-arc" title="Savings" value="3,500.27" date="Last 6 months" />
      </MainContainer>
    </MainContainer>
  );
};

export default Dashboard;
