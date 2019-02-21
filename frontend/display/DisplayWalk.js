import React from "react";
import { connect } from "react-redux";
import { Container, Text, Button, View, Fab, Icon } from "native-base";
import CONSTANTS from "../Constants";
import { Platform } from "react-native";
import { Constants, Location, Permissions } from "expo";
import moment from "moment";
// import { Button } from "react-native";

class DisplayWalk extends React.Component {
  constructor(props) {
    super(props);
    this.state = { startTime: moment(), currentTime: moment() };
  }

  componentDidMount = () => {
    this.props.dispatch({ type: "MAKE_TAMMY_JUMP" });
    setTimeout(() => {
      this.props.dispatch({ type: "MAKE_TAMMY_STOP_JUMP" });
      let result = setInterval(() => {
        console.log("walk setInterval");
        this.setState({ currentTime: moment() });
      }, 1000);
      this.props.dispatch({ type: "MAKE_TAMMY_WALK", payload: result });
    }, CONSTANTS.jump_timer);
  };

  handleOnPressStopWalking = () => {
    this.props.dispatch({ type: "MAKE_TAMMY_STOP_WALK" });
  };

  getTimer = () => {
    let prev = this.state.startTime.toObject();
    let cur = this.state.currentTime.toObject();

    let hours = ("0" + (cur.hours - prev.hours)).slice(-2);
    let minutes = ("0" + (cur.minutes - prev.minutes)).slice(-2);
    let seconds = ("0" + (cur.seconds - prev.seconds)).slice(-2);

    return hours + ":" + minutes + ":" + seconds;
  };

  render() {
    console.log("in display walk");
    return (
      <Container
        style={{
          flex: 1,
          width: CONSTANTS.app_width,
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          maxHeight: 100
        }}
      >
        <Text>Distance: 0m</Text>
        <Text>Time: {this.getTimer()}</Text>
        <Button
          full
          style={{ backgroundColor: "#5067FF" }}
          onPress={this.handleOnPressStopWalking}
        >
          <Text>Stop walking</Text>
        </Button>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(DisplayWalk);
