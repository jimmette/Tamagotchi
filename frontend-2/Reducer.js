const iniState = {
  tammyName: "Tammy",
  tammyWasBornOn: new Date(),
  displayFooterOption: "NONE",
  nbCarrots: 0,
  nbApples: 0
};

reducer = (state = iniState, action) => {
  switch (action.type) {
    case "SET_FOOTER_DISPLAY":
      // console.log("in SET_FOOTER_DISPLAY");
      return {
        ...state,
        displayFooterOption: action.payload.option
      };
    default:
      return state;
  }
};

export default reducer;
