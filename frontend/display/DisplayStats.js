import React from "react";
import { connect } from "react-redux";
import { View, Text, Button, H1 } from "native-base";
import moment from "moment";

class DisplayStats extends React.Component {
  handleOnPressCloseStats = () => {
    this.props.dispatch({ type: "CURRENT_PAGE", payload: "Home" });
  };
  render = () => {
    console.log("date", this.props.tammyWasBornOn);
    return (
      <View>
        <H1 style={{ textAlign: "center" }}>Statistics</H1>
        <Text>{this.props.tammyName} was born on</Text>
        <Text>
          {this.props.tammyName} has taken {this.props.howMuchHasTammyWalked}{" "}
          steps
        </Text>
        <Button
          full
          style={{ backgroundColor: "#5067FF" }}
          onPress={this.handleOnPressCloseStats}
        >
          <Text>Close stats</Text>
        </Button>
      </View>
    );
  };
}

const mapStateToProps = state => {
  return {
    tammyName: state.tammyName,
    tammyWasBornOn: state.tammyWasBornOn,
    howMuchHasTammyWalked: state.howMuchHasTammyWalked
  };
};

export default connect(mapStateToProps)(DisplayStats);
