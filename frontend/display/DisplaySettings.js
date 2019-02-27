import React from "react";
import { connect } from "react-redux";
import { View, Text, Button, H1, Form, Input, Item, Label } from "native-base";
import { Switch, StyleSheet } from "react-native";
import CONSTANTS from "../Constants";
import { _removeDataLocal } from "../JugeMoiPasRichard";
import { backupTammy } from "../Networking";

const styles = StyleSheet.create({
  toggle_container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  footer: { marginTop: 100 }
});

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
  handleOnValueChangeNotifications = value => {
    // this.props.dispatch({
    //   type: "SETTINGS_NOTIFICATIONS",
    //   payload: value
    // });
  };
  render = () => {
    return (
      <View>
        <H1 style={{ textAlign: "center", marginBottom: 50 }}>Settings</H1>
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
        <View style={styles.toggle_container}>
          <Text>Online Sync </Text>
          <Switch
            onValueChange={this.handleOnValueChangeOnlineSync}
            value={this.props.allowOnlineSync}
          />
        </View>
        {/* <View style={styles.toggle_container}>
          <Text>Notifications </Text>
          <Switch
            onValueChange={this.handleOnValueChangeNotifications}
            value={this.props.allowNotifications}
            disabled={!this.props.allowOnlineSync}
          />
        </View> */}
        <Button
          full
          style={{
            marginTop: CONSTANTS.app_height - 405,
            backgroundColor: "#FF0000"
          }}
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
    allowNotifications: state.allowNotifications
  };
};

export default connect(mapStateToProps)(DisplaySettings);
