import React from "react";
import { connect } from "react-redux";
import { View, Text, Button, H1, Form, Input, Item, Label } from "native-base";

class DisplaySettings extends React.Component {
  handleOnPressResetTheApp = () => {
    this.props.dispatch({ type: "HARD_RESET" });
    this.props.dispatch({ type: "CURRENT_PAGE", payload: "Home" });
  };
  handleOnPressCloseSettings = () => {
    this.props.dispatch({ type: "CURRENT_PAGE", payload: "Home" });
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
                this.props.dispatch({ type: "NAME_CHANGE", payload: text });
              }}
            />
          </Item>
        </Form>
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
  return { tammyName: state.tammyName };
};

export default connect(mapStateToProps)(DisplaySettings);
