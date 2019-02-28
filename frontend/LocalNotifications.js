import React, { Component } from "react";
import { TextInput, View, Keyboard } from "react-native";
import { Constants, Notifications, Permissions } from "expo";
import moment from "moment";

export default class LocalNotifications extends Component {
  onSubmit = () => {
    let dice = Math.floor(Math.random() * 4);
    let body = "";
    let title = this.props.tammyName + " says:";

    switch (dice) {
      case 0:
        body = "I miss you!";
        break;
      case 1:
        body = "Come play with me!";
        break;
      case 2:
        body = "I'm hungry!";
        break;
      case 3:
        body = "Can we go for a walk?";
        break;
      default:
        break;
    }

    const localNotification = {
      title: title,
      body: body
    };

    let wantedTime = moment()
      .startOf("day")
      .add(17, "hours");
    let diff = moment(wantedTime).diff(moment(), "milliseconds");
    let diffPlus = moment(wantedTime)
      .add(24, "hours")
      .diff(moment(), "milliseconds");
    let timer = diff > 0 ? diff : diffPlus;

    const schedulingOptions = {
      time: new Date().getTime() + timer
    };

    // Notifications show only when app is not active.
    // (ie. another app being used or device's screen is locked)
    Notifications.scheduleLocalNotificationAsync(
      localNotification,
      schedulingOptions
    );
  };

  handleNotification() {
    console.warn("ok! got your notif");
  }

  async componentDidMount() {
    // We need to ask for Notification permissions for ios devices
    let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (Constants.isDevice && result.status === "granted") {
      console.log("Notification permissions granted.");
      this.onSubmit();
    }

    // If we want to do something with the notification when the app
    // is active, we need to listen to notification events and
    // handle them in a callback
    Notifications.addListener(this.handleNotification);
  }

  render() {
    return (
      <View />
      // <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
      //   <TextInput onSubmitEditing={this.onSubmit} placeholder={"time in ms"} />
      // </View>
    );
  }
}
