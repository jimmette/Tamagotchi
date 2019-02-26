import React from "react";
import { Provider } from "react-redux";
import myStore from "./Store";
import AppControler from "./AppControler";
class App extends React.Component {
  render() {
    return (
      <Provider store={myStore}>
        <AppControler />
      </Provider>
    );
  }
}

export default App;
