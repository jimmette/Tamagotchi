import React from "react";
import { Image, View } from "react-native";
import { connect } from "react-redux";
import Modal from "react-native-modal";
import { Text, Button, H1, List, ListItem, Left, Right, H2 } from "native-base";
import styles from "./Style";

class DisplayStore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
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
          <H1 style={styles.title}>STORE</H1>
          <H2 style={styles.subtitle}>COMING SOON</H2>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(DisplayStore);
