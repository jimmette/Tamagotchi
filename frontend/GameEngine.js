import myStore from "./Store";
import CONSTANTS from "./Constants";

let eatLossRatePerSecond = -CONSTANTS.eat_max_point / (5 * 60);
let eatGainRatePerSecond = (15 / CONSTANTS.eat_timer) * 1000;
let sleepLossRatePerSecond = -CONSTANTS.sleep_max_point / (5 * 60);
let sleepGainRatePerSecond = (20 / CONSTANTS.sleep_timer) * 1000;
let happinessLossRatePerSecond = -CONSTANTS.happiness_max_point / (1 * 60);
let happinessGainRatePerSecond = (15 / CONSTANTS.pet_timer) * 1000;

isTammyDoingSomething = () => {
  if (myStore.getState().doesTammyEat === true) return true;
  if (myStore.getState().doesTammySleep === true) return true;
  if (myStore.getState().doesTammyPlay === true) return true;
  return false;
};

doesTammyNeedsToBeMad = () => {
  if (
    myStore.getState().isTammyMad === false &&
    isTammyDoingSomething() === false &&
    (myStore.getState().statusPointsEat < 1 ||
      myStore.getState().statusPointsSleep < 1 ||
      myStore.getState().statusPointsHappiness < 1)
  ) {
    return true;
  }
  console.log("Tammy does not need to be mad");
  return false;
};

doesTammyNeedsToBeWeak = () => {
  if (
    myStore.getState().isTammyWeak === false &&
    isTammyDoingSomething() === false &&
    (myStore.getState().statusPointsEat < 40 ||
      myStore.getState().statusPointsSleep < 40 ||
      myStore.getState().statusPointsHappiness < 40)
  ) {
    return true;
  }
  console.log("Tammy does not need to be weak");
  return false;
};

doesTammyNeedsToStopBeingMadOrWeak = () => {
  console.log(
    myStore.getState().isTammyMad,
    myStore.getState().isTammyWeak,
    isTammyDoingSomething(),
    myStore.getState().statusPointsEat,
    myStore.getState().statusPointsSleep,
    myStore.getState().statusPointsHappiness
  );
  if (
    (myStore.getState().isTammyMad === true ||
      myStore.getState().isTammyWeak === true) &&
    isTammyDoingSomething() === false &&
    (myStore.getState().statusPointsEat > 50 &&
      myStore.getState().statusPointsSleep > 50 &&
      myStore.getState().statusPointsHappiness > 50)
  ) {
    return true;
  }
  console.log("Tammy does not need to stop being mad or weak");
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
  } else if (doesTammyNeedsToStopBeingMadOrWeak()) {
    console.log("Tammy better");
    myStore.dispatch({ type: "MAKE_TAMMY_NOT_MAD_OR_WEAK" });
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

  console.log("rate:", eatRate, sleepRate, happinessRate);
  console.log(
    "points:",
    myStore.getState().statusPointsEat,
    myStore.getState().statusPointsSleep,
    myStore.getState().statusPointsHappiness
  );
  console.log("isTammyMad", myStore.getState().isTammyMad);
  console.log("isTammyWeak", myStore.getState().isTammyWeak);
  myStore.dispatch({
    type: "ALL_STATUS_UPDATE",
    eatRate: eatRate,
    sleepRate: sleepRate,
    happinessRate: happinessRate
  });
};

export default gameEngine;
