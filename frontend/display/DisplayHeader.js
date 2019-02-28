import React from "react";
import { connect } from "react-redux";
import { Header, Left, Body, Right, Title, Subtitle } from "native-base";

class DisplayHeader extends React.Component {
  render() {
    return (
      <Header>
        <Left />
        <Body>
          <Title>{this.props.currentTitle}</Title>
          <Subtitle>your Tamagotchi</Subtitle>
        </Body>
        <Right />
      </Header>
    );
  }
}

const mapStateToProps = state => {
  return { currentTitle: state.currentTitle };
};

export default connect(mapStateToProps)(DisplayHeader);
