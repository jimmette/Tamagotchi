import React from "react";
import { Container, View, Content, Text } from "native-base";
import { connect } from "react-redux";
import DisplayHeader from "./DisplayHeader";
import DisplayFab from "./DisplayFab";
import DisplayFooter from "./DisplayFooter";
import DisplayStatus from "./DisplayStatus";
import SpriteAnimation from "../SpriteAnimation";
import DisplayWalk from "./DisplayWalk";
import DisplaySleep from "./DisplaySleep";
import CONSTANTS from "../Constants";

class Navigator extends React.Component {
  renderContent = () => {
    switch (this.props.currentPage) {
      case "Home":
        return (
          <>
            <Content>
              <DisplayStatus />
              <Text
                style={{
                  marginTop: 15,
                  width: CONSTANTS.app_width,
                  textAlign: "center",
                  fontWeight: "bold"
                }}
              >
                {this.props.displayMessage}
              </Text>
              <SpriteAnimation
                top={100}
                left={(CONSTANTS.app_width - CONSTANTS.sprite_width) / 2}
              />
            </Content>
            <DisplayFab />
          </>
        );
      case "Walk":
        return (
          <>
            <Content>
              <DisplayStatus />
              <SpriteAnimation
                top={100}
                left={(CONSTANTS.app_width - CONSTANTS.sprite_width) / 2}
              />
            </Content>
            <DisplayWalk />
          </>
        );
      case "Sleep":
        return (
          <>
            <Content>
              <DisplayStatus />
              <SpriteAnimation
                top={100}
                left={(CONSTANTS.app_width - CONSTANTS.sprite_width) / 2}
              />
            </Content>
            <DisplaySleep />
          </>
        );

      default:
        return <View />;
    }
  };

  render() {
    return (
      <Container>
        <DisplayHeader />
        {this.renderContent()}
        <DisplayFooter />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentPage: state.currentPage,
    displayMessage: state.displayMessage
  };
};

export default connect(mapStateToProps)(Navigator);
