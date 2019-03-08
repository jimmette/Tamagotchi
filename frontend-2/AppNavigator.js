import { createStackNavigator, createAppContainer } from "react-navigation";
import DisplayHome from "./Display/DisplayHome";
import DisplayIntro from "./Display/DisplayIntro";
import AppController from "./AppController";
import { fromRight, fadeIn } from "react-navigation-transitions";

const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];

  // Custom transitions go there
  if (prevScene && prevScene.route.routeName === "Controller") {
    return fadeIn();
  }
  return fromRight();
};

const AppNavigator = createStackNavigator(
  {
    Intro: DisplayIntro,
    Home: DisplayHome,
    Controller: AppController
  },
  {
    initialRouteName: "Controller",
    headerMode: "none",
    transitionConfig: nav => handleCustomTransition(nav)
  }
);

export default createAppContainer(AppNavigator);
