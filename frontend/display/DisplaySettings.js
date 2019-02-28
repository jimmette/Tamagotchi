import React from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  Button,
  H1,
  Form,
  Input,
  Item,
  Label,
  List,
  ListItem,
  Left,
  Right
} from "native-base";
import { Switch, StyleSheet } from "react-native";
import CONSTANTS from "../Constants";
import { _removeDataLocal } from "../JugeMoiPasRichard";
import { backupTammy } from "../Networking";

const styles = StyleSheet.create({
  toggle_container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
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
    this.props.dispatch({
      type: "CURRENT_PAGE",
      page: CONSTANTS.startpage,
      title: this.props.tammyName
    });
  };
  handleOnPressCloseSettings = () => {
    this.props.dispatch({
      type: "CURRENT_PAGE",
      page: CONSTANTS.homepage,
      title: this.props.tammyName
    });
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
        <List>
          <ListItem>
            <Left>
              <Input
                placeholder={this.props.tammyName}
                onChangeText={text => {
                  this.props.dispatch({
                    type: "SETTINGS_NAME_CHANGE",
                    payload: text
                  });
                }}
              />
            </Left>
            <Right />
          </ListItem>
          <ListItem>
            <Left>
              <Text>Online Sync </Text>
            </Left>
            <Right>
              <Switch
                onValueChange={this.handleOnValueChangeOnlineSync}
                value={this.props.allowOnlineSync}
              />
            </Right>
          </ListItem>
        </List>
        <Button
          full
          style={{
            marginTop: CONSTANTS.app_height - 500,
            backgroundColor: "#FF0000"
          }}
          onPress={this.handleOnPressResetTheApp}
        >
          <Text>Reset the App</Text>
        </Button>
        <Button
          full
          style={{ marginTop: 1, backgroundColor: "#5067FF" }}
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
