import CONSTANTES from "./Constants";
import SpriteTable from "./SpriteTable";

const initState = {
  satietyLevel: 100,
  energyLevel: 100,
  joyLevel: 100,
  isTammyEating: false,
  isTammySleeping: false,
  isTammyPlaying: false,
  spriteAnimation: SpriteTable.animationTypes[0],
  isTammyMad: false,
  isTammyWeak: false
};

function reducer(state = initState, action) {
  whatIsTammyMoodAnimation = () => {
    if (state.isTammyMad === true) return SpriteTable.animationTypes[9];
    if (state.isTammyWeak === true) return SpriteTable.animationTypes[11];

    return SpriteTable.animationTypes[0];
  };

  switch (action.type) {
    case "MAKE_TAMMY_MAD":
      // console.log(" in MAKE_TAMMY_MAD");
      return {
        ...state,
        spriteAnimation: SpriteTable.animationTypes[9],
        isTammyMad: true
      };
    case "MAKE_TAMMY_WEAK":
      // console.log(" in MAKE_TAMMY_WEAK");
      return {
        ...state,
        spriteAnimation: SpriteTable.animationTypes[11],
        isTammyWeak: true
      };
    case "MAKE_TAMMY_NOT_MAD_OR_WEAK":
      // console.log(" in MAKE_TAMMY_NOT_MAD_OR_WEAK");
      return {
        ...state,
        isTammyMad: false,
        isTammyWeak: false,
        spriteAnimation: SpriteTable.animationTypes[0]
      };
    case "MAKE_TAMMY_EAT":
      // console.log(" in MAKE_TAMMY_EAT");
      return {
        ...state,
        isTammyEating: true,
        spriteAnimation: SpriteTable.animationTypes[3]
      };
    case "MAKE_TAMMY_STOP_EAT":
      // console.log(" in MAKE_TAMMY_STOP_EAT");
      return {
        ...state,
        isTammyEating: false,
        spriteAnimation: whatIsTammyMoodAnimation()
      };
    case "MAKE_TAMMY_YAWN":
      // console.log(" in MAKE_TAMMY_YAWN");
      return {
        ...state,
        isTammySleeping: true,
        spriteAnimation: SpriteTable.animationTypes[6]
      };
    case "MAKE_TAMMY_SLEEP":
      // console.log(" in MAKE_TAMMY_SLEEP");
      return {
        ...state,
        isTammySleeping: true,
        spriteAnimation: SpriteTable.animationTypes[8]
      };
    case "MAKE_TAMMY_STOP_SLEEP":
      // console.log(" in MAKE_TAMMY_STOP_SLEEP");
      return {
        ...state,
        isTammySleeping: false,
        spriteAnimation: whatIsTammyMoodAnimation()
      };
    case "MAKE_TAMMY_PLAY":
      // console.log(" in MAKE_TAMMY_PLAY");

      return {
        ...state,
        isTammyPlaying: true,
        spriteAnimation: SpriteTable.animationTypes[3]
      };
    case "MAKE_TAMMY_STOP_PLAY":
      // console.log(" in MAKE_TAMMY_STOP_PLAY");
      return {
        ...state,
        isTammyPlaying: false,
        spriteAnimation: whatIsTammyMoodAnimation()
      };
    case "ALL_STATUS_UPDATE":
      // console.log(" in ALL_STATUS_UPDATE");
      let newSatietyLevel = state.satietyLevel + action.satietyRate;
      newSatietyLevel = newSatietyLevel < 0 ? 0 : newSatietyLevel;
      newSatietyLevel =
        newSatietyLevel > CONSTANTES.satiety_level_max_points
          ? CONSTANTES.satiety_level_max_points
          : newSatietyLevel;
      let newEnergyLevel = state.energyLevel + action.energyRate;
      newEnergyLevel = newEnergyLevel < 0 ? 0 : newEnergyLevel;
      newEnergyLevel =
        newEnergyLevel > CONSTANTES.energy_level_max_points
          ? CONSTANTES.energy_level_max_points
          : newEnergyLevel;
      let newJoyLevel = state.joyLevel + action.joyLevel;
      newJoyLevel = newJoyLevel < 0 ? 0 : newJoyLevel;
      newJoyLevel =
        newJoyLevel > CONSTANTES.joy_level_max_points
          ? CONSTANTES.joy_level_max_points
          : newJoyLevel;
      return {
        ...state,
        satietyLevel: newSatietyLevel,
        energyLevel: newEnergyLevel,
        joyLevel: newJoyLevel
      };
    default:
      return state;
  }
}

export default reducer;
