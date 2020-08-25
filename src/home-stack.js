import Game from "./views/game/game";
import GameOver from "./views/landing/game-over";
import Landing from "./views/landing/landing";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const AppNavigator = createStackNavigator({
  Game: {
    screen: Game,
  },
  Landing: {
    screen: Landing,
  },
  GameOver: {
    screen: GameOver,
  },
});

export default createAppContainer(AppNavigator);
