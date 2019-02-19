import React from "react";
import ActionIcon from "./ActionIcon";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import CONSTANTES from "./Constantes";
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
  };
  handleOnClickSleep = () => {
    this.props.dispatch({ type: "MAKE_TAMMY_SLEEP" });
  };
  handleOnClickPlay = () => {
    this.props.dispatch({ type: "MAKE_TAMMY_PLAY" });
  };
  render() {
    return (
      <>
        <View style={styles.actionIcon}>
          <ActionIcon title="Eat" onClickAction={this.handleOnClickEat} />
        </View>
        <View style={styles.actionIcon}>
          <ActionIcon title="Sleep" onClickAction={this.handleOnClickSleep} />
        </View>
        <View style={styles.actionIcon}>
          <ActionIcon title="Play" onClickAction={this.handleOnClickPlay} />
        </View>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    statusPointsEat: state.statusPointsEat,
    statusPointsSleep: state.statusPointsSleep,
    statusPointsHappiness: state.statusPointsHappiness
  };
};

export default connect(mapStateToProps)(ActionIconContainer);
