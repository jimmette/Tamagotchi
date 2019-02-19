import React from "react";
import { Text } from "react-native";
import CONSTANTS from "./Constants";
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
        borderRadius: CONSTANTS.statusbar_border_radius,
        width:
          ((CONSTANTS.statusbar_width - 2 * CONSTANTS.statusbar_border_width) /
            CONSTANTS.eat_max_point) *
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
