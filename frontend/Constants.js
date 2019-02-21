import { Dimensions } from "react-native";

const CONSTANTS = {
  app_width: Dimensions.get("window").width,
  app_height: Dimensions.get("window").height,
  sprite_width: (Dimensions.get("window").width * 2) / 3,
  sprite_height: (Dimensions.get("window").width * 2) / 3,

  satiety_level_max_points: 100,
  energy_level_max_points: 100,
  joy_level_max_points: 100,

  eat_timer: 4000,
  sleep_timer: 10000,
  yawn_timer: 2000,
  play_timer: 4000,
  jump_timer: 4000,
  animation_interruption_messages: 4000
};

export default CONSTANTS;
