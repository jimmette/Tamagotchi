import { Dimensions } from "react-native";

const CONSTANTS = {
  app_width: Dimensions.get("window").width,
  app_height: Dimensions.get("window").height,
  statusbar_width: Dimensions.get("window").width - 50,
  sprite_width: (Dimensions.get("window").width * 2) / 3,
  sprite_height: (Dimensions.get("window").width * 2) / 3,

  statusbar_border_radius: 25,
  statusbar_border_width: 2,

  eat_max_point: 100,
  sleep_max_point: 100,
  happiness_max_point: 100,

  eat_timer: 4000,
  sleep_timer: 10000,
  yawn_timer: 2000,
  pet_timer: 4000
};

export default CONSTANTS;
