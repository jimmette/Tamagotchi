import myStore from "./Store";
import CONSTANTES from "./Constantes";

let eatLossRatePerSecond = CONSTANTES.eat_max_point / (3 * 60);
let eatGainRatePerSecond = 15 / 4;
let sleepLossRatePerSecond = CONSTANTES.sleep_max_point / (5 * 60);
let sleepGainRatePerSecond = 15 / 4;
let happinessLossRatePerSecond = CONSTANTES.happiness_max_point / (7 * 60);
let happinessGainRatePerSecond = 15 / 4;

let gameEngine = () => {
  let eatRate =
    myStore.doesTammyEat === true ? eatGainRatePerSecond : eatLossRatePerSecond;
  let sleepRate =
    myStore.doesTammySleep === true
      ? sleepGainRatePerSecond
      : sleepLossRatePerSecond;
  let happinessRate =
    myStore.doesTammyPlay === true
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
