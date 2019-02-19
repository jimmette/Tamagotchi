import CONSTANTES from "./Constantes";

const initState = {
  statusPointsEat: 100,
  statusPointsSleep: 100,
  statusPointsHappiness: 100,
  doesTammyEat: false,
  doesTammySleep: false,
  doesTammyPlay: false
};

function reducer(state = initState, action) {
  let newState = 0;
  switch (action.type) {
    case "MAKE_TAMMY_EAT":
      console.log(" in MAKE_TAMMY_EAT");
      newState = state.statusPointsEat + 10;
      newState =
        newState > CONSTANTES.eat_max_point
          ? CONSTANTES.eat_max_point
          : newState;
      return { ...state, statusPointsEat: newState };
    case "MAKE_TAMMY_SLEEP":
      console.log(" in MAKE_TAMMY_SLEEP");
      newState = state.statusPointsSleep + 10;
      newState =
        newState > CONSTANTES.sleep_max_point
          ? CONSTANTES.sleep_max_point
          : newState;
      return { ...state, statusPointsSleep: newState };
    case "MAKE_TAMMY_PLAY":
      console.log(" in MAKE_TAMMY_PLAY");
      newState = state.statusPointsHappiness + 10;
      newState =
        newState > CONSTANTES.happiness_max_point
          ? CONSTANTES.happiness_max_point
          : newState;
      return { ...state, statusPointsHappiness: newState };
    case "STATUS_UPDATE":
      let newEat = state.statusPointsEat - action.eatRate;
      newEat = newEat < 0 ? 0 : newEat;
      newEat =
        newEat > CONSTANTES.eat_max_point ? CONSTANTES.eat_max_point : newEat;
      let newSleep = state.statusPointsSleep - action.sleepRate;
      newSleep = newSleep < 0 ? 0 : newSleep;
      newSleep =
        newSleep > CONSTANTES.sleep_max_point
          ? CONSTANTES.sleep_max_point
          : newSleep;
      let newHappiness = state.statusPointsHappiness - action.happinessRate;
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
