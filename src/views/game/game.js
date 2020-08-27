import { AppState, Dimensions, StatusBar } from "react-native";
import { Branch, Jumper } from "../../components/renderers";
import { Physics, Tilt } from "./systems";
import React, { PureComponent } from "react";

import { Accelerometer } from "expo-sensors";
import { GameEngine } from "react-native-game-engine";
import Matter from "matter-js";
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
  componentDidMount() {
    this._subscription = Accelerometer.addListener(({ x }) => {
      Matter.Body.set(this.refs.engine.state.entities.jumper.body, {
        xtilt: x,
      });
    });

    AppState.addEventListener("change", this.handleAppStateChange);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   const { complexity } = this.state;
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

  setupCollisionHandler = (engine) => {
    Matter.Events.on(engine, "collisionStart", (event) => {
      const { pairs } = event;
      const objA = pairs[0].bodyA.label;
      const objB = pairs[0].bodyB.label;
      if (objA === "jumper" && objB === "platform") {
        Matter.Body.setPosition(pairs[0].bodyA, {
          x: width / 2,
          y: height - 50,
        });
      }
    });
  };

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
    // Matter.Engine.Create -  creates our bodies to put in the world
    const { world } = engine;
    const jumper = Matter.Bodies.rectangle(width / 2, height - 1000, 40, 80, {
      isStatic: false,
      xtilt: 0,
      restitution: 0.4,
      friction: 0.8,
      label: "jumper",
    });
    const branch = Matter.Bodies.rectangle(width / 2, height - 50, 1000, 500, {
      isStatic: true,
      label: "platform",
      isSensor: true,
      friction: 1,
      restitution: 0.8,
    });
    // const { branches, branchesInWorld } = this.branches;
    console.log(jumper);
    console.log(branch);
    this.setupCollisionHandler(engine);
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
        systems={[Physics, Tilt]}
        running={appState === "active"}
      >
        <StatusBar hidden />
      </GameEngine>
    );
  }
}

export default Game;
