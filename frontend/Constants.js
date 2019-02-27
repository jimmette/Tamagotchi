import { Dimensions } from "react-native";

const CONSTANTS = {
  app_width: Dimensions.get("window").width,
  app_height: Dimensions.get("window").height,
  sprite_width: (Dimensions.get("window").width * 3) / 4,
  sprite_height: (Dimensions.get("window").width * 3) / 4,

  homepage: "Home",
  startpage: "Home",

  satiety_level_max_points: 100,
  energy_level_max_points: 100,
  joy_level_max_points: 100,

  eat_timer: 6000,
  yawn_timer: 3500,
  play_timer: 4000,
  jump_timer: 4500,
  animation_interruption_messages: 4000,
  game_engine_timer: 500,
  loot_start_timer: 0,
  boost_timer: 4000
};

const NORMAL_RATES = {
  satietyLossRate: -CONSTANTS.satiety_level_max_points / (100 * 60),
  satietyGainRate: 2, //(10 / CONSTANTS.eat_timer) * 1000,
  energyLossRate: -CONSTANTS.energy_level_max_points / (100 * 60),
  energyGainRate: 2,
  joyLossRate: -CONSTANTS.joy_level_max_points / (100 * 60),
  joyGainRate: 2 //(10 / CONSTANTS.play_timer) * 1000
};

const WALKING_RATES = {
  satietyGainRateWhenWalking: 5,
  satietyLossRateWhenWalking: 1.2 * NORMAL_RATES.satietyLossRate,
  energyGainRateWhenWalking: 5,
  energyLossRateWhenWalking: 1.2 * NORMAL_RATES.energyLossRate,
  joyGainRateWhenWalking: 5,
  joyLossRateWhenWalking: 1.2 * NORMAL_RATES.joyLossRate
};

export default CONSTANTS;

export { NORMAL_RATES, WALKING_RATES };
