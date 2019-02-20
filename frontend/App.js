import React from "react";
import { StyleSheet, View } from "react-native";
import SpriteAnimation from "./SpriteAnimation";
import CONSTANTS from "./Constants";
import { Provider } from "react-redux";
import myStore from "./Store";
import { Container } from "native-base";
import gameEngine from "./GameEngine";
import DisplayHeader from "./display/DisplayHeader";
import DisplayFab from "./display/DisplayFab";
import DisplayFooter from "./display/DisplayFooter";
import DisplayStatus from "./display/DisplayStatus";

const styles = StyleSheet.create({
  container: {
    width: CONSTANTS.app_width,
    height: CONSTANTS.app_height,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
    // // backgroundColor: "pink",
    // paddingTop: 75
  },
  actionIconsContainer: {
    // display: "flex",
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    // marginTop: 300
  }
});
class App extends React.Component {
  constructor(props) {
    super(props);
    setInterval(gameEngine, 500);
  }
  render() {
    return (
      <Provider store={myStore}>
        <Container>
          <DisplayHeader />
          <DisplayStatus />
          <View style={styles.container}>
            <SpriteAnimation />
          </View>
          <DisplayFab />
          <DisplayFooter />
        </Container>
      </Provider>
    );
  }
}

export default App;
