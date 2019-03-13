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
  Right,
  Form,
  Item,
  Label,
  Input
} from "native-base";
import { Image, View, Switch } from "react-native";
import { connect } from "react-redux";
import Modal from "react-native-modal";
import styles from "./Style";

class DisplaySettings extends React.Component {
  onPressExit = () => {
    this.props.dispatch({
      type: "SET_FOOTER_DISPLAY",
      payload: { option: "NONE" }
    });
  };
  onChangeName = text => {
    this.props.dispatch({ type: "SET_NAME", payload: { name: text } });
  };
  render() {
    return (
      <Modal isVisible={this.props.isVisible} hasBackdrop={false}>
        <View style={styles.xbutton}>
          <Button transparent dark onPress={this.onPressExit}>
            <Image source={require("../assets/images/xbutton.png")} />
          </Button>
        </View>
        <Container style={styles.container}>
          <H1 style={styles.title}>SETTINGS</H1>
          <Form style={{ width: "100%" }}>
            <Item>
              <Input
                placeholder={this.props.tammyName}
                onChangeText={this.onChangeName}
              />
            </Item>
          </Form>
        </Container>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return { tammyName: state.tammyName };
};

export default connect(mapStateToProps)(DisplaySettings);
