import React from "react";
import { connect } from "react-redux";
import { View, Text, Button, H1 } from "native-base";
import CONSTANTS from "../Constants";

class DisplayInventory extends React.Component {
  handleOnPressCloseInventory = () => {
    this.props.dispatch({ type: "CURRENT_PAGE", payload: CONSTANTS.homepage });
  };
  render = () => {
    return (
      <View>
        <H1 style={{ textAlign: "center", marginBottom: 50 }}>Inventory</H1>
        <Button
          full
          style={{
            marginTop: CONSTANTS.app_height - 262,
            backgroundColor: "#5067FF"
          }}
          onPress={this.handleOnPressCloseInventory}
        >
          <Text>Close inventory</Text>
        </Button>
      </View>
    );
  };
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(DisplayInventory);
