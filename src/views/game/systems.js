import { Dimensions } from "react-native";
import Matter from "matter-js";

// use the width and height of the screen
const { width, height } = Dimensions.get("window");

const Tilt = (state) => {
  const { jumper } = state;
  const xTilt = jumper.body.xtilt;
  let xPos = jumper.body.position.x;
  xPos += xTilt * 20;

  Matter.Body.setPosition(jumper.body, {
    x: xPos,
    y: jumper.body.position.y,
  });

  return state;
};

const Bounce = (entities, state) => {
  const { jumper } = state;
  const platform = Object.values(entities).filter(
    (item) => (item.body == item.body.label) == "platform"
  );
};

const Physics = (entities, { time }) => {
  const { engine } = entities.physics;
  engine.world.gravity.y = 0.7;
  Matter.Engine.update(engine, time.delta);
  return entities;
};

export { Physics, Tilt };
