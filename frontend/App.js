import React from "react";
import { View, StyleSheet } from "react-native";
import SpriteAnimation from "./SpriteAnimation";
import CONSTANTES from "./Constantes";
import SkillBarContainer from "./SkillBarContainer";
import ActionIconContainer from "./ActionIconContainer";
import { Provider } from "react-redux";
import myStore from "./Store";
import { Container } from "native-base";

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
  }
  render() {
    return (
      <Provider store={myStore}>
        <View style={styles.container}>
          <View>
            <SkillBarContainer />
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
