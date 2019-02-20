import React from "react";
import { Provider } from "react-redux";
import { Container } from "native-base";
import SpriteAnimation from "./SpriteAnimation";
import myStore from "./Store";
import gameEngine from "./GameEngine";
import DisplayHeader from "./display/DisplayHeader";
import DisplayFab from "./display/DisplayFab";
import DisplayFooter from "./display/DisplayFooter";
import DisplayStatus from "./display/DisplayStatus";

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
          <SpriteAnimation />
          <DisplayFab />
          <DisplayFooter />
        </Container>
      </Provider>
    );
  }
}

export default App;
