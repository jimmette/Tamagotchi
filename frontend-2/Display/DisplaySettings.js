import React from "react";
import {
  Text,
  Container,
  Button,
  H1,
  List,
  ListItem,
  Left,
  Right
} from "native-base";
import { Image, Switch } from "react-native";
import { connect } from "react-redux";
import styles from "./Style";

class DisplaySettings extends React.Component {
  onPressExit = () => {
    this.props.dispatch({
      type: "SET_FOOTER_DISPLAY",
      payload: { option: "NONE" }
    });
  };
  render() {
    return (
      <>
        <Container style={styles.xbutton}>
          <Button transparent dark onPress={this.onPressExit}>
            <Image source={require("../assets/images/xbutton.png")} />
          </Button>
        </Container>
        <Container style={styles.container}>
          <H1 style={styles.title}>SETTINGS</H1>
          <List style={styles.list}>
            <ListItem>
              <Text style={styles.text}>{this.props.tammyName}</Text>
            </ListItem>
            <ListItem>
              <Left>
                <Text style={styles.text}>Online Sync</Text>
              </Left>
              <Right>
                <Switch />
              </Right>
            </ListItem>
          </List>
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => {
  return { tammyName: state.tammyName };
};

export default connect(mapStateToProps)(DisplaySettings);
