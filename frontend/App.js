import React from "react";
import { View, StyleSheet } from "react-native";
import SpriteAnimation from "./SpriteAnimation";
import CONSTANTES from "./Constantes";
import SkillBarContainer from "./SkillBarContainer";
import ActionIconContainer from "./ActionIconContainer";

const styles = StyleSheet.create({
  container: {
    width: CONSTANTES.app_width,
    height: CONSTANTES.app_height,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "pink",
    paddingTop: 75
  },
  actionIconsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 300
  }
});

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <SkillBarContainer />
        </View>
        <View>
          <SpriteAnimation />
        </View>
        <View style={styles.actionIconsContainer}>
          <ActionIconContainer />
        </View>
      </View>
    );
  }
}
