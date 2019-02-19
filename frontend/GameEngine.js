import myStore from "./Store";
import CONSTANTS from "./Constants";

let eatLossRatePerSecond = -CONSTANTS.eat_max_point / (1 * 60);
let eatGainRatePerSecond = (15 / CONSTANTS.eat_timer) * 1000;
let sleepLossRatePerSecond = -CONSTANTS.sleep_max_point / (5 * 60);
let sleepGainRatePerSecond = (20 / CONSTANTS.sleep_timer) * 1000;
let happinessLossRatePerSecond = -CONSTANTS.happiness_max_point / (5 * 60);
let happinessGainRatePerSecond = 15 / 4;

isTammyDoingSomething = () => {
  if (myStore.getState().doesTammyEat === true) return true;
  if (myStore.getState().doesTammySleep === true) return true;
  if (myStore.getState().doesTammyPlay === true) return true;
  return false;
};

doesTammyNeedsToBeMad = () => {
  if (
    (myStore.getState().statusPointsEat < 1 ||
      myStore.getState().statusPointSleep < 1 ||
      myStore.getState().statusPointHappiness < 1) &&
    myStore.getState().isTammyMad === false &&
    isTammyDoingSomething() === false
  ) {
    return true;
  }
  return false;
};

doesTammyNeedsToBeWeak = () => {
  if (
    (myStore.getState().statusPointsEat < 30 ||
      myStore.getState().statusPointSleep < 30 ||
      myStore.getState().statusPointHappiness < 30) &&
    myStore.getState().isTammyMad === false &&
    isTammyDoingSomething() === false
  ) {
    return true;
  }
  return false;
};

let gameEngine = () => {
  //is Tammy mad or weak?
  if (doesTammyNeedsToBeMad()) {
    console.log("Tammy mad!");
    myStore.dispatch({ type: "MAKE_TAMMY_MAD" });
  } else if (doesTammyNeedsToBeWeak()) {
    console.log("Tammy weak!");
    myStore.dispatch({ type: "MAKE_TAMMY_WEAK" });
  }

  //does Tammy needs to stop being mad or weak?

  let eatRate =
    myStore.getState().doesTammyEat === true
      ? eatGainRatePerSecond
      : eatLossRatePerSecond;
  let sleepRate =
    myStore.getState().doesTammySleep === true
      ? sleepGainRatePerSecond
      : sleepLossRatePerSecond;
  let happinessRate =
    myStore.getState().doesTammyPlay === true
      ? happinessGainRatePerSecond
      : happinessLossRatePerSecond;

  myStore.dispatch({
    type: "ALL_STATUS_UPDATE",
    eatRate: eatRate,
    sleepRate: sleepRate,
    happinessRate: happinessRate
  });
};

export default gameEngine;
