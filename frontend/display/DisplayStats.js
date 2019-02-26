import React from "react";
import { connect } from "react-redux";
import { View, Text, Button, H1 } from "native-base";
import moment from "moment";
import CONSTANTS from "../Constants";

class DisplayStats extends React.Component {
  handleOnPressCloseStats = () => {
    this.props.dispatch({ type: "CURRENT_PAGE", payload: CONSTANTS.homepage });
  };
  render = () => {
    return (
      <View>
        <H1 style={{ textAlign: "center" }}>Statistics</H1>
        <Text>
          {this.props.tammyName} was born on{" "}
          {moment(this.props.tammyWasBornOn).format("MMMM Do YYYY")}
        </Text>
        <Text>
          {this.props.tammyName} is{" "}
          {moment().diff(this.props.tammyWasBornOn, "days")} day(s) old
        </Text>
        <Text>
          {this.props.tammyName} has taken {this.props.howMuchHasTammyWalked}{" "}
          steps
        </Text>
        <Text>
          {this.props.tammyName} has walked for{" "}
          {this.props.howLongHasTammyWalked} minutes
        </Text>
        <Text>
          {this.props.tammyName} has slept for {this.props.howLongHasTammySlept}{" "}
          minutes
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
    howMuchHasTammyWalked: state.howMuchHasTammyWalked,
    howLongHasTammyWalked: state.howLongHasTammyWalked,
    howLongHasTammySlept: state.howLongHasTammySlept
  };
};

export default connect(mapStateToProps)(DisplayStats);
