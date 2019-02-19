import React from "react";
import { Button, View } from "react-native";
import CONSTANTS from "./Constants";
import { Container } from "native-base";

// styleDisabled={styles.disabled}
//       disabled={this.props.disabled}

class ActionIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onPress = () => {
    console.log("pressed", this.props.title);
    this.props.onClickAction();
  };
  render() {
    return (
      <View>
        <Button
          title={this.props.title}
          onPress={this.onPress}
          styleDisabled={{ backgroundColor: "gray" }}
          disabled={this.props.disabled}
        />
      </View>
    );
  }
}

export default ActionIcon;
