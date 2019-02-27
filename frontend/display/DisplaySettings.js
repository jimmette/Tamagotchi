import React from "react";
import { connect } from "react-redux";
import { View, Text, Button, H1, Form, Input, Item, Label } from "native-base";
import { Switch } from "react-native";
import CONSTANTS from "../Constants";
import { _removeDataLocal } from "../JugeMoiPasRichard";
import { backupTammy } from "../Networking";

class DisplaySettings extends React.Component {
  handleOnPressResetTheApp = () => {
    _removeDataLocal();
    // deleteTammy();
    this.props.dispatch({ type: "HARD_RESET" });
    this.props.dispatch({ type: "CURRENT_PAGE", payload: CONSTANTS.startpage });
  };
  handleOnPressCloseSettings = () => {
    this.props.dispatch({ type: "CURRENT_PAGE", payload: CONSTANTS.homepage });
  };
  handleOnValueChangeOnlineSync = value => {
    this.props.dispatch({ type: "SETTINGS_ONLINE_SYNC", payload: value });
  };
  handleOnValueChangePushNotifications = value => {
    this.props.dispatch({
      type: "SETTINGS_PUSH_NOTIFICATIONS",
      payload: value
    });
  };
  render = () => {
    return (
      <View>
        <H1 style={{ textAlign: "center" }}>Settings</H1>
        <Form>
          <Item last>
            <Input
              placeholder={this.props.tammyName}
              onChangeText={text => {
                this.props.dispatch({
                  type: "SETTINGS_NAME_CHANGE",
                  payload: text
                });
              }}
            />
          </Item>
        </Form>
        <Text>Online Sync </Text>
        <Switch
          onValueChange={this.handleOnValueChangeOnlineSync}
          value={this.props.allowOnlineSync}
        />
        <Text>Push Notifications </Text>
        <Switch
          onValueChange={this.handleOnValueChangePushNotifications}
          value={this.props.allowPushNotifications}
          disabled={!this.props.allowOnlineSync}
        />
        <Button
          full
          style={{ marginTop: 10, backgroundColor: "#FF0000" }}
          onPress={this.handleOnPressResetTheApp}
        >
          <Text>Reset the App</Text>
        </Button>
        <Button
          full
          style={{ marginTop: 10, backgroundColor: "#5067FF" }}
          onPress={this.handleOnPressCloseSettings}
        >
          <Text>Close settings</Text>
        </Button>
      </View>
    );
  };
}

const mapStateToProps = state => {
  return {
    tammyName: state.tammyName,
    allowOnlineSync: state.allowOnlineSync,
    allowPushNotifications: state.allowPushNotifications
  };
};

export default connect(mapStateToProps)(DisplaySettings);
