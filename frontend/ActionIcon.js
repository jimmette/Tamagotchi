import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import CONSTANTES from "./Constantes";

export default class ActionIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onPress = () => {
    console.log("pressed", this.props.title);
  };
  render() {
    return (
      <View>
        <Button title={this.props.title} onPress={this.onPress} />
      </View>
    );
  }
}
