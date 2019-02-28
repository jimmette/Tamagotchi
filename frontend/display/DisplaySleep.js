import React from "react";
import { connect } from "react-redux";
import { Container, Text, Button } from "native-base";
import CONSTANTS from "../Constants";
import moment from "moment";
// import { Button } from "react-native";

class DisplayWalk extends React.Component {
  constructor(props) {
    super(props);
    this.state = { startTime: new Date() };
    this.yawnTimeout = undefined;
    this.sleepInterval = undefined;
  }
  handleOnPressStopSleeping = () => {
    this.props.dispatch({
      type: "MAKE_TAMMY_STOP_SLEEP",
      time: moment().diff(moment(this.state.startTime, "minutes"))
    });
    this.props.dispatch({
      type: "CURRENT_PAGE",
      page: CONSTANTS.homepage,
      title: this.props.tammyName
    });
  };

  componentDidMount() {
    this.sleepInterval = setInterval(() => {
      this.setState({ currentTime: new Date() });
    }, 1000);
    this.props.dispatch({ type: "MAKE_TAMMY_YAWN" });
    this.yawnTimeout = setTimeout(() => {
      this.props.dispatch({ type: "MAKE_TAMMY_STOP_YAWN" });
      this.props.dispatch({ type: "MAKE_TAMMY_SLEEP" });
    }, CONSTANTS.yawn_timer);
  }

  componentWillUnmount() {
    if (this.yawnTimeout) {
      clearTimeout(this.yawnTimeout);
      this.props.dispatch({ type: "MAKE_TAMMY_STOP_YAWN" });
    }

    if (this.sleepInterval) {
      clearInterval(this.sleepInterval);
      this.props.dispatch({
        type: "MAKE_TAMMY_STOP_SLEEP",
        time: moment().diff(moment(this.state.startTime, "minutes"))
      });
    }
  }

  getTimer = () => {
    let prev = this.state.startTime;

    let hours = ("0" + moment().diff(moment(prev), "hours")).slice(-2);
    let minutes = ("0" + moment().diff(moment(prev), "minutes")).slice(-2);
    let seconds = ("0" + moment().diff(moment(prev), "seconds")).slice(-2);

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
  return { tammyName: state.tammyName };
};

export default connect(mapStateToProps)(DisplayWalk);
