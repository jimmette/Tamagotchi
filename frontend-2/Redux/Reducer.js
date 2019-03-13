import CONSTANTS from "../Constants";

const iniState = {
  tammyName: "Tammy",
  tammyWasBornOn: new Date(),
  displayFooterOption: "NONE",
  nbCarrots: 0,
  nbApples: 0,
  satietyLevel: CONSTANTS.satiety_level_max_points,
  energyLevel: CONSTANTS.energy_level_max_points,
  joyLevel: CONSTANTS.joy_level_max_points,
  displayAnimation: "IDLE"
};

reducer = (state = iniState, action) => {
  switch (action.type) {
    case "SET_FOOTER_DISPLAY":
      // console.log("in SET_FOOTER_DISPLAY");
      return {
        ...state,
        displayFooterOption: action.payload.option
      };
    case "ALL_LEVELS_UPDATE":
      return {
        ...state,
        satietyLevel: state.satietyLevel + action.payload.satietyRate,
        energyLevel: state.energyLevel + action.payload.energyRate,
        joyLevel: state.joyLevel + action.payload.joyRate
      };
    case "SET_ANIMATION":
      return { ...state, displayAnimation: action.payload.animation };
    case "SET_NAME":
      return { ...state, tammyName: action.payload.name };
    default:
      return state;
  }
};

export default reducer;
