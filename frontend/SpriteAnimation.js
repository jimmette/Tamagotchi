import React from "react";
import AnimatedSprite from "react-native-animated-sprite";
import SpriteTable from "./SpriteTable";
import CONSTANTES from "./Constantes";

class SpriteAnimation extends React.Component {
  constructor() {
    super();
    this.state = {
      animationType: SpriteTable.animationTypes[0]
    };
  }
  render() {
    return (
      <>
        <AnimatedSprite
          ref={"Sprite"}
          fps={2}
          sprite={SpriteTable}
          animationFrameIndex={SpriteTable.animationIndex(
            this.state.animationType
          )}
          loopAnimation={true}
          coordinates={{
            top: 0,
            left: -CONSTANTES.sprite_width / 2
          }}
          size={{
            width: CONSTANTES.sprite_width,
            height: CONSTANTES.sprite_height
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

export default SpriteAnimation;
