import myStore from "./Store";
import CONSTANTES from "./Constantes";

let eatLossRatePerSecond = CONSTANTES.eat_max_point / (0.25 * 60);
let eatGainRatePerSecond = 15 / 4;
let sleepLossRatePerSecond = CONSTANTES.sleep_max_point / (2 * 60);
let sleepGainRatePerSecond = 15 / 4;
let happinessLossRatePerSecond = CONSTANTES.happiness_max_point / (3 * 60);
let happinessGainRatePerSecond = 15 / 4;

let gameEngine = () => {
  //is Tammy mad?

  if (
    (myStore.getState().statusPointsEat < 10 ||
      myStore.getState().statusPointSleep < 10 ||
      myStore.getState().statusPointHappiness < 10) &&
    myStore.getState().isTammyMad === false
  ) {
    console.log("Tammy mad!");
    myStore.dispatch({ type: "MAKE_TAMMY_MAD" });
  }
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
    type: "STATUS_UPDATE",
    eatRate: eatRate,
    sleepRate: sleepRate,
    happinessRate: happinessRate
  });
};

export default gameEngine;
