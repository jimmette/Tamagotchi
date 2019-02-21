import React, { Component } from "react";
import { Platform, View, Text } from "react-native";
import { Constants, Location, Permissions } from "expo";
import moment from "moment";

export default class LocationClass extends Component {
  state = {
    location: null,
    prevLocation: null,
    errorMessage: null,
    distance: 0,
    startTime: moment()
  };

  toRadians = num => {
    return (num * Math.PI) / 180;
  };

  calculateDistanceWalked = () => {
    // console.log("in calculateDistanceWalked");
    // if (this.state.location !== null) {
    //   const R = 6371e3; // metres
    //   let lat1 =
    //     this.state.prevLocation === null
    //       ? this.state.location.coords.latitude
    //       : this.state.prevLocation.coords.latitude;
    //   let lat2 = this.state.location.coords.latitude;
    //   let lon1 =
    //     this.state.prevLocation === null
    //       ? this.state.location.coords.longitude
    //       : this.state.prevLocation.coords.longitude;
    //   let lon2 = this.state.location.coords.longitude;
    //   console.log(lat1, lat2, lon1, lon2);
    //   let q = this.toRadians(lat1);
    //   let w = this.toRadians(lat2);
    //   let e = this.toRadians(lat2 - lat1);
    //   let r = this.toRadians(lon2 - lon1);
    //   let a =
    //     Math.sin(e / 2) * Math.sin(e / 2) +
    //     Math.cos(q) * Math.cos(w) * Math.sin(r / 2) * Math.sin(r / 2);
    //   let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    //   let d = R * c;
    //   console.log("distance", this.state.distance);
    //   this.setState({
    //     prevLocation: this.state.location,
    //     distance: this.state.distance + d
    //   });
    // }
  };

  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }

    setInterval(this.getUpdate, 1000);
  }

  getUpdate = () => {
    console.log("in getUpdate");
    this.getUpdateLocationAsync();
    this.calculateDistanceWalked();
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    this.getUpdate();
  };

  getUpdateLocationAsync = async () => {
    console.log("in getUpdateLocationAsync");
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest
    });

    this.setState({ location });
  };

  render() {
    return (
      <View>
        <Text>Distance: {this.state.distance}</Text>
        <Text>Time: {moment() - this.state.startTime}</Text>
      </View>
    );
  }
}
