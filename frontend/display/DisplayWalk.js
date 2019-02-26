import React from "react";
import { connect } from "react-redux";
import { Container, Text, Button, View } from "native-base";
import CONSTANTS from "../Constants";
import moment from "moment";
import { Pedometer } from "expo";

class DisplayWalk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: new Date(),
      isPedometerAvailable: "checking",
      currentStepCount: 0,
      hasStepIncreased: false,
      isTammyLooting: false
    };
    this.jumpTimeout = undefined;
    this.walkInterval = undefined;
  }

  componentDidMount = () => {
    this.walkInterval = setInterval(() => {
      this.props.dispatch({
        type: "INCREASE_STEPS",
        payload: this.state.hasStepIncreased
      });
      this.setState({ hasStepIncreased: false });
    }, 1000);
    this.props.dispatch({ type: "MAKE_TAMMY_JUMP" });
    this.jumpTimeout = setTimeout(() => {
      this.props.dispatch({ type: "MAKE_TAMMY_STOP_JUMP" });
      this.props.dispatch({ type: "MAKE_TAMMY_WALK" });
    }, CONSTANTS.jump_timer);

    this._subscribe();
  };

  componentWillUnmount = () => {
    if (this.jumpTimeout) {
      clearTimeout(this.jumpTimeout);
      this.props.dispatch({ type: "MAKE_TAMMY_STOP_JUMP" });
    }

    if (this.walkInterval) {
      clearInterval(this.walkInterval);
    }
  };

  handleOnPressStopWalking = () => {
    this._unsubscribe();
    this.props.dispatch({
      type: "MAKE_TAMMY_STOP_WALK",
      steps: this.state.currentStepCount,
      time: moment().diff(moment(this.state.startTime), "minutes")
    });
    this.props.dispatch({ type: "CURRENT_PAGE", payload: CONSTANTS.homepage });
  };

  doLootMagicStuff = () => {
    if (
      moment().diff(this.state.startTime, "minutes") <
      CONSTANTS.loot_start_timer
    ) {
      return undefined;
    }
    if (this.state.isTammyLooting === true) {
      return undefined;
    }

    let dice = Math.floor(Math.random() * 10);
    switch (dice) {
      case 0:
        this.props.dispatch({ type: "BOOST_TAMMY_SATIETY" });
        this.setState({ isTammyLooting: true });
        setTimeout(() => {
          this.props.dispatch({ type: "STOP_BOOST_TAMMY_SATIETY" });
          this.setState({ isTammyLooting: false });
        }, CONSTANTS.boost_timer);
        break;
      case 1:
        this.props.dispatch({ type: "BOOST_TAMMY_ENERGY" });
        this.setState({ isTammyLooting: true });
        setTimeout(() => {
          this.props.dispatch({ type: "STOP_BOOST_TAMMY_ENERGY" });
          this.setState({ isTammyLooting: false });
        }, CONSTANTS.boost_timer);
        break;

      default:
        break;
    }
  };

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      let test = result.steps !== this.state.currentStepCount;
      this.setState({
        currentStepCount: result.steps,
        hasStepIncreased: test
      });
      //Des a loot needs to drop
      this.doLootMagicStuff();
    });

    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result)
        });
      },
      error => {
        this.setState({
          isPedometerAvailable: "Could not get isPedometerAvailable: " + error
        });
      }
    );
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

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
        <Text>Walk! And watch this go up: {this.state.currentStepCount}</Text>
        <Text>
          How much ever:{" "}
          {this.props.howMuchHasTammyWalked + this.state.currentStepCount}
        </Text>
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
  return {
    howMuchHasTammyWalked: state.howMuchHasTammyWalked
  };
};

export default connect(mapStateToProps)(DisplayWalk);
