import { AsyncStorage } from "react-native";
import myStore from "./Store";
import { NORMAL_RATES } from "./Constants";
import CONSTANTS from "./Constants";
import moment from "moment";
import { isTammyDoingSomething } from "./GameEngine";

let _retrieveDataLocal = async () => {
  try {
    const data = await AsyncStorage.getItem("State");
    if (data !== null) {
      let state = JSON.parse(data);
      let saveTime = state.saveTime;
      let diffTime = moment().diff(moment(saveTime), "seconds");
      state.satietyLevel =
        state.satietyLevel + NORMAL_RATES.satietyLossRate * diffTime;
      state.energyLevel =
        state.energyLevel + NORMAL_RATES.energyLossRate * diffTime;
      state.joyLevel = state.joyLevel + NORMAL_RATES.joyLossRate * diffTime;
      console.log("Time since last save", diffTime);
      myStore.dispatch({ type: "RESTORE_DATA", payload: state });
    }
  } catch (error) {
    // Error retrieving data
    console.log("error retrieving data", error);
  }
};
let _storeDataLocal = async () => {
  let state = JSON.parse(JSON.stringify(myStore.getState()));
  state.saveTime = new Date();
  state.currentPage = CONSTANTS.homepage;
  state.displayMessage = "";
  let data = JSON.stringify(state);
  try {
    await AsyncStorage.setItem("State", data);
  } catch (error) {
    // Error saving data
    console.log("error saving data");
  }
};
let _removeDataLocal = async () => {
  try {
    await AsyncStorage.removeItem("State");
  } catch (error) {
    // Error retrieving data
    console.log("error retrieving data", error);
  }
};

export { _removeDataLocal, _retrieveDataLocal, _storeDataLocal };
