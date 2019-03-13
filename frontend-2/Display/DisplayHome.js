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
import { StyleSheet, View } from "react-native";
import CONSTANTS from "../Constants";
import DisplayFooter from "./DisplayFooter";
import DisplaySettings from "./DisplaySettings";
import DisplayStatistics from "./DisplayStatistics";
import DisplayInventory from "./DisplayInventory";
import DisplayStore from "./DisplayStore";
import DisplayLevelBars from "./DisplayLevelBars";
import DisplayFAB from "./DisplayFAB";
import DisplaySprite from "./DisplaySprite";
import DisplayModal from "./DisplayModal";

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
            <DisplayModal />
            <View style={styles.container_small}>
              <DisplayLevelBars />
              <DisplayFAB />
            </View>
            <DisplaySprite />
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
  },
  container_small: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  }
});

const mapStateToProps = state => {
  return {
    tammyName: state.tammyName
  };
};

export default connect(mapStateToProps)(DisplayHome);
