import React from "react";
import { connect } from "react-redux";
import { View, Text, Button, H1 } from "native-base";

class DisplayInventory extends React.Component {
  handleOnPressCloseInventory = () => {
    this.props.dispatch({ type: "CURRENT_PAGE", payload: "Home" });
  };
  render = () => {
    return (
      <View>
        <H1 style={{ textAlign: "center" }}>Inventory</H1>
        <Button
          full
          style={{ backgroundColor: "#5067FF" }}
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
