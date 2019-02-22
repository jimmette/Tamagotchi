import CONSTANTES from "./Constants";
import SpriteTable from "./SpriteTable";

const initState = {
  tammyName: "Tammy",
  satietyLevel: 100,
  energyLevel: 100,
  joyLevel: 100,
  isTammyInUselessAnimation: false,
  isTammyEating: false,
  isTammySleeping: false,
  isTammyPlaying: false,
  isTammyMad: false,
  isTammyWeak: false,
  spriteAnimation: SpriteTable.animationTypes[0],
  currentPage: "Home",
  howMuchHasTammyWalked: 0,
  howLongHasTammyWalked: 0,
  displayMessage: "",
  sleepInterval: undefined,
  walkInterval: undefined,
  eatTimeout: undefined
};

function reducer(state = initState, action) {
  whatIsTammyMoodAnimation = () => {
    if (state.isTammyMad === true) return SpriteTable.animationTypes[9];
    if (state.isTammyWeak === true) return SpriteTable.animationTypes[11];

    return SpriteTable.animationTypes[0];
  };

  // console.log(
  //   state.isTammyInUselessAnimation,
  //   state.isTammyEating,
  //   state.isTammySleeping,
  //   state.isTammyPlaying
  // );

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
      console.log(" in MAKE_TAMMY_EAT");
      return {
        ...state,
        isTammyEating: true,
        spriteAnimation: SpriteTable.animationTypes[13],
        eatTimeout: action.payload
      };
    case "MAKE_TAMMY_STOP_EAT":
      console.log(" in MAKE_TAMMY_STOP_EAT");
      clearTimeout(state.eatTimeout);
      return {
        ...state,
        isTammyEating: false,
        spriteAnimation: whatIsTammyMoodAnimation(),
        eatTimeout: undefined
      };
    case "MAKE_TAMMY_YAWN":
      // console.log(" in MAKE_TAMMY_YAWN");
      return {
        ...state,
        isTammyInUselessAnimation: true,
        spriteAnimation: SpriteTable.animationTypes[6]
      };
    case "MAKE_TAMMY_STOP_YAWN":
      // console.log(" in MAKE_TAMMY_STOP_YAWN");
      return {
        ...state,
        isTammyInUselessAnimation: false,
        spriteAnimation: whatIsTammyMoodAnimation()
      };
    case "MAKE_TAMMY_SLEEP":
      // console.log(" in MAKE_TAMMY_SLEEP");
      return {
        ...state,
        isTammySleeping: true,
        spriteAnimation: SpriteTable.animationTypes[8],
        currentPage: "Sleep",
        sleepInterval: action.payload
      };
    case "MAKE_TAMMY_STOP_SLEEP":
      // console.log(" in MAKE_TAMMY_STOP_SLEEP");
      clearInterval(state.sleepInterval);
      return {
        ...state,
        isTammySleeping: false,
        spriteAnimation: whatIsTammyMoodAnimation(),
        currentPage: "Home",
        sleepInterval: undefined
      };
    case "MAKE_TAMMY_PLAY":
      // console.log(" in MAKE_TAMMY_PLAY");

      return {
        ...state,
        isTammyPlaying: true,
        spriteAnimation: SpriteTable.animationTypes[12]
      };
    case "MAKE_TAMMY_STOP_PLAY":
      // console.log(" in MAKE_TAMMY_STOP_PLAY");
      return {
        ...state,
        isTammyPlaying: false,
        spriteAnimation: whatIsTammyMoodAnimation()
      };
    case "MAKE_TAMMY_WALK":
      return {
        ...state,
        currentPage: "Walk",
        isTammyPlaying: true,
        spriteAnimation: SpriteTable.animationTypes[1],
        walkInterval: action.payload
      };
    case "MAKE_TAMMY_STOP_WALK":
      clearInterval(state.walkInterval);
      return {
        ...state,
        currentPage: "Home",
        isTammyPlaying: false,
        spriteAnimation: whatIsTammyMoodAnimation(),
        walkInterval: undefined
      };
    case "MAKE_TAMMY_JUMP":
      // console.log(" in MAKE_TAMMY_JUMP");
      return {
        ...state,
        isTammyInUselessAnimation: true,
        spriteAnimation: SpriteTable.animationTypes[7]
      };
    case "MAKE_TAMMY_STOP_JUMP":
      // console.log(" in MAKE_TAMMY_STOP_JUMP");
      return {
        ...state,
        isTammyInUselessAnimation: false,
        spriteAnimation: whatIsTammyMoodAnimation()
      };
    case "DISPLAY_MESSAGE":
      return {
        ...state,
        displayMessage: action.payload
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
