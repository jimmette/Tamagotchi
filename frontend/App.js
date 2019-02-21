import React from "react";
import { Provider } from "react-redux";
import myStore from "./Store";
import gameEngine from "./GameEngine";
import Navigator from "./display/Navigator";

class App extends React.Component {
  constructor(props) {
    super(props);
    setInterval(gameEngine, 500);
  }
  render() {
    return (
      <Provider store={myStore}>
        <Navigator />
      </Provider>
    );
  }
}

export default App;
