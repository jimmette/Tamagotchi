import React from "react";
import ActionIcon from "./ActionIcon";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import CONSTANTES from "./Constantes";

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
  render() {
    return (
      <>
        <View style={styles.actionIcon}>
          <ActionIcon title="Eat" onClickAction={this.handleOnClickEat} />
        </View>
        <View style={styles.actionIcon}>
          <ActionIcon title="Sleep" />
        </View>
        <View style={styles.actionIcon}>
          <ActionIcon title="Play" />
        </View>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    skillPointsEat: state.skillPointsEat,
    skillPointsSleep: state.skillPointsSleep,
    skillPointsPlay: state.skillPointsPlay
  };
};

export default connect(mapStateToProps)(ActionIconContainer);
