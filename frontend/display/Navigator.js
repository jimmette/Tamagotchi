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
import DisplaySettings from "./DisplaySettings";
import DisplayStats from "./DisplayStats";
import DisplayInventory from "./DisplayInventory";
import CONSTANTS from "../Constants";

class Navigator extends React.Component {
  displayHomepage = () => {
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
  };
  displayWalk = () => {
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
  };
  displaySleep = () => {
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
  };
  displaySettings = () => {
    return (
      <Content>
        <DisplaySettings />
      </Content>
    );
  };
  displayStats = () => {
    return (
      <Content>
        <DisplayStats />
      </Content>
    );
  };
  displayInventory = () => {
    return (
      <Content>
        <DisplayInventory />
      </Content>
    );
  };
  renderContent = () => {
    switch (this.props.currentPage) {
      case "Home":
        return this.displayHomepage();
      case "Walk":
        return this.displayWalk();
      case "Sleep":
        return this.displaySleep();
      case "Settings":
        return this.displaySettings();
      case "Stats":
        return this.displayStats();
      case "Inventory":
        return this.displayInventory();
      default:
        return (
          <View>
            <Text>This page does not exist</Text>
          </View>
        );
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
