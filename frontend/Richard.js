import React from "react";
import { AsyncStorage } from "react-native";
import { View } from "native-base";
import { connect } from "react-redux";
import moment from "moment";
import CONSTANTS from "./Constants";
import { NORMAL_RATES } from "./Constants";

class JugeMoiPasRichard extends React.Component {
  componentDidMount() {
    this._retrieveData();
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("State");
      if (value !== null) {
        let state = JSON.parse(value);
        let saveTime = state.saveTime;
        let diffTime = moment().diff(saveTime, "seconds");
        console.log("Time since last save", diffTime);
        console.log(state.tammyWasBornOn);
        let data = {
          tammyName: state.tammyName,
          tammyWasBornOn: state.tammyWasBornOn,
          satietyLevel:
            state.satietyLevel - diffTime * NORMAL_RATES.satietyLossRate,
          energyLevel:
            state.energyLevel - diffTime * NORMAL_RATES.energyLossRate,
          joyLevel: state.joyLevel - diffTime * NORMAL_RATES.joyLossRate,
          howMuchHasTammyWalked: state.howMuchHasTammyWalked
        };
        this.props.dispatch({ type: "RESTORE_DATA", payload: data });
      }
    } catch (error) {
      // Error retrieving data
      console.log("error retrieving data", error);
    }
  };
  render() {
    // console.log(this.props.store);
    return <View />;
  }
}

const mapStateToProps = state => {
  return { store: state };
};

export default connect(mapStateToProps)(JugeMoiPasRichard);
