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
      lastCoinStep: 0,
      hasStepIncreased: false,
      isTammyLooting: false
    };
    this.jumpTimeout = undefined;
    this.walkInterval = undefined;
    this.lootTimeout = undefined;
  }

  componentDidMount() {
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
  }

  componentWillUnmount() {
    if (this.jumpTimeout) {
      clearTimeout(this.jumpTimeout);
      this.props.dispatch({ type: "MAKE_TAMMY_STOP_JUMP" });
    }
    if (this.lootTimeout) {
      clearTimeout(this.lootTimeout);
      this.props.dispatch({ type: "STOP_BOOST_TAMMY_ENERGY" });
      this.props.dispatch({ type: "DISPLAY_MESSAGE", payload: "" });
    }

    if (this.walkInterval) {
      clearInterval(this.walkInterval);
      this.props.dispatch({
        type: "MAKE_TAMMY_STOP_WALK",
        steps: this.state.currentStepCount,
        time: moment().diff(moment(this.state.startTime), "minutes")
      });
      this.props.dispatch({
        type: "CURRENT_PAGE",
        page: CONSTANTS.homepage,
        title: this.props.tammyName
      });
    }
  }

  handleOnPressStopWalking = () => {
    this._unsubscribe();
    this.props.dispatch({
      type: "MAKE_TAMMY_STOP_WALK",
      steps: this.state.currentStepCount,
      time: moment().diff(moment(this.state.startTime), "minutes")
    });
    this.props.dispatch({ type: "DISPLAY_MESSAGE", payload: "" });
    this.props.dispatch({
      type: "CURRENT_PAGE",
      page: CONSTANTS.homepage,
      title: this.props.tammyName
    });
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
    if (this.state.hasStepIncreased === false) {
      return false;
    }

    let dice = Math.floor(Math.random() * 8);
    switch (dice) {
      case 0:
        this.props.dispatch({ type: "BOOST_TAMMY_SATIETY" });
        this.props.dispatch({
          type: "DISPLAY_MESSAGE",
          payload: "Satiety Boost"
        });
        this.setState({ isTammyLooting: true });
        this.lootTimeout = setTimeout(() => {
          this.props.dispatch({ type: "STOP_BOOST_TAMMY_SATIETY" });
          this.props.dispatch({ type: "DISPLAY_MESSAGE", payload: "" });
          this.setState({ isTammyLooting: false });
        }, CONSTANTS.boost_timer);
        break;
      case 1:
        this.props.dispatch({ type: "BOOST_TAMMY_ENERGY" });
        this.props.dispatch({
          type: "DISPLAY_MESSAGE",
          payload: "Energy Boost"
        });
        this.setState({ isTammyLooting: true });
        this.lootTimeout = setTimeout(() => {
          this.props.dispatch({ type: "STOP_BOOST_TAMMY_ENERGY" });
          this.props.dispatch({ type: "DISPLAY_MESSAGE", payload: "" });
          this.setState({ isTammyLooting: false });
        }, CONSTANTS.boost_timer);
        break;
      case 2:
        if (this.props.nbApples < CONSTANTS.nb_max_apples) {
          this.props.dispatch({ type: "SET_ITEMS", apples: 1 });
          this.props.dispatch({
            type: "DISPLAY_MESSAGE",
            payload: "You got an apple"
          });
          this.setState({ isTammyLooting: true });
          setTimeout(() => {
            this.props.dispatch({ type: "DISPLAY_MESSAGE", payload: "" });
            this.setState({ isTammyLooting: false });
          }, 1000);
        }
        break;
      case 3:
        if (this.props.nbCarrots < CONSTANTS.nb_max_carrots) {
          this.props.dispatch({ type: "SET_ITEMS", carrots: 1 });
          this.props.dispatch({
            type: "DISPLAY_MESSAGE",
            payload: "You got a carrot"
          });
          this.setState({ isTammyLooting: true });
          setTimeout(() => {
            this.props.dispatch({ type: "DISPLAY_MESSAGE", payload: "" });
            this.setState({ isTammyLooting: false });
          }, 1000);
        }
        break;

      default:
        break;
    }
  };

  doCoinMagicStuff = () => {
    if (this.state.isTammyLooting === true) {
      return undefined;
    }
    if (this.state.hasStepIncreased === false) {
      return false;
    }
    if (
      this.state.currentStepCount - this.state.lastCoinStep >
      CONSTANTS.nb_step_for_coin
    ) {
      this.setState({
        lastCoinStep: this.state.lastCoinStep + CONSTANTS.nb_step_for_coin
      });
      this.props.dispatch({ type: "SET_ITEMS", coins: 1 });
      this.props.dispatch({
        type: "DISPLAY_MESSAGE",
        payload: "You got a coin"
      });
      setTimeout(() => {
        this.props.dispatch({ type: "DISPLAY_MESSAGE", payload: "" });
      }, 1000);
    }
  };

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      let test = result.steps !== this.state.currentStepCount;
      this.setState({
        currentStepCount: result.steps,
        hasStepIncreased: test
      });
      //Does a loot need to drop
      this.doLootMagicStuff();
      this.doCoinMagicStuff();
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
    howMuchHasTammyWalked: state.howMuchHasTammyWalked,
    tammyName: state.tammyName,
    nbCarrots: state.nbCarrots,
    nbApples: state.nbApples,
    nbCoins: state.nbCoins
  };
};

export default connect(mapStateToProps)(DisplayWalk);
