import React, { FunctionComponent } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";

// custom components
import { colors } from "../components/colors";
import { Container } from "../components/shared";
import CardSection from "../components/Cards/CardSection";
import TransactionSection from "../components/Transactions/TransactionSection";
import SendMoneySection from "../components/SendMoney/SendMoneySection";

const HomeContainer = styled(Container)`
  background-color: ${colors.graylight};
  width: 100%;
  flex: 1;
`;

// card logos
import logo1 from "./../assets/cards/visa_white.png";
import logo2 from "./../assets/cards/mc.png";

// send money images
import portrait1 from "./../assets/portraits/1.jpg";
import portrait2 from "./../assets/portraits/2.jpg";
import portrait3 from "./../assets/portraits/3.jpg";

// types
import { RootStackParamList } from "../navigators/RootStack";
import { StackScreenProps } from "@react-navigation/stack";
export type Props = StackScreenProps<RootStackParamList, "Home">;

const Home: FunctionComponent<Props> = () => {
  const cardsData = [
    {
      id: 1,
      accountNo: "3845757744",
      balance: 20000.15,
      alias: "Work Debit",
      logo: logo1,
    },
    {
      id: 2,
      accountNo: "3845730203",
      balance: 12000.01,
      alias: "Personal Prepaid",
      logo: logo2,
    },
    {
      id: 3,
      accountNo: "3845238847",
      balance: 5600.83,
      alias: "School Prepaid",
      logo: logo1,
    },
  ];

  const transactionData = [
    {
      id: 1,
      amount: "-$86.00",
      date: "14 Sep 2021",
      title: "Taxi",
      subtitle: "Uber car",
      art: {
        background: colors.primary,
        icon: "car",
      },
    },
    {
      id: 2,
      amount: "-$286.00",
      date: "14 Sep 2021",
      title: "Shopping",
      subtitle: "Ali express",
      art: {
        background: colors.tertiary,
        icon: "cart",
      },
    },
    {
      id: 3,
      amount: "-$586.00",
      date: "14 Aug 2021",
      title: "Travel",
      subtitle: "Emirates",
      art: {
        background: colors.accent,
        icon: "airplane",
      },
    },
  ];

  const sendMoneyData = [
    {
      id: 1,
      amount: "2450.56",
      name: "Coby Andoh",
      background: colors.tertiary,
      img: portrait1,
    },
    {
      id: 2,
      amount: "4450.56",
      name: "Harleen Scot",
      background: colors.primary,
      img: portrait2,
    },
    {
      id: 3,
      amount: "6250.56",
      name: "James Corbyn",
      background: colors.accent,
      img: portrait3,
    },
  ];

  return (
    <HomeContainer>
      <StatusBar style="dark" />
      <CardSection data={cardsData} />
      <TransactionSection data={transactionData} />
      <SendMoneySection data={sendMoneyData} />
    </HomeContainer>
  );
};

export default Home;
