import React from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import CONSTANTS from "../Constants";
import { Container, Content, Body } from "native-base";
import { Image } from "react-native";

class DisplayIntro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.props.navigation.navigate("Home");
    }, CONSTANTS.intro_timer);
  }
  componentWillUnmount() {
    if (this.timeout !== undefined) {
      clearTimeout(this.timeout);
    }
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
    backgroundColor: "#666",
    overflow: "hidden"
  }
});

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(DisplayIntro);
