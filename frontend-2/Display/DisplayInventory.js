import React from "react";
import {
  Text,
  Container,
  Button,
  H1,
  H2,
  List,
  ListItem,
  Left,
  Right
} from "native-base";
import { Image, View, Switch } from "react-native";
import { connect } from "react-redux";
import Modal from "react-native-modal";
import styles from "./Style";

class DisplayInventory extends React.Component {
  onPressExit = () => {
    this.props.dispatch({
      type: "SET_FOOTER_DISPLAY",
      payload: { option: "NONE" }
    });
  };
  render() {
    return (
      <Modal isVisible={this.props.isVisible} hasBackdrop={false}>
        <View style={styles.xbutton}>
          <Button transparent dark onPress={this.onPressExit}>
            <Image source={require("../assets/images/xbutton.png")} />
          </Button>
        </View>
        <View style={styles.container}>
          <H1 style={styles.title}>INVENTORY</H1>
          <H2 style={styles.subtitle}>COMING SOON</H2>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(DisplayInventory);
