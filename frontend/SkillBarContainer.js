import React from "react";
import { View, StyleSheet, Text } from "react-native";
import CONSTANTES from "./Constantes";
import SkillBar from "./SkillBar";

const styles = StyleSheet.create({
  skillbars: {
    marginBottom: 10,
    width: CONSTANTES.skillbar_width,
    borderWidth: CONSTANTES.skillbar_border_width,
    borderRadius: CONSTANTES.skillbar_border_radius
  }
});

export default class SkillBarContainer extends React.Component {
  render() {
    return (
      <>
        <View style={styles.skillbars}>
          <SkillBar title="Hunger" color="yellow" />
        </View>
        <View style={styles.skillbars}>
          <SkillBar title="Sleep" color="magenta" />
        </View>
        <View style={styles.skillbars}>
          <SkillBar title="Play" color="orange" />
        </View>
      </>
    );
  }
}
