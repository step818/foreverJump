import { Image, View } from "react-native";

import React from "react";
import jumper from "../../assets/images/monkey.png";

const Jumper = ({ body, size }) => {
  // (width/2, height -170)
  const { position } = body;
  //  = 50
  const sizeWidth = size[0];
  // = 100
  const sizeHeight = size[1];
  // x =  (width/2)
  const x = position.x - sizeWidth / 2;
  const y = position.y + sizeHeight - 120;

  return (
    <Image
      source={jumper}
      style={[
        styles.rocket,
        {
          left: x,
          top: y,
          width: sizeWidth,
          height: sizeHeight,
        },
      ]}
    />
  );
};

const Branch = ({ body, size }) => {
  return <Image source={jumper} />;
};

const Floor = ({ body, size }) => {
  return <Image source={jumper} />;
};

export { Jumper, Floor, Branch };
