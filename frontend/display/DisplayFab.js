import React from "react";
import { Button, View, Fab, Icon } from "native-base";
import { connect } from "react-redux";
import CONSTANTS from "../Constants";
import { isTammyDoingSomething } from "../GameEngine";

class DisplayFab extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeEat: false, activeSleep: false, activePlay: false };
  }

  handleOnPressEatCarrots = () => {
    this.setState({ activeEat: false });
    let result = setTimeout(() => {
      this.props.dispatch({ type: "MAKE_TAMMY_STOP_EAT" });
    }, CONSTANTS.eat_timer);
    this.props.dispatch({ type: "MAKE_TAMMY_EAT", payload: result });
    this.props.dispatch({ type: "SET_ITEMS", carrots: -1 });
  };
  handleOnPressEatApples = () => {
    this.setState({ activeEat: false });
    let result = setTimeout(() => {
      this.props.dispatch({ type: "MAKE_TAMMY_STOP_EAT" });
    }, CONSTANTS.eat_timer);
    this.props.dispatch({ type: "MAKE_TAMMY_EAT", payload: result });
    this.props.dispatch({ type: "SET_ITEMS", apples: -1 });
  };
  handleOnPressSleep = () => {
    this.setState({ activeSleep: false });
    this.props.dispatch({
      type: "CURRENT_PAGE",
      page: "Sleep",
      title: this.props.tammyName
    });
  };
  handleOnPressPlayPets = () => {
    this.setState({ activePlay: false });
    this.props.dispatch({ type: "MAKE_TAMMY_PLAY" });
    setTimeout(() => {
      this.props.dispatch({ type: "MAKE_TAMMY_STOP_PLAY" });
    }, CONSTANTS.play_timer);
  };
  handleOnPressPlayWalk = () => {
    this.props.dispatch({
      type: "CURRENT_PAGE",
      page: "Walk",
      title: this.props.tammyName
    });
  };

  isTammyEatApplesDisabled = () => {
    if (isTammyDoingSomething()) {
      return true;
    }
    if (this.props.nbApples < 1) {
      return true;
    }
    return false;
  };
  isTammyEatCarrotsDisabled = () => {
    if (isTammyDoingSomething()) {
      return true;
    }
    if (this.props.nbCarrots < 1) {
      return true;
    }
    return false;
  };
  isTammySleepDisabled = () => {
    if (isTammyDoingSomething()) {
      return true;
    }
    return false;
  };
  isTammyPlayDisabled = () => {
    if (isTammyDoingSomething()) {
      return true;
    }
    return false;
  };

  backgroundColorPicker = disabled => {
    return disabled ? "#AAAAAA" : "#5067FF";
  };

  render() {
    let isTammyEatApplesDisabled = this.isTammyEatApplesDisabled();
    let isTammyEatCarrotsDisabled = this.isTammyEatCarrotsDisabled();
    let isTammySleepDisabled = this.isTammySleepDisabled();
    let isTammyPlayDisabled = this.isTammyPlayDisabled();

    let eatApplesBackgroundColor = this.backgroundColorPicker(
      isTammyEatApplesDisabled
    );
    let eatCarrotsBackgroundColor = this.backgroundColorPicker(
      isTammyEatCarrotsDisabled
    );
    let sleepBackgroundColor = this.backgroundColorPicker(isTammySleepDisabled);
    let playBackgroundColor = this.backgroundColorPicker(isTammyPlayDisabled);

    return (
      <View style={{ flex: 1, maxHeight: 100 }}>
        <Fab
          active={this.state.activeEat}
          direction="up"
          containerStyle={{ marginLeft: CONSTANTS.app_width / 2 - 150 }}
          style={{ backgroundColor: "#5067FF" }}
          position="bottomLeft"
          onPress={() => {
            this.setState({ activeEat: !this.state.activeEat });
          }}
        >
          <Icon type="MaterialCommunityIcons" name="silverware-fork-knife" />
          {this.state.activeEat === true ? (
            <Button
              style={{ backgroundColor: eatApplesBackgroundColor }}
              disabled={isTammyEatApplesDisabled}
              onPress={this.handleOnPressEatApples}
            >
              <Icon type="MaterialCommunityIcons" name="food-apple" />
            </Button>
          ) : (
            undefined
          )}
          {this.state.activeEat === true ? (
            <Button
              style={{ backgroundColor: eatCarrotsBackgroundColor }}
              disabled={isTammyEatCarrotsDisabled}
              onPress={this.handleOnPressEatCarrots}
            >
              <Icon type="MaterialCommunityIcons" name="carrot" />
            </Button>
          ) : (
            undefined
          )}
        </Fab>
        <Fab
          active={this.state.activeSleep}
          direction="up"
          containerStyle={{ marginLeft: CONSTANTS.app_width / 2 - 50 }}
          style={{ backgroundColor: "#5067FF" }}
          position="bottomLeft"
          onPress={() => {
            this.setState({ activeSleep: !this.state.activeSleep });
          }}
        >
          <Icon type="MaterialCommunityIcons" name="sleep" />
          {this.state.activeSleep === true ? (
            <Button
              style={{ backgroundColor: sleepBackgroundColor }}
              disabled={isTammySleepDisabled}
              onPress={this.handleOnPressSleep}
            >
              <Icon type="Entypo" name="clock" />
            </Button>
          ) : (
            undefined
          )}
        </Fab>
        <Fab
          active={this.state.activePlay}
          direction="up"
          containerStyle={{ marginLeft: CONSTANTS.app_width / 2 + 50 }}
          style={{ backgroundColor: "#5067FF" }}
          position="bottomLeft"
          onPress={() => this.setState({ activePlay: !this.state.activePlay })}
        >
          <Icon type="Feather" name="heart" />
          {this.state.activePlay === true ? (
            <Button
              style={{ backgroundColor: playBackgroundColor }}
              disabled={isTammyPlayDisabled}
              onPress={this.handleOnPressPlayPets}
            >
              <Icon type="MaterialIcons" name="pets" />
            </Button>
          ) : (
            undefined
          )}
          {this.state.activePlay === true ? (
            <Button
              style={{ backgroundColor: playBackgroundColor }}
              disabled={isTammyPlayDisabled}
              onPress={this.handleOnPressPlayWalk}
            >
              <Icon type="Ionicons" name="ios-walk" />
            </Button>
          ) : (
            undefined
          )}
        </Fab>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    satietyLevel: state.satietyLevel,
    energyLevel: state.energyLevel,
    joyLevel: state.joyLevel,
    isTammyEating: state.isTammyEating,
    isTammySleeping: state.isTammySleeping,
    isTammyPlaying: state.isTammyPlaying,
    tammyName: state.tammyName,
    nbCarrots: state.nbCarrots,
    nbApples: state.nbApples
  };
};

export default connect(mapStateToProps)(DisplayFab);
