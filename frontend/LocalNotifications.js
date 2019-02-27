import React, { Component } from "react";
import { TextInput, View, Keyboard } from "react-native";
import { Constants, Notifications, Permissions } from "expo";
import { connect } from "react-redux";
import moment from "moment";

class LocalNotifications extends Component {
  setNotificationDetails = () => {
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
    let end = new Date(new Date().setHours(17, 0, 0, 0)).getMilliseconds();
    let start = new Date().getMilliseconds();
    let diff = end - start;
    console.log("wToday", diff);
    const schedulingOptions = {
      time: diff
    };

    // Notifications show only when app is not active.
    // (ie. another app being used or device's screen is locked)
    Notifications.scheduleLocalNotificationAsync(
      localNotification,
      schedulingOptions
    );
  };

  handleNotification() {
    console.warn("I love you");
  }

  async componentDidMount() {
    // We need to ask for Notification permissions for ios devices
    let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    console.log("result.status", result.status, Constants.isDevice);
    if (Constants.isDevice && result.status === "granted") {
      console.log("Notification permissions granted.");
      this.setNotificationDetails();
    }

    // If we want to do something with the notification when the app
    // is active, we need to listen to notification events and
    // handle them in a callback
    Notifications.addListener(this.handleNotification);
  }

  componentWillUnmount() {}

  render() {
    return <View />;
  }
}

const mapStateToProps = state => {
  return {
    tammyName: state.tammyName,
    satietyLevel: state.satietyLevel,
    energyLevel: state.energyLevel,
    joyLevel: state.joyLevel
  };
};

export default connect(mapStateToProps)(LocalNotifications);
