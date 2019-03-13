import React from "react";
import { Button, View, Fab, Icon } from "native-base";
import { connect } from "react-redux";
import CONSTANTS from "../Constants";

class DisplayFAB extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeEat: false, activeSleep: false, activePlay: false };
    this.timeout = undefined;
  }

  componentWillUnmount() {
    if (this.timeout !== undefined) {
      clearTimeout(this.timeout);
    }
  }

  handleOnPressEatCarrots = () => {
    this.props.dispatch({
      type: "SET_ANIMATION",
      payload: {
        animation: "EAT"
      }
    });
    this.timeout = setTimeout(() => {
      this.props.dispatch({
        type: "SET_ANIMATION",
        payload: {
          animation: "IDLE"
        }
      });
    }, CONSTANTS.eat_timer);
  };
  handleOnPressEatApples = () => {
    this.props.dispatch({
      type: "SET_ANIMATION",
      payload: {
        animation: "EAT"
      }
    });
    this.timeout = setTimeout(() => {
      this.props.dispatch({
        type: "SET_ANIMATION",
        payload: {
          animation: "IDLE"
        }
      });
    }, CONSTANTS.eat_timer);
  };
  handleOnPressSleep = () => {
    let data = this.props.displayAnimation === "SLEEP" ? "IDLE" : "SLEEP";
    if (data === "IDLE") {
      this.props.dispatch({
        type: "SET_ANIMATION",
        payload: {
          animation: data
        }
      });
      return;
    }

    this.props.dispatch({
      type: "SET_ANIMATION",
      payload: {
        animation: "YAWN"
      }
    });
    this.timeout = setTimeout(() => {
      this.props.dispatch({
        type: "SET_ANIMATION",
        payload: {
          animation: data
        }
      });
    }, CONSTANTS.yawn_timer);
  };
  handleOnPressPlayPets = () => {};
  handleOnPressPlayWalk = () => {
    let data = this.props.displayAnimation === "WALK" ? "IDLE" : "WALK";
    this.props.dispatch({
      type: "SET_ANIMATION",
      payload: {
        animation: data
      }
    });
  };

  isTammyEatApplesDisabled = () => {
    // if (isTammyDoingSomething()) {
    //   return true;
    // }
    // if (this.props.nbApples < 1) {
    //   return true;
    // }
    // return false;
  };
  isTammyEatCarrotsDisabled = () => {
    // if (isTammyDoingSomething()) {
    //   return true;
    // }
    // if (this.props.nbCarrots < 1) {
    //   return true;
    // }
    // return false;
  };
  isTammySleepDisabled = () => {
    // if (isTammyDoingSomething()) {
    //   return true;
    // }
    // return false;
  };
  isTammyPlayDisabled = () => {
    // if (isTammyDoingSomething()) {
    //   return true;
    // }
    // return false;
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
      <View>
        <Fab
          active={this.state.activeEat}
          direction="down"
          containerStyle={{ marginLeft: CONSTANTS.app_width / 2 - 150 }}
          style={{ backgroundColor: "#5067FF" }}
          position="topLeft"
          onPress={() => {
            this.setState({ activeEat: !this.state.activeEat });
          }}
        >
          <Icon type="MaterialCommunityIcons" name="silverware-fork-knife" />
          <Button
            style={{ backgroundColor: eatApplesBackgroundColor }}
            disabled={isTammyEatApplesDisabled}
            onPress={this.handleOnPressEatApples}
          >
            <Icon type="MaterialCommunityIcons" name="food-apple" />
          </Button>
          <Button
            style={{ backgroundColor: eatCarrotsBackgroundColor }}
            disabled={isTammyEatCarrotsDisabled}
            onPress={this.handleOnPressEatCarrots}
          >
            <Icon type="MaterialCommunityIcons" name="carrot" />
          </Button>
        </Fab>
        <Fab
          active={this.state.activeSleep}
          direction="down"
          containerStyle={{ marginLeft: CONSTANTS.app_width / 2 - 50 }}
          style={{ backgroundColor: "#5067FF" }}
          position="topLeft"
          onPress={() => {
            this.setState({ activeSleep: !this.state.activeSleep });
          }}
        >
          <Icon type="MaterialCommunityIcons" name="sleep" />
          <Button
            style={{ backgroundColor: sleepBackgroundColor }}
            disabled={isTammySleepDisabled}
            onPress={this.handleOnPressSleep}
          >
            <Icon type="Entypo" name="clock" />
          </Button>
        </Fab>
        <Fab
          active={this.state.activePlay}
          direction="down"
          containerStyle={{ marginLeft: CONSTANTS.app_width / 2 + 50 }}
          style={{ backgroundColor: "#5067FF" }}
          position="topLeft"
          onPress={() => this.setState({ activePlay: !this.state.activePlay })}
        >
          <Icon type="Feather" name="heart" />
          <Button
            style={{ backgroundColor: playBackgroundColor }}
            disabled={isTammyPlayDisabled}
            onPress={this.handleOnPressPlayPets}
          >
            <Icon type="MaterialIcons" name="pets" />
          </Button>
          <Button
            style={{ backgroundColor: playBackgroundColor }}
            disabled={isTammyPlayDisabled}
            onPress={this.handleOnPressPlayWalk}
          >
            <Icon type="Ionicons" name="ios-walk" />
          </Button>
        </Fab>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { displayAnimation: state.displayAnimation };
};

export default connect(mapStateToProps)(DisplayFAB);
