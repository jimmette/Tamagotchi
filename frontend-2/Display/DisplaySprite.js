import React from "react";
import { connect } from "react-redux";
import { Image } from "react-native";

const IMG_IDLE = require("../assets/images/sprites/idle.gif");
const IMG_WALK = require("../assets/images/sprites/walk.gif");
const IMG_SLEEP = require("../assets/images/sprites/sleep.gif");
const IMG_EAT = require("../assets/images/sprites/eat.gif");
const YAWN = require("../assets/images/sprites/yawn.gif");

class DisplaySprite extends React.Component {
  displayAnimation = () => {
    switch (this.props.displayAnimation) {
      case "IDLE":
        return <Image source={IMG_IDLE} />;
      case "WALK":
        return <Image source={IMG_WALK} />;
      case "SLEEP":
        return <Image source={IMG_SLEEP} />;
      case "EAT":
        return <Image source={IMG_EAT} />;
      case "YAWN":
        return <Image source={YAWN} />;
      default:
        return <Image source={IMG_IDLE} />;
    }
  };
  render() {
    return this.displayAnimation();
  }
}

const mapStateToProps = state => {
  return { displayAnimation: state.displayAnimation };
};

export default connect(mapStateToProps)(DisplaySprite);
