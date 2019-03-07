import React from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import CONSTANTS from "../Constants";
import { Container, Content, Body } from "native-base";
import { Image } from "react-native";

class DisplayIntro extends React.Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate("Home");
    }, 5000);
  }

  render() {
    return (
      <Container>
        <Content>
          <Body style={styles.container}>
            <Image
              style={{ width: 300 }}
              source={require("../assets/images/title.png")}
            />
            <Image
              style={{ width: 300 }}
              source={require("../assets/images/dance.gif")}
            />
          </Body>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: CONSTANTS.app_width,
    height: CONSTANTS.app_height,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CCC",
    overflow: "hidden"
  }
});

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(DisplayIntro);
