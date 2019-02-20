import CONSTANTES from "./Constants";
import SpriteTable from "./SpriteTable";

const initState = {
  statusPointsEat: 100,
  statusPointsSleep: 100,
  statusPointsHappiness: 100,
  doesTammyEat: false,
  doesTammySleep: false,
  doesTammyPlay: false,
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
      return {
        ...state,
        spriteAnimation: SpriteTable.animationTypes[9],
        isTammyMad: true
      };
    case "MAKE_TAMMY_WEAK":
      return {
        ...state,
        spriteAnimation: SpriteTable.animationTypes[11],
        isTammyWeak: true
      };
    case "MAKE_TAMMY_NOT_MAD_OR_WEAK":
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
        doesTammyEat: true,
        spriteAnimation: SpriteTable.animationTypes[3]
      };
    case "MAKE_TAMMY_STOP_EAT":
      console.log(" in MAKE_TAMMY_STOP_EAT");
      return {
        ...state,
        doesTammyEat: false,
        spriteAnimation: whatIsTammyMoodAnimation()
      };
    case "MAKE_TAMMY_YAWN":
      console.log(" in MAKE_TAMMY_YAWN");
      return {
        ...state,
        doesTammySleep: true,
        spriteAnimation: SpriteTable.animationTypes[6]
      };
    case "MAKE_TAMMY_SLEEP":
      console.log(" in MAKE_TAMMY_SLEEP");
      return {
        ...state,
        doesTammySleep: true,
        spriteAnimation: SpriteTable.animationTypes[8]
      };
    case "MAKE_TAMMY_STOP_SLEEP":
      console.log(" in MAKE_TAMMY_STOP_SLEEP");
      return {
        ...state,
        doesTammySleep: false,
        spriteAnimation: whatIsTammyMoodAnimation()
      };
    case "MAKE_TAMMY_PLAY":
      console.log(" in MAKE_TAMMY_PLAY");

      return {
        ...state,
        doesTammyPlay: true,
        spriteAnimation: SpriteTable.animationTypes[3]
      };
    case "MAKE_TAMMY_STOP_PLAY":
      console.log(" in MAKE_TAMMY_STOP_PLAY");
      return {
        ...state,
        doesTammyPlay: false,
        spriteAnimation: whatIsTammyMoodAnimation()
      };
    case "ALL_STATUS_UPDATE":
      let newEat = state.statusPointsEat + action.eatRate;
      newEat = newEat < 0 ? 0 : newEat;
      newEat =
        newEat > CONSTANTES.eat_max_point ? CONSTANTES.eat_max_point : newEat;
      let newSleep = state.statusPointsSleep + action.sleepRate;
      newSleep = newSleep < 0 ? 0 : newSleep;
      newSleep =
        newSleep > CONSTANTES.sleep_max_point
          ? CONSTANTES.sleep_max_point
          : newSleep;
      let newHappiness = state.statusPointsHappiness + action.happinessRate;
      newHappiness = newHappiness < 0 ? 0 : newHappiness;
      newHappiness =
        newHappiness > CONSTANTES.happiness_max_point
          ? CONSTANTES.happiness_max_point
          : newHappiness;
      return {
        ...state,
        statusPointsEat: newEat,
        statusPointsSleep: newSleep,
        statusPointsHappiness: newHappiness
      };
    default:
      return state;
  }
}

export default reducer;
