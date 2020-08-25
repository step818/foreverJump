import { Branch, Floor, Jumper } from "../../components/renderers";
import React, { PureComponent } from "react";

import { GameEngine } from "react-native-game-engine";
import Matter from "matter-js";
import { get } from "lodash";

class Game extends PureComponent {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = this.initState;
  }

  get obstacles() {
    const obstacles = {};
    const bodies = [];

    return { obstacles, bodies };
  }

  get initState() {
    return {
      complexity: INIT_COMPLEXITY,
      score: 0,
      entities: this.entities,
      showOverlay: false,
      appState: "active",
      objectCounter: 1,
    };
  }

  get entities() {
    const engine =
      get(this, "state.entities.physics.engine") ||
      Matter.Engine.create({ enableSleeping: false });
    const { world } = engine;
    const jumper = Matter.Bodies.rectangle(width / 2, height - 170, 25, 40, {
      isStatice: false,
      xtilt: 0,
      label: "jumper",
    });
    Matter.World.add(world, [jumper]);

    return {
      physics: {
        engine,
        world,
      },
      jumper: { body: jumper, size: [50, 100], renderer: Jumper },
    };
  }

  render() {
    return (
      <GameEngine
        ref="engine"
        entities={entities}
        running={appState === "active"}
      ></GameEngine>
    );
  }
}

export default Game;
