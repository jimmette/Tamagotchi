import { Dimensions } from "react-native";

const CONSTANTS = {
  app_width: Dimensions.get("window").width,
  app_height: Dimensions.get("window").height,
  footer_hight: 60,
  header_hight: 60,

  satiety_level_max_points: 100,
  energy_level_max_points: 100,
  joy_level_max_points: 100,

  intro_timer: 5000
};

const NORMAL_RATES = {
  satietyLossRate: -CONSTANTS.satiety_level_max_points / (1000 * 60),
  satietyGainRate: 2,
  energyLossRate: -CONSTANTS.energy_level_max_points / (1000 * 60),
  energyGainRate: 2,
  joyLossRate: -CONSTANTS.joy_level_max_points / (1000 * 60),
  joyGainRate: 2
};

export default CONSTANTS;

export { NORMAL_RATES };
