import React from "react";
import { Button, View, Fab, Icon } from "native-base";
import { connect } from "react-redux";
import CONSTANTS from "../Constants";

class DisplayFab extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeEat: false, activeSleep: false, activePlay: false };
  }

  handleOnPressEat = () => {
    this.setState({ activeEat: false });
    this.props.dispatch({ type: "MAKE_TAMMY_EAT" });

    setTimeout(() => {
      this.props.dispatch({ type: "MAKE_TAMMY_STOP_EAT" });
    }, CONSTANTS.eat_timer);
  };
  handleOnPressSleep = () => {
    this.setState({ activeSleep: false });
    this.props.dispatch({ type: "MAKE_TAMMY_YAWN" });
    setTimeout(() => {
      this.props.dispatch({ type: "MAKE_TAMMY_SLEEP" });
      setTimeout(() => {
        this.props.dispatch({ type: "MAKE_TAMMY_STOP_SLEEP" });
      }, CONSTANTS.sleep_timer);
    }, CONSTANTS.yawn_timer);
  };
  handleOnPressPlay = () => {
    this.setState({ activePlay: false });
    this.props.dispatch({ type: "MAKE_TAMMY_PLAY" });
    setTimeout(() => {
      this.props.dispatch({ type: "MAKE_TAMMY_STOP_PLAY" });
    }, CONSTANTS.play_timer);
  };

  isTammyEatDisabled = () => {
    if (
      this.props.isTammyEating === true ||
      this.props.isTammySleeping === true
    ) {
      return true;
    }
    return false;
  };
  isTammySleepDisabled = () => {
    if (
      this.props.isTammyEating === true ||
      this.props.isTammySleeping === true
    ) {
      return true;
    }
    return false;
  };
  isTammyPlayDisabled = () => {
    if (
      this.props.isTammyEating === true ||
      this.props.isTammySleeping === true
    ) {
      return true;
    }
    return false;
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
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
              style={{ backgroundColor: "#5067FF" }}
              disabled={this.isTammyEatDisabled()}
              onPress={this.handleOnPressEat}
            >
              <Icon type="MaterialCommunityIcons" name="food-apple" />
            </Button>
          ) : (
            undefined
          )}
          {this.state.activeEat === true ? (
            <Button
              style={{ backgroundColor: "#5067FF" }}
              disabled={this.isTammyEatDisabled()}
              onPress={this.handleOnPressEat}
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
          onPress={() =>
            this.setState({ activeSleep: !this.state.activeSleep })
          }
        >
          <Icon type="MaterialCommunityIcons" name="sleep" />
          {this.state.activeSleep === true ? (
            <Button
              style={{ backgroundColor: "#5067FF" }}
              disabled={this.isTammySleepDisabled()}
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
              style={{ backgroundColor: "#5067FF" }}
              disabled={this.isTammyPlayDisabled()}
              onPress={this.handleOnPressPlay}
            >
              <Icon type="MaterialIcons" name="pets" />
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
    isTammyPlaying: state.isTammyPlaying
  };
};

export default connect(mapStateToProps)(DisplayFab);
