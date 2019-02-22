import myStore from "./Store";
import CONSTANTS from "./Constants";

let satietyLossRate = -CONSTANTS.satiety_level_max_points / (1 * 60);
let satietyGainRate = (15 / CONSTANTS.eat_timer) * 1000;
let energyLossRate = -CONSTANTS.energy_level_max_points / (100 * 60);
let energyGainRate = (20 / CONSTANTS.sleep_timer) * 1000;
let joyLossRate = -CONSTANTS.joy_level_max_points / (100 * 60);
let joyGainRate = (15 / CONSTANTS.play_timer) * 1000;

let isTammyDoingSomething = () => {
  if (myStore.getState().isTammyInUselessAnimation === true) return true;
  if (myStore.getState().isTammyEating === true) return true;
  if (myStore.getState().isTammySleeping === true) return true;
  if (myStore.getState().isTammyPlaying === true) return true;
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
    return true;
  }
  // console.log("Tammy does not need to be mad");
  return false;
};

let doesTammyNeedsToBeWeak = () => {
  if (
    myStore.getState().isTammyWeak === false &&
    isTammyDoingSomething() === false &&
    (myStore.getState().satietyLevel < 40 ||
      myStore.getState().energyLevel < 40 ||
      myStore.getState().joyLevel < 40)
  ) {
    return true;
  }
  // console.log("Tammy does not need to be weak");
  return false;
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
    return true;
  }
  // console.log("Tammy does not need to stop being mad or weak");
  return false;
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
  //is Tammy mad or weak?
  //does Tammy needs to stop being mad or weak?
  if (doesTammyNeedsToBeMad()) {
    // console.log("Tammy mad!");
    myStore.dispatch({ type: "MAKE_TAMMY_MAD" });
  } else if (doesTammyNeedsToBeWeak()) {
    // console.log("Tammy weak!");
    myStore.dispatch({ type: "MAKE_TAMMY_WEAK" });
  } else if (doesTammyNeedsToStopBeingMadOrWeak()) {
    // console.log("Tammy better");
    myStore.dispatch({ type: "MAKE_TAMMY_NOT_MAD_OR_WEAK" });
  }

  doesTammyNeedsToStopEating();
  doesTammyNeedsToStopSleeping();

  let satietyRate =
    myStore.getState().isTammyEating === true
      ? satietyGainRate
      : satietyLossRate;
  let energyRate =
    myStore.getState().isTammySleeping === true
      ? energyGainRate
      : energyLossRate;
  let joyLevel =
    myStore.getState().isTammyPlaying === true ? joyGainRate : joyLossRate;

  // console.log("rate:", satietyRate, energyRate, joyLevel);
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
    joyLevel: joyLevel
  });
};

export default gameEngine;
export { isTammyDoingSomething };
