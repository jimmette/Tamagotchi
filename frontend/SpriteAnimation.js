import React from "react";
import AnimatedSprite from "react-native-animated-sprite";
import CONSTANTS from "./Constants";
import { connect } from "react-redux";
import SpriteTable from "./SpriteTable";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    // width: CONSTANTS.app_width,
    // height: CONSTANTS.app_height,
    // flex: 1,
    // flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center"
  }
});
class SpriteAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        <AnimatedSprite
          ref={"Sprite"}
          fps={2}
          sprite={SpriteTable}
          animationFrameIndex={SpriteTable.animationIndex(
            this.props.spriteAnimation
          )}
          loopAnimation={true}
          coordinates={{
            top: -150,
            left: (CONSTANTS.app_width - CONSTANTS.sprite_width) / 2
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
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    spriteAnimation: state.spriteAnimation
  };
};

export default connect(mapStateToProps)(SpriteAnimation);
