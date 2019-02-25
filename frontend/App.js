import { AsyncStorage } from "react-native";
import React from "react";
import { Provider } from "react-redux";
import myStore from "./Store";
import gameEngine from "./GameEngine";
import Navigator from "./display/Navigator";
import JugeMoiPasRichard from "./Richard";
import CONSTANTS from "./Constants";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.intervalId = setInterval(gameEngine, CONSTANTS.game_engine_timer);
  }

  componentDidMount() {
    // getCurrentState(state);
    // const points = getCurrentPoints();
    // store.dispatch({});
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <Provider store={myStore}>
        {/* <JugeMoiPasRichard /> */}
        <Navigator />
      </Provider>
    );
  }
}

export default App;
