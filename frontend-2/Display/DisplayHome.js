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
import {
  StyleSheet,
  Modal,
  Text,
  TouchableHighlight,
  View,
  Alert
} from "react-native";
import CONSTANTS from "../Constants";
import DisplayFooter from "./DisplayFooter";
import { Image } from "react-native";
import DisplaySettings from "./DisplaySettings";
import DisplayStatistics from "./DisplayStatistics";
import DisplayInventory from "./DisplayInventory";
import DisplayStore from "./DisplayStore";
import DisplayLevelBars from "./DisplayLevelBars";

class DisplayHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalVisible: false };
  }
  setModalVisible = state => {
    this.setState({ modalVisible: state });
  };

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
            <DisplaySettings
              isVisible={this.props.displayFooterOption === "SETTINGS"}
            />
            <DisplayStatistics
              isVisible={this.props.displayFooterOption === "STATISTICS"}
            />
            <DisplayInventory
              isVisible={this.props.displayFooterOption === "INVENTORY"}
            />
            <DisplayStore
              isVisible={this.props.displayFooterOption === "STORE"}
            />
            <DisplayLevelBars />
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
    justifyContent: "space-between",
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
