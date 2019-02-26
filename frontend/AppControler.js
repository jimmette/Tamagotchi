import React from "react";
import { Container, View, Content, Text } from "native-base";
import { connect } from "react-redux";
import DisplayHeader from "./display/DisplayHeader";
import DisplayFab from "./display/DisplayFab";
import DisplayFooter from "./display/DisplayFooter";
import DisplayStatus from "./display/DisplayStatus";
import SpriteAnimation from "./SpriteAnimation";
import DisplayWalk from "./display/DisplayWalk";
import DisplaySleep from "./display/DisplaySleep";
import DisplaySettings from "./display/DisplaySettings";
import DisplayStats from "./display/DisplayStats";
import DisplayInventory from "./display/DisplayInventory";
import gameEngine from "./GameEngine";
import { isTammyDoingSomething } from "./GameEngine";
import CONSTANTS from "./Constants";
import { _retrieveDataLocal, _storeDataLocal } from "./JugeMoiPasRichard";
import { backupTammy, restoreTammy } from "./Networking";

class AppControler extends React.Component {
  constructor(props) {
    super(props);
    // _removeDataLocal();
    // deleteTammy();
    this.gameEngineInterval = setInterval(
      gameEngine,
      CONSTANTS.game_engine_timer
    );

    this.storeDataLocalInterval = setInterval(() => {
      if (isTammyDoingSomething() === false) {
        _storeDataLocal();
      }
    }, 1000);
    this.storeDataOnlineInterval = undefined;
  }
  componentDidMount = async () => {
    await _retrieveDataLocal();
    this.displayWelcomeMessage();
  };

  componentDidUpdate = () => {
    if (
      this.props.allowOnlineSync === true &&
      this.storeDataOnlineInterval === undefined
    ) {
      this.storeDataOnlineInterval = setInterval(() => {
        if (isTammyDoingSomething() === false) {
          backupTammy();
        }
      }, 10000);
    }
  };

  componentWillUnmount = () => {
    clearInterval(this.gameEngineInterval);
    clearInterval(this.storeDataLocalInterval);
    if (this.storeDataOnlineInterval) {
      clearInterval(this.storeDataOnlineInterval);
    }
  };

  displayWelcomeMessage = () => {
    this.props.dispatch({
      type: "DISPLAY_MESSAGE",
      payload: "Hello! So good to see you!"
    });
    setTimeout(() => {
      this.props.dispatch({ type: "DISPLAY_MESSAGE", payload: "" });
    }, CONSTANTS.animation_interruption_messages);
  };
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
    displayMessage: state.displayMessage,
    allowOnlineSync: state.allowOnlineSync,
    _id: state._id
  };
};

export default connect(mapStateToProps)(AppControler);
