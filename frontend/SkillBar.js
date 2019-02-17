import React from "react";
import { View, StyleSheet, Text } from "react-native";
import CONSTANTES from "./Constantes";

export default class SkillBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { skillPoints: 100 };
    this.styles = {
      view: {
        backgroundColor: this.props.color,
        borderRadius: CONSTANTES.skillbar_border_radius,
        width:
          ((CONSTANTES.skillbar_width - 2 * CONSTANTES.skillbar_border_width) /
            100) *
          this.state.skillPoints
      },
      text: { marginLeft: 10 }
    };
  }
  render() {
    return (
      <View style={this.styles.view}>
        <Text style={this.styles.text}>{this.props.title}</Text>
      </View>
    );
  }
}
