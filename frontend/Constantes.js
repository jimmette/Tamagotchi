import { Dimensions } from "react-native";

const CONSTANTES = {
  app_width: Dimensions.get("window").width,
  app_height: Dimensions.get("window").height,
  skillbar_width: Dimensions.get("window").width - 50,
  sprite_width: (Dimensions.get("window").width * 2) / 3,
  sprite_height: (Dimensions.get("window").width * 2) / 3,

  skillbar_border_radius: 25,
  skillbar_border_width: 2
};

export default CONSTANTES;
