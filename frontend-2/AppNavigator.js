import { createStackNavigator, createAppContainer } from "react-navigation";
import DisplayHome from "./Display/DisplayHome";
import DisplayIntro from "./Display/DisplayIntro";

const AppNavigator = createStackNavigator(
  {
    Intro: DisplayIntro,
    Home: DisplayHome
  },
  {
    initialRouteName: "Intro"
  }
);

export default createAppContainer(AppNavigator);
