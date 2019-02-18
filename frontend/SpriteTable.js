const SpriteTable = {
  name: "monster",
  size: { width: 750, height: 750 },
  animationTypes: [
    "IDLE", //00
    "WALK_FROM_FRONT", //01
    "DANCE", //02
    "LAUGH", //03  bof à changer
    "RUN_TO_RIGHT", //04
    "WALK_FROM_BACK", //05
    "YAWN", //06
    "HAPPY_JUMP", //07
    "SLEEP" //08
  ],
  frames: [
    require("./assets/images/sprites/sprite000.png"),
    require("./assets/images/sprites/sprite001.png"),
    require("./assets/images/sprites/sprite002.png"),
    require("./assets/images/sprites/sprite003.png"),
    require("./assets/images/sprites/sprite004.png"),
    require("./assets/images/sprites/sprite005.png"),
    require("./assets/images/sprites/sprite006.png"),
    require("./assets/images/sprites/sprite007.png"),
    require("./assets/images/sprites/sprite008.png"),
    require("./assets/images/sprites/sprite009.png"),
    require("./assets/images/sprites/sprite010.png"),
    require("./assets/images/sprites/sprite011.png"),
    require("./assets/images/sprites/sprite012.png"),
    require("./assets/images/sprites/sprite013.png"),
    require("./assets/images/sprites/sprite014.png"),
    require("./assets/images/sprites/sprite015.png"),
    require("./assets/images/sprites/sprite016.png"),
    require("./assets/images/sprites/sprite017.png"),
    require("./assets/images/sprites/sprite018.png"),
    require("./assets/images/sprites/sprite019.png"),
    require("./assets/images/sprites/sprite020.png"),
    require("./assets/images/sprites/sprite021.png"),
    require("./assets/images/sprites/sprite022.png"),
    require("./assets/images/sprites/sprite023.png"),
    require("./assets/images/sprites/sprite024.png"),
    require("./assets/images/sprites/sprite025.png"),
    require("./assets/images/sprites/sprite026.png"),
    require("./assets/images/sprites/sprite027.png"),
    require("./assets/images/sprites/sprite028.png"),
    require("./assets/images/sprites/sprite029.png"),
    require("./assets/images/sprites/sprite030.png"),
    require("./assets/images/sprites/sprite031.png"),
    require("./assets/images/sprites/sprite032.png")
  ],
  animationIndex: function getAnimationIndex(animationType) {
    switch (animationType) {
      case "IDLE":
        return [0];
      case "WALK_FROM_FRONT":
        return [0, 1, 2, 3];
      case "DANCE":
        return [4, 5, 6, 7];
      case "LAUGH":
        return [8, 9, 10, 11];
      case "RUN_TO_RIGHT":
        return [12, 13, 14, 15];
      case "WALK_FROM_BACK":
        return [16, 17, 18, 19];
      case "YAWN":
        return [20, 21, 22, 23, 24];
      case "HAPPY_JUMP":
        return [25, 26, 27, 28];
      case "SLEEP":
        return [29, 30, 31, 32];
      default:
        return [];
    }
  }
};

export default SpriteTable;
