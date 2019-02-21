import React from "react";
import { connect } from "react-redux";
import { Container, Text, Button } from "native-base";
import CONSTANTS from "../Constants";
import moment from "moment";
// import { Button } from "react-native";

class DisplayWalk extends React.Component {
  constructor(props) {
    super(props);
    this.state = { startTime: moment(), currentTime: moment() };
  }
  handleOnPressStopSleeping = () => {
    this.props.dispatch({ type: "MAKE_TAMMY_STOP_SLEEP" });
  };

  componentDidMount = () => {
    this.props.dispatch({ type: "MAKE_TAMMY_YAWN" });
    setTimeout(() => {
      this.props.dispatch({ type: "MAKE_TAMMY_STOP_YAWN" });
      let result = setInterval(() => {
        console.log("sleep setInterval");
        this.setState({ currentTime: moment() });
      }, 1000);
      this.props.dispatch({ type: "MAKE_TAMMY_SLEEP", payload: result });
    }, CONSTANTS.yawn_timer);
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
        <Text>Time: {this.getTimer()}</Text>
        <Button
          full
          style={{ backgroundColor: "#5067FF" }}
          onPress={this.handleOnPressStopSleeping}
        >
          <Text>Stop sleeping</Text>
        </Button>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(DisplayWalk);
