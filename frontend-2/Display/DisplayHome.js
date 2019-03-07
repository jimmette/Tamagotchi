import React from "react";
import { connect } from "react-redux";
import {
  Container,
  Content,
  Body,
  Header,
  Left,
  Right,
  Title,
  Subtitle
} from "native-base";
import { StyleSheet } from "react-native";
import CONSTANTS from "../Constants";
import DisplayFooter from "./DisplayFooter";
import { Image } from "react-native";
import DisplaySettings from "./DisplaySettings";
import DisplayStatistics from "./DisplayStatistics";

class DisplayHome extends React.Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>{this.props.tammyName}</Title>
            <Subtitle>your Tamagotchi</Subtitle>
          </Body>
          <Right />
        </Header>
        <Content>
          <Body style={styles.container}>
            {this.props.displayFooterOption === "SETTINGS" ? (
              <DisplaySettings />
            ) : null}
            {this.props.displayFooterOption === "STATISTICS" ? (
              <DisplayStatistics />
            ) : null}
            <Image source={require("../assets/images/idle.gif")} />
          </Body>
        </Content>
        <DisplayFooter />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: CONSTANTS.app_width,
    height:
      CONSTANTS.app_height - CONSTANTS.footer_hight - CONSTANTS.header_hight,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    overflow: "hidden",
    zIndex: 0
  }
});

const mapStateToProps = state => {
  return {
    displayFooterOption: state.displayFooterOption,
    tammyName: state.tammyName
  };
};

export default connect(mapStateToProps)(DisplayHome);
