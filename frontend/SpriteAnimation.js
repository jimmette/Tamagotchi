import React from "react";
import AnimatedSprite from "react-native-animated-sprite";
import CONSTANTS from "./Constants";
import { connect } from "react-redux";
import SpriteTable from "./SpriteTable";

class SpriteAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <AnimatedSprite
          ref={"Sprite"}
          fps={2}
          sprite={SpriteTable}
          animationFrameIndex={SpriteTable.animationIndex(
            this.props.spriteAnimation
          )}
          loopAnimation={true}
          coordinates={{
            top: 0,
            left: -CONSTANTS.sprite_width / 2
          }}
          size={{
            width: CONSTANTS.sprite_width,
            height: CONSTANTS.sprite_height
          }}
          draggable={true}
          tweenOptions={this.state.tweenOptions}
          tweenStart={"fromMethod"}
          onPress={() => {}}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    spriteAnimation: state.spriteAnimation
  };
};

export default connect(mapStateToProps)(SpriteAnimation);
