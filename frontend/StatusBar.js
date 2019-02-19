import React from "react";
import { Text } from "react-native";
import CONSTANTES from "./Constantes";
import { Container, View } from "native-base";

class StatusBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createStyles = () => {
    return {
      view: {
        backgroundColor: this.props.color,
        borderRadius: CONSTANTES.statusbar_border_radius,
        width:
          ((CONSTANTES.statusbar_width -
            2 * CONSTANTES.statusbar_border_width) /
            CONSTANTES.eat_max_point) *
          this.props.points
      },
      text: { marginLeft: 10 }
    };
  };

  render() {
    let styles = this.createStyles();
    return (
      <View style={styles.view}>
        <View style={styles.text}>
          <Text>{this.props.title}</Text>
        </View>
      </View>
    );
  }
}

export default StatusBar;
