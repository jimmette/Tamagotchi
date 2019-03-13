import { createStore } from "redux";
import reducer from "./Reducer";

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const myStore = createStore(reducer, composeEnhancers);

export default myStore;
