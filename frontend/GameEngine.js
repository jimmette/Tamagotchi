import myStore from "./Store";
import CONSTANTS from "./Constants";
import { NORMAL_RATES, WALKING_RATES } from "./Constants";

let isTammyDoingSomething = () => {
  if (myStore.getState().isTammyInUselessAnimation === true) return true;
  if (myStore.getState().isTammyEating === true) return true;
  if (myStore.getState().isTammySleeping === true) return true;
  if (myStore.getState().isTammyPlaying === true) return true;
  if (myStore.getState().isTammyWalking === true) return true;
  return false;
};

let doesTammyNeedsToBeMad = () => {
  if (
    myStore.getState().isTammyMad === false &&
    isTammyDoingSomething() === false &&
    (myStore.getState().satietyLevel < 1 ||
      myStore.getState().energyLevel < 1 ||
      myStore.getState().joyLevel < 1)
  ) {
    myStore.dispatch({ type: "MAKE_TAMMY_MAD" });
  }
  // console.log("Tammy does not need to be mad");
};

let doesTammyNeedsToBeWeak = () => {
  if (
    myStore.getState().isTammyWeak === false &&
    isTammyDoingSomething() === false &&
    (myStore.getState().satietyLevel < 40 ||
      myStore.getState().energyLevel < 40 ||
      myStore.getState().joyLevel < 40)
  ) {
    myStore.dispatch({ type: "MAKE_TAMMY_WEAK" });
  }
  // console.log("Tammy does not need to be weak");
};

let doesTammyNeedsToYawn = () => {
  if (myStore.getState().isTammyWeak === false) return false;

  //make the stuff
};

let doesTammyNeedsToStopBeingMadOrWeak = () => {
  if (
    (myStore.getState().isTammyMad === true ||
      myStore.getState().isTammyWeak === true) &&
    isTammyDoingSomething() === false &&
    (myStore.getState().satietyLevel > 50 &&
      myStore.getState().energyLevel > 50 &&
      myStore.getState().joyLevel > 50)
  ) {
    myStore.dispatch({ type: "MAKE_TAMMY_NOT_MAD_OR_WEAK" });
  }
  // console.log("Tammy does not need to stop being mad or weak");
};

doesTammyNeedsToStopEating = () => {
  if (
    myStore.getState().isTammyEating === true &&
    myStore.getState().isTammyInUselessAnimation === false &&
    myStore.getState().satietyLevel === CONSTANTS.satiety_level_max_points
  ) {
    myStore.dispatch({ type: "MAKE_TAMMY_STOP_EAT" });
    //Display I'm full. Thank you!
    myStore.dispatch({
      type: "DISPLAY_MESSAGE",
      payload: "I'm full. Thank you!"
    });
    setTimeout(() => {
      myStore.dispatch({ type: "DISPLAY_MESSAGE", payload: "" });
    }, CONSTANTS.animation_interruption_messages);
  }
};

doesTammyNeedsToStopSleeping = () => {
  if (
    myStore.getState().isTammySleeping === true &&
    myStore.getState().isTammyInUselessAnimation === false &&
    myStore.getState().energyLevel === CONSTANTS.energy_level_max_points
  ) {
    myStore.dispatch({ type: "MAKE_TAMMY_STOP_SLEEP" });
    myStore.dispatch({ type: "CURRENT_PAGE", payload: CONSTANTS.homepage });
    //Display I'm well rested. Thank you!
    myStore.dispatch({
      type: "DISPLAY_MESSAGE",
      payload: "I'm well rested. Thank you!"
    });
    setTimeout(() => {
      myStore.dispatch({ type: "DISPLAY_MESSAGE", payload: "" });
    }, CONSTANTS.animation_interruption_messages);
  }
};

let gameEngine = () => {
  doesTammyNeedsToBeMad();
  doesTammyNeedsToBeWeak();
  doesTammyNeedsToYawn(); //Pas encore fait
  doesTammyNeedsToStopBeingMadOrWeak();
  doesTammyNeedsToStopEating();
  doesTammyNeedsToStopSleeping();

  let satietyRate = NORMAL_RATES.satietyLossRate;
  let energyRate = NORMAL_RATES.energyLossRate;
  let joyRate = NORMAL_RATES.joyLossRate;

  if (myStore.getState().isTammyWalking === true) {
    // console.log("in isTammyWalking = true");
    satietyRate =
      myStore.getState().isTammyEating === true
        ? WALKING_RATES.satietyGainRateWhenWalking
        : WALKING_RATES.satietyLossRateWhenWalking;
    energyRate =
      myStore.getState().isTammySleeping === true
        ? WALKING_RATES.energyGainRateWhenWalking
        : WALKING_RATES.energyLossRateWhenWalking;
    joyRate =
      myStore.getState().hasStepIncreased === true
        ? WALKING_RATES.joyGainRateWhenWalking
        : WALKING_RATES.joyLossRateWhenWalking;
  } else if (myStore.getState().isTammyEating === true) {
    // console.log("in isTammyEating = true");
    satietyRate = NORMAL_RATES.satietyGainRate;
  } else if (myStore.getState().isTammySleeping === true) {
    // console.log("in isTammySleeping = true");
    energyRate = NORMAL_RATES.energyGainRate;
  } else if (myStore.getState().isTammyPlaying === true) {
    // console.log("in isTammyPlaying = true");
    joyRate = NORMAL_RATES.joyGainRate;
  }

  // console.log("rate:", satietyRate, energyRate, joyRate);
  // console.log(
  //   "points:",
  //   myStore.getState().satietyLevel,
  //   myStore.getState().energyLevel,
  //   myStore.getState().joyLevel
  // );
  // console.log("isTammyMad", myStore.getState().isTammyMad);
  // console.log("isTammyWeak", myStore.getState().isTammyWeak);
  myStore.dispatch({
    type: "ALL_STATUS_UPDATE",
    satietyRate: satietyRate,
    energyRate: energyRate,
    joyRate: joyRate
  });
};

export default gameEngine;
export { isTammyDoingSomething };
