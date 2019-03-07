import React from "react";
import { Provider } from "react-redux";
import myStore from "./Store";
import AppController from "./AppController";
import AppNavigator from "./AppNavigator";

class App extends React.Component {
  render() {
    return (
      <Provider store={myStore}>
        <AppNavigator>
          <AppController />
        </AppNavigator>
      </Provider>
    );
  }
}

export default App;
