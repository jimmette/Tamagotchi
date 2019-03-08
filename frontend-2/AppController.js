import React from "react";
import { connect } from "react-redux";
import { Container } from "native-base";
import CONSTANTS, { NORMAL_RATES } from "./Constants";

class AppController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.interval = setInterval(this.gameLoop, 500);
    }, CONSTANTS.intro_timer);
    this.props.navigation.navigate("Intro");
  }
  componentWillUnmount() {
    if (this.interval !== undefined) {
      clearInterval(this.interval);
    }
    if (this.timeout !== undefined) {
      clearTimeout(this.timeout);
    }
  }
  gameLoop = () => {
    // console.log("in gameLoop");
    // console.log(
    //   this.props.satietyLevel,
    //   this.props.energyLevel,
    //   this.props.joyLevel
    // );
    let satietyRate = NORMAL_RATES.satietyLossRate;
    let energyRate = NORMAL_RATES.energyLossRate;
    let joyRate = NORMAL_RATES.joyLossRate;

    this.props.dispatch({
      type: "ALL_LEVELS_UPDATE",
      payload: {
        satietyRate: satietyRate,
        energyRate: energyRate,
        joyRate: joyRate
      }
    });
  };
  render() {
    return <Container />;
  }
}

const mapStateToProps = state => {
  return {
    satietyLevel: state.satietyLevel,
    energyLevel: state.energyLevel,
    joyLevel: state.joyLevel
  };
};

export default connect(mapStateToProps)(AppController);
