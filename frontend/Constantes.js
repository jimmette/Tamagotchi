import { Dimensions } from "react-native";

const CONSTANTES = {
  app_width: Dimensions.get("window").width,
  app_height: Dimensions.get("window").height,
  statusbar_width: Dimensions.get("window").width - 50,
  sprite_width: (Dimensions.get("window").width * 2) / 3,
  sprite_height: (Dimensions.get("window").width * 2) / 3,

  statusbar_border_radius: 25,
  statusbar_border_width: 2,

  eat_max_point: 100,
  sleep_max_point: 100,
  happiness_max_point: 100
};

export default CONSTANTES;
