import React from "react";
import { Font } from "expo";
import { Container, View, Content, Text } from "native-base";
import { StyleSheet, ImageBackground } from "react-native";
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

{
  /* <ImageBackground
source={{uri: "require('./assets/images/background.png')"}} 
        <ImageBackground
          source={require("./assets/images/background.png")}
          style={{ flex: 1 }}
        />*/
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF"
  },
  bubble_container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFF",
    borderWidth: 6,
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
    transform: [{ scaleX: 2 }],
    marginTop: 30,
    marginLeft: 96,
    zIndex: 2
  },
  text_container: {
    textAlign: "center",
    transform: [{ scaleX: 0.5 }],
    fontFamily: "Gochi",
    fontSize: 20,
    paddingLeft: 0,
    paddingRight: 0
  }
});

class AppControler extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fontLoaded: false };
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

    await Font.loadAsync({
      Gochi: require("./assets/fonts/GochiHand-Regular.ttf")
    });

    this.setState({ fontLoaded: true });
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
    let text = "Hello! So good to see you!";
    if (this.props.isTammyMad === true) {
      text = "I'm not feeling so good...";
    } else if (this.props.isTammyWeak === true) {
      text = "I'm not talking to you right now.";
    }
    this.props.dispatch({
      type: "DISPLAY_MESSAGE",
      payload: text
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
          {this.props.displayMessage !== "" ? (
            <View style={styles.bubble_container}>
              {this.state.fontLoaded ? (
                <Text style={styles.text_container}>
                  {this.props.displayMessage}
                </Text>
              ) : null}
            </View>
          ) : null}
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
      <Container style={styles.container}>
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
    _id: state._id,
    isTammyMad: state.isTammyMad,
    isTammyWeak: state.isTammyWeak
  };
};

export default connect(mapStateToProps)(AppControler);
