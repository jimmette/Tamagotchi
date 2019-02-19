import React from "react";
import { Button, View } from "react-native";
import CONSTANTES from "./Constantes";
import { Container } from "native-base";

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
        <Button title={this.props.title} onPress={this.onPress} />
      </View>
    );
  }
}

export default ActionIcon;
