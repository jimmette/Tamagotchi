import React from "react";
import ActionIcon from "./ActionIcon";
import { View, StyleSheet } from "react-native";
import CONSTANTES from "./Constantes";

const styles = StyleSheet.create({
  actionIcon: {
    width: 75,
    height: 75,
    borderWidth: 2,
    margin: 10
  }
});

export default class ActionIconContainer extends React.Component {
  render() {
    return (
      <>
        <View style={styles.actionIcon}>
          <ActionIcon title="Eat" />
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
