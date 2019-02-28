import CONSTANTS from "./Constants";
import SpriteTable from "./SpriteTable";

const initState = {
  _id: "",
  saveTime: undefined,
  allowOnlineSync: false,
  allowNotifications: false,
  tammyName: "Tammy",
  tammyWasBornOn: new Date(),
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
  currentPage: CONSTANTS.startpage,
  currentTitle: "Tammy",
  howMuchHasTammyWalked: 0,
  howLongHasTammySlept: 0,
  displayMessage: "",
  eatTimeout: undefined,
  nbCarrots: 0,
  nbApples: 0,
  nbCoins: 0
};

checkLimits = num => {
  let result = 50;
  result = num < 0 ? 0 : num;
  result =
    result > CONSTANTS.satiety_level_max_points
      ? CONSTANTS.satiety_level_max_points
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
    console.log(
      "UA:",
      state.isTammyInUselessAnimation,
      "Eat:",
      state.isTammyEating,
      "Sleep:",
      state.isTammySleeping,
      "Play:",
      state.isTammyPlaying,
      "Walk:",
      state.isTammyWalking,
      "Step:",
      state.hasStepIncreased,
      "Tammy mad:",
      state.isTammyMad,
      "Tammy weak:",
      state.isTammyWeak
    );
  };

  let newSatietyLevel = 0;
  let newEnergyLevel = 0;
  let newJoyLevel = 0;

  switch (action.type) {
    case "SET_ITEMS":
      let apples = action.apples ? action.apples : 0;
      let carrots = action.carrots ? action.carrots : 0;
      let coins = action.coins ? action.coins : 0;
      return {
        ...state,
        nbApples: state.nbApples + apples,
        nbCarrots: state.nbCarrots + carrots,
        nbCoins: state.nbCoins + coins
      };
    case "MAKE_TAMMY_MAD":
      // console.log(" in MAKE_TAMMY_MAD", 55, tammyStates());
      return {
        ...state,
        spriteAnimation: SpriteTable.animationTypes[9],
        isTammyMad: true
      };
    case "MAKE_TAMMY_WEAK":
      // console.log(" in MAKE_TAMMY_WEAK", tammyStates());
      return {
        ...state,
        spriteAnimation: SpriteTable.animationTypes[11],
        isTammyWeak: true
      };
    case "MAKE_TAMMY_NOT_MAD_OR_WEAK":
      // console.log(" in MAKE_TAMMY_NOT_MAD_OR_WEAK", tammyStates());
      return {
        ...state,
        isTammyMad: false,
        isTammyWeak: false,
        spriteAnimation: SpriteTable.animationTypes[0]
      };
    case "MAKE_TAMMY_EAT":
      // console.log(" in MAKE_TAMMY_EAT", tammyStates());
      return {
        ...state,
        isTammyEating: true,
        spriteAnimation: SpriteTable.animationTypes[13]
      };
    case "MAKE_TAMMY_STOP_EAT":
      // console.log(" in MAKE_TAMMY_STOP_EAT", tammyStates());
      clearTimeout(state.eatTimeout);
      return {
        ...state,
        isTammyEating: false,
        spriteAnimation: whatIsTammyMoodAnimation()
      };
    case "MAKE_TAMMY_YAWN":
      // console.log(" in MAKE_TAMMY_YAWN", tammyStates());
      return {
        ...state,
        isTammyInUselessAnimation: true,
        spriteAnimation: SpriteTable.animationTypes[6]
      };
    case "MAKE_TAMMY_STOP_YAWN":
      // console.log(" in MAKE_TAMMY_STOP_YAWN", tammyStates());
      return {
        ...state,
        isTammyInUselessAnimation: false,
        spriteAnimation: whatIsTammyMoodAnimation()
      };
    case "MAKE_TAMMY_SLEEP":
      // console.log(" in MAKE_TAMMY_SLEEP", tammyStates());
      return {
        ...state,
        isTammySleeping: true,
        spriteAnimation: SpriteTable.animationTypes[8]
      };
    case "MAKE_TAMMY_STOP_SLEEP":
      // console.log(" in MAKE_TAMMY_STOP_SLEEP", tammyStates());
      clearInterval(state.sleepInterval);
      return {
        ...state,
        isTammySleeping: false,
        spriteAnimation: whatIsTammyMoodAnimation(),
        howLongHasTammySlept: action.time
      };
    case "MAKE_TAMMY_PLAY":
      // console.log(" in MAKE_TAMMY_PLAY", tammyStates());
      return {
        ...state,
        isTammyPlaying: true,
        spriteAnimation: SpriteTable.animationTypes[12]
      };
    case "MAKE_TAMMY_STOP_PLAY":
      // console.log(" in MAKE_TAMMY_STOP_PLAY", tammyStates());
      return {
        ...state,
        isTammyPlaying: false,
        spriteAnimation: whatIsTammyMoodAnimation()
      };
    case "MAKE_TAMMY_WALK":
      // console.log(" in MAKE_TAMMY_WALK", tammyStates());
      return {
        ...state,
        isTammyWalking: true,
        spriteAnimation: SpriteTable.animationTypes[1],
        walkInterval: action.payload
      };
    case "MAKE_TAMMY_STOP_WALK":
      // console.log(" in MAKE_TAMMY_STOP_WALK", tammyStates());
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
      // console.log(" in MAKE_TAMMY_JUMP", tammyStates());
      return {
        ...state,
        isTammyInUselessAnimation: true,
        spriteAnimation: SpriteTable.animationTypes[7]
      };
    case "MAKE_TAMMY_STOP_JUMP":
      // console.log(" in MAKE_TAMMY_STOP_JUMP", tammyStates());
      return {
        ...state,
        isTammyInUselessAnimation: false,
        spriteAnimation: whatIsTammyMoodAnimation()
      };
    case "BOOST_TAMMY_SATIETY":
      // console.log(" in BOOST_TAMMY_SATIETY", tammyStates());
      return {
        ...state,
        isTammyEating: true,
        isTammyInUselessAnimation: true,
        spriteAnimation: SpriteTable.animationTypes[14]
      };
    case "STOP_BOOST_TAMMY_SATIETY":
      // console.log(" in STOP_BOOST_TAMMY_SATIETY", tammyStates());
      return {
        ...state,
        isTammyEating: false,
        isTammyInUselessAnimation: false,
        spriteAnimation: whatIsTammyMoodAnimation()
      };
    case "BOOST_TAMMY_ENERGY":
      // console.log(" in BOOST_TAMMY_ENERGY", tammyStates());
      return {
        ...state,
        isTammySleeping: true,
        isTammyInUselessAnimation: true,
        spriteAnimation: SpriteTable.animationTypes[14]
      };
    case "STOP_BOOST_TAMMY_ENERGY":
      // console.log(" in STOP_BOOST_TAMMY_ENERGY", tammyStates());
      return {
        ...state,
        isTammySleeping: false,
        isTammyInUselessAnimation: false,
        spriteAnimation: whatIsTammyMoodAnimation()
      };
    case "DISPLAY_MESSAGE":
      // console.log(" in DISPLAY_MESSAGE");
      return {
        ...state,
        displayMessage: action.payload
      };
    case "INCREASE_STEPS":
      // console.log(" in INCREASE_STEPS");
      return { ...state, hasStepIncreased: action.payload };
    case "SETUP_ID":
      // console.log("in SETUP_ID");
      return { ...state, _id: action.payload };
    case "SETTINGS_ONLINE_SYNC":
      // console.log("in SETTINGS_ONLINE_SYNC")
      return { ...state, allowOnlineSync: action.payload };
    case "SETTINGS_NOTIFICATIONS":
      // console.log("in SETTINGS_NOTIFICATIONS")
      return { ...state, allowNotifications: action.payload };
    case "CURRENT_PAGE":
      // console.log(" in CURRENT_PAGE");
      return {
        ...state,
        currentPage: action.page,
        currentTitle: action.title
      };
    case "SETTINGS_NAME_CHANGE":
      // console.log("in SETTINGS_NAME_CHANGE")
      return { ...state, tammyName: action.payload };
    case "RESTORE_DATA":
      // console.log(" in RESTORE_DATA");
      let data = action.payload;
      data.satietyLevel = checkLimits(data.satietyLevel);
      data.energyLevel = checkLimits(data.energyLevel);
      data.joyLevel = checkLimits(data.joyLevel);
      return data;
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
      // console.log(" in HARD_RESET");
      return initState;
    default:
      return state;
  }
};

export default reducer;
