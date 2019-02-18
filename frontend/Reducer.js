const initState = {
  skillPointsEat: 50,
  skillPointsSleep: 100,
  skillPointsPlay: 75
};

function reducer(state = initState, action) {
  switch (action.type) {
    case "MAKE_TAMMY_EAT":
      console.log(" in MAKE_TAMMY_EAT");
      let newState = { ...state };
      newState.skillPointsEat = state.skillPointsEat + 10;
      // newState.skillPointsEat > 100
      //   ? (newState.skillPointsEat = 100)
      //   : undefined;
      return newState;

    default:
      return state;
  }
}

export default reducer;
