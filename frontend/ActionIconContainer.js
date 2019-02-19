import React from "react";
import ActionIcon from "./ActionIcon";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import CONSTANTS from "./Constants";
import { Container } from "native-base";

const styles = StyleSheet.create({
  actionIcon: {
    width: 75,
    height: 75,
    borderWidth: 2,
    margin: 10
  }
});

class ActionIconContainer extends React.Component {
  handleOnClickEat = () => {
    this.props.dispatch({ type: "MAKE_TAMMY_EAT" });

    setTimeout(() => {
      this.props.dispatch({ type: "MAKE_TAMMY_STOP_EAT" });
    }, CONSTANTS.eat_timer);
  };
  handleOnClickSleep = () => {
    this.props.dispatch({ type: "MAKE_TAMMY_YAWN" });
    setTimeout(() => {
      this.props.dispatch({ type: "MAKE_TAMMY_SLEEP" });
      setTimeout(() => {
        this.props.dispatch({ type: "MAKE_TAMMY_STOP_SLEEP" });
      }, CONSTANTS.sleep_timer);
    }, CONSTANTS.yawn_timer);
  };
  handleOnClickPlay = () => {
    this.props.dispatch({ type: "MAKE_TAMMY_PLAY" });
  };

  isTammyEatDisabled = () => {
    if (
      this.props.doesTammyEat === true ||
      this.props.doesTammySleep === true
    ) {
      return true;
    }
    return false;
  };
  isTammySleepDisabled = () => {
    if (
      this.props.doesTammyEat === true ||
      this.props.doesTammySleep === true
    ) {
      return true;
    }
    return false;
  };
  isTammyPlayDisabled = () => {
    if (
      this.props.doesTammyEat === true ||
      this.props.doesTammySleep === true
    ) {
      return true;
    }
    return false;
  };

  render() {
    return (
      <>
        <View style={styles.actionIcon}>
          <ActionIcon
            title="Eat"
            onClickAction={this.handleOnClickEat}
            disabled={this.isTammyEatDisabled()}
          />
        </View>
        <View style={styles.actionIcon}>
          <ActionIcon
            title="Sleep"
            onClickAction={this.handleOnClickSleep}
            disabled={this.isTammySleepDisabled()}
          />
        </View>
        <View style={styles.actionIcon}>
          <ActionIcon
            title="Play"
            onClickAction={this.handleOnClickPlay}
            disabled={this.isTammyPlayDisabled()}
          />
        </View>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    statusPointsEat: state.statusPointsEat,
    statusPointsSleep: state.statusPointsSleep,
    statusPointsHappiness: state.statusPointsHappiness,
    doesTammyEat: state.doesTammyEat,
    doesTammySleep: state.doesTammySleep,
    doesTammyPlay: state.doesTammyPlay
  };
};

export default connect(mapStateToProps)(ActionIconContainer);
