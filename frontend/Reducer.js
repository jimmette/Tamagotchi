import CONSTANTES from "./Constants";
import SpriteTable from "./SpriteTable";
import { AsyncStorage } from "react-native";
import moment from "moment";

const initState = {
  tammyName: "Tammy",
  tammyWasBornOn: moment(),
  satietyLevel: 100,
  energyLevel: 100,
  joyLevel: 100,
  isTammyInUselessAnimation: false,
  isTammyEating: false,
  isTammySleeping: false,
  isTammyPlaying: false,
  isTammyWalking: false,
  hasStepIncreased: false,
  isTammyMad: false,
  isTammyWeak: false,
  spriteAnimation: SpriteTable.animationTypes[0],
  currentPage: "Home",
  howMuchHasTammyWalked: 0,
  displayMessage: "",
  sleepInterval: undefined,
  walkInterval: undefined,
  eatTimeout: undefined
};

_removeData = async () => {
  try {
    await AsyncStorage.removeItem("State");
  } catch (error) {
    // Error retrieving data
    console.log("error retrieving data", error);
  }
};

checkLimits = num => {
  let result = 50;
  result = num < 0 ? 0 : num;
  result =
    result > CONSTANTES.satiety_level_max_points
      ? CONSTANTES.satiety_level_max_points
      : result;
  return result;
};

reducer = (state = initState, action) => {
  whatIsTammyMoodAnimation = () => {
    if (state.isTammyWalking === true) return SpriteTable.animationTypes[1];
    if (state.isTammyMad === true) return SpriteTable.animationTypes[9];
    if (state.isTammyWeak === true) return SpriteTable.animationTypes[11];

    return SpriteTable.animationTypes[0];
  };

  tammyStates = () => {
    // console.log(
    //   "UA:",
    //   state.isTammyInUselessAnimation,
    //   "Eat:",
    //   state.isTammyEating,
    //   "Sleep:",
    //   state.isTammySleeping,
    //   "Play:",
    //   state.isTammyPlaying,
    //   "Walk:",
    //   state.isTammyWalking,
    //   "Step:",
    //   state.hasStepIncreased,
    //   "Tammy mad:",
    //   state.isTammyMad,
    //   "Tammy weak:",
    //   state.isTammyWeak
    // );
  };

  let newSatietyLevel = 0;
  let newEnergyLevel = 0;
  let newJoyLevel = 0;

  switch (action.type) {
    case "CURRENT_PAGE":
      console.log(" in CURRENT_PAGE");
      return { ...state, currentPage: action.payload };
    case "NAME_CHANGE":
      return { ...state, tammyName: action.payload };
    case "MAKE_TAMMY_MAD":
      console.log(" in MAKE_TAMMY_MAD", 55, tammyStates());
      return {
        ...state,
        spriteAnimation: SpriteTable.animationTypes[9],
        isTammyMad: true
      };
    case "MAKE_TAMMY_WEAK":
      console.log(" in MAKE_TAMMY_WEAK", 62, tammyStates());
      return {
        ...state,
        spriteAnimation: SpriteTable.animationTypes[11],
        isTammyWeak: true
      };
    case "MAKE_TAMMY_NOT_MAD_OR_WEAK":
      console.log(" in MAKE_TAMMY_NOT_MAD_OR_WEAK", 69, tammyStates());
      return {
        ...state,
        isTammyMad: false,
        isTammyWeak: false,
        spriteAnimation: SpriteTable.animationTypes[0]
      };
    case "MAKE_TAMMY_EAT":
      console.log(" in MAKE_TAMMY_EAT", 77, tammyStates());
      return {
        ...state,
        isTammyEating: true,
        spriteAnimation: SpriteTable.animationTypes[13],
        eatTimeout: action.payload
      };
    case "MAKE_TAMMY_STOP_EAT":
      console.log(" in MAKE_TAMMY_STOP_EAT", 85, tammyStates());
      clearTimeout(state.eatTimeout);
      return {
        ...state,
        isTammyEating: false,
        spriteAnimation: whatIsTammyMoodAnimation(),
        eatTimeout: undefined
      };
    case "MAKE_TAMMY_YAWN":
      console.log(" in MAKE_TAMMY_YAWN", 94, tammyStates());
      return {
        ...state,
        isTammyInUselessAnimation: true,
        spriteAnimation: SpriteTable.animationTypes[6]
      };
    case "MAKE_TAMMY_STOP_YAWN":
      console.log(" in MAKE_TAMMY_STOP_YAWN", 101, tammyStates());
      return {
        ...state,
        isTammyInUselessAnimation: false,
        spriteAnimation: whatIsTammyMoodAnimation()
      };
    case "MAKE_TAMMY_SLEEP":
      console.log(" in MAKE_TAMMY_SLEEP", 108, tammyStates());
      return {
        ...state,
        isTammySleeping: true,
        spriteAnimation: SpriteTable.animationTypes[8],
        sleepInterval: action.payload
      };
    case "MAKE_TAMMY_STOP_SLEEP":
      console.log(" in MAKE_TAMMY_STOP_SLEEP", 116, tammyStates());
      clearInterval(state.sleepInterval);
      return {
        ...state,
        isTammySleeping: false,
        spriteAnimation: whatIsTammyMoodAnimation(),
        sleepInterval: undefined
      };
    case "MAKE_TAMMY_PLAY":
      console.log(" in MAKE_TAMMY_PLAY", 125, tammyStates());
      return {
        ...state,
        isTammyPlaying: true,
        spriteAnimation: SpriteTable.animationTypes[12]
      };
    case "MAKE_TAMMY_STOP_PLAY":
      console.log(" in MAKE_TAMMY_STOP_PLAY", 132, tammyStates());
      return {
        ...state,
        isTammyPlaying: false,
        spriteAnimation: whatIsTammyMoodAnimation()
      };
    case "MAKE_TAMMY_WALK":
      console.log(" in MAKE_TAMMY_WALK", 139, tammyStates());
      return {
        ...state,
        isTammyWalking: true,
        spriteAnimation: SpriteTable.animationTypes[1],
        walkInterval: action.payload
      };
    case "MAKE_TAMMY_STOP_WALK":
      console.log(" in MAKE_TAMMY_STOP_WALK", 147, tammyStates());
      clearInterval(state.walkInterval);
      return {
        ...state,
        isTammyWalking: false,
        hasStepIncreased: false,
        spriteAnimation: whatIsTammyMoodAnimation(),
        walkInterval: undefined,
        howMuchHasTammyWalked: state.howMuchHasTammyWalked + action.steps
      };
    case "MAKE_TAMMY_JUMP":
      console.log(" in MAKE_TAMMY_JUMP", 158, tammyStates());
      return {
        ...state,
        isTammyInUselessAnimation: true,
        spriteAnimation: SpriteTable.animationTypes[7]
      };
    case "MAKE_TAMMY_STOP_JUMP":
      console.log(" in MAKE_TAMMY_STOP_JUMP", 165, tammyStates());
      return {
        ...state,
        isTammyInUselessAnimation: false,
        spriteAnimation: whatIsTammyMoodAnimation()
      };
    case "BOOST_TAMMY_SATIETY":
      console.log(" in BOOST_TAMMY_SATIETY", 172, tammyStates());
      return {
        ...state,
        isTammyEating: true,
        isTammyInUselessAnimation: true,
        spriteAnimation: SpriteTable.animationTypes[14]
      };
    case "STOP_BOOST_TAMMY_SATIETY":
      console.log(" in STOP_BOOST_TAMMY_SATIETY", 180, tammyStates());
      return {
        ...state,
        isTammyEating: false,
        isTammyInUselessAnimation: false,
        spriteAnimation: whatIsTammyMoodAnimation()
      };
    case "BOOST_TAMMY_ENERGY":
      console.log(" in BOOST_TAMMY_ENERGY", 172, tammyStates());
      return {
        ...state,
        isTammySleeping: true,
        isTammyInUselessAnimation: true,
        spriteAnimation: SpriteTable.animationTypes[14]
      };
    case "STOP_BOOST_TAMMY_ENERGY":
      console.log(" in STOP_BOOST_TAMMY_ENERGY", 180, tammyStates());
      return {
        ...state,
        isTammySleeping: false,
        isTammyInUselessAnimation: false,
        spriteAnimation: whatIsTammyMoodAnimation()
      };
    case "DISPLAY_MESSAGE":
      console.log(" in DISPLAY_MESSAGE");
      return {
        ...state,
        displayMessage: action.payload
      };
    case "INCREASE_STEPS":
      console.log(" in INCREASE_STEPS");
      return { ...state, hasStepIncreased: action.payload };
    case "RESTORE_DATA":
      console.log(" in RESTORE_DATA");
      newSatietyLevel = checkLimits(action.payload.satietyLevel);
      newEnergyLevel = checkLimits(action.payload.energyLevel);
      newJoyLevel = checkLimits(action.payload.joyLevel);
      return {
        ...state,
        tammyName: action.payload.tammyName,
        tammyWasBornOn: action.payload.tammyWasBornOn,
        satietyLevel: newSatietyLevel,
        energyLevel: newEnergyLevel,
        joyLevel: newJoyLevel,
        howMuchHasTammyWalked: action.payload.howMuchHasTammyWalked
      };
    case "ALL_STATUS_UPDATE":
      // console.log(" in ALL_STATUS_UPDATE", 260, tammyStates());
      newSatietyLevel = checkLimits(state.satietyLevel + action.satietyRate);
      newEnergyLevel = checkLimits(state.energyLevel + action.energyRate);
      newJoyLevel = checkLimits(state.joyLevel + action.joyRate);
      return {
        ...state,
        satietyLevel: newSatietyLevel,
        energyLevel: newEnergyLevel,
        joyLevel: newJoyLevel
      };
    case "HARD_RESET":
      console.log(" in HARD_RESET");
      // _removeData();
      return initState;
    default:
      return state;
  }
};

export default reducer;
