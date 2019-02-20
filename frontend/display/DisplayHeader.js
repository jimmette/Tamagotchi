import React from "react";
import { Header, Left, Body, Right, Title, Subtitle } from "native-base";

class DisplayHeader extends React.Component {
  render() {
    return (
      <Header>
        <Left />
        <Body>
          <Title>Tammy</Title>
          <Subtitle>your Tamagotchi</Subtitle>
        </Body>
        <Right />
      </Header>
    );
  }
}

export default DisplayHeader;
