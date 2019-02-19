import React from "react";
import { StyleSheet } from "react-native";
import SpriteAnimation from "./SpriteAnimation";
import CONSTANTES from "./Constantes";
import StatusBarContainer from "./StatusBarContainer";
import ActionIconContainer from "./ActionIconContainer";
import { Provider } from "react-redux";
import myStore from "./Store";
import { Container, View } from "native-base";
import gameEngine from "./GameEngine";
import OptionsFooter from "./OptionsFooter";

const styles = StyleSheet.create({
  container: {
    width: CONSTANTES.app_width,
    height: CONSTANTES.app_height,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "pink",
    paddingTop: 75
  },
  actionIconsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 300
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    setInterval(gameEngine, 1000);
  }
  render() {
    return (
      <Provider store={myStore}>
        <View style={styles.container}>
          <View>
            <StatusBarContainer />
          </View>
          <View>
            <SpriteAnimation />
          </View>
          <View style={styles.actionIconsContainer}>
            <ActionIconContainer />
          </View>
        </View>
      </Provider>
    );
  }
}

export default App;
