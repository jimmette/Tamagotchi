import React from "react";
import { View, StyleSheet, Text } from "react-native";
import CONSTANTES from "./Constantes";

class SkillBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createStyles = () => {
    return {
      view: {
        backgroundColor: this.props.color,
        borderRadius: CONSTANTES.skillbar_border_radius,
        width:
          ((CONSTANTES.skillbar_width - 2 * CONSTANTES.skillbar_border_width) /
            100) *
          this.props.points
      },
      text: { marginLeft: 10 }
    };
  };

  render() {
    let styles = this.createStyles();
    return (
      <View style={styles.view}>
        <Text style={styles.text}>{this.props.title}</Text>
      </View>
    );
  }
}

export default SkillBar;
