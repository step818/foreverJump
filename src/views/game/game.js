import { AppState, Dimensions } from "react-native";
import { Branch, Jumper } from "../../components/renderers";
import React, { PureComponent } from "react";

import { GameEngine } from "react-native-game-engine";
import Matter from "matter-js";
import { Physics } from "./systems";
import { get } from "lodash";

const INIT_COMPLEXITY = 2;
const { width, height } = Dimensions.get("window");

// let PLATFORM_COUNTER = 1;

class Game extends PureComponent {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);

    this.state = this.initState;
  }
  // componentDidMount() {
  //   Matter.Body.set(this.refs)
  // }

  componentWillUnmount() {
    this._subscription && this._subscription.remove();
    this._subcscription = null;
    AppState.removeEventListener("change", this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    this.setState({ appState: nextAppState });
  };

  // reloadApp = () => {
  //   const { engine } = this.state.entities.physics;
  //   Matter.World.clear(engine.world);
  //   Matter.Engine.clear(engine);
  //   Matter.Events.off(engine, "collisionStart");

  //   const newState = {
  //     ...this.initState,
  //   };
  //   this.setState(newState, () => {
  //     this.refs.engine.swap(newState.entities);
  //     // this.incrementScore();
  //   });
  // };

  // get obstacles() {
  //   const obstacles = {};
  //   const bodies = [];

  //   return { obstacles, bodies };
  // }

  // get branches() {
  //   const branches = {};
  //   for (let i = 0; i < PLATFORM_COUNTER; i++) {
  //     const size = 35;
  //     Object.assign(branches, {
  //       [`branch_${i}`]: {
  //         body: Matter.Bodies.rectangle(
  //           randomInt(18, width - 18),
  //           randomInt(0, -150),
  //           size,
  //           5,
  //           {
  //             label: "platform",
  //             isStatic: true,
  //           }
  //         ),
  //         size: [size, 5],
  //         renderer: Branch,
  //       },
  //     });
  //   }
  // }

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
    const jumper = Matter.Bodies.rectangle(width / 2, height - 170, 40, 80, {
      isStatice: false,
      xtilt: 0,
      label: "jumper",
    });
    const branch = Matter.Bodies.rectangle(width / 2, height - 50, 50, 15, {
      isStatic: true,
      label: "branch",
      isSensor: true,
    });
    // const { branches, branchesInWorld } = this.branches;
    // add the bodies to the world
    Matter.World.add(world, [jumper, branch]);

    return {
      physics: {
        engine,
        world,
      },
      // ...branches,
      jumper: { body: jumper, size: [40, 80], renderer: Jumper },
      branch: { body: branch, size: [50, 15], renderer: Branch },
    };
  }

  render() {
    const { entities, appState } = this.state;
    return (
      <GameEngine
        ref="engine"
        entities={entities}
        systems={[Physics]}
        running={appState === "active"}
      ></GameEngine>
    );
  }
}

export default Game;
