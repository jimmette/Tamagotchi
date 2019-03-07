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
import moment from "moment";

class DisplayStatistics extends React.Component {
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
          <H1 style={styles.title}>STATISTICS</H1>
          <List style={styles.list}>
            <ListItem>
              <Text style={styles.text}>
                {this.props.tammyName} was born on{" "}
                {moment(this.props.tammyWasBornOn).format("MMMM Do YYYY")}
              </Text>
            </ListItem>
            <ListItem>
              <Text style={styles.text}>
                {this.props.tammyName} is{" "}
                {moment().diff(moment(this.props.tammyWasBornOn), "days")} days{" "}
                old
              </Text>
            </ListItem>
          </List>
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    tammyName: state.tammyName,
    tammyWasBornOn: state.tammyWasBornOn
  };
};

export default connect(mapStateToProps)(DisplayStatistics);
