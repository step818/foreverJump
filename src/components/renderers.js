import { Image, View } from "react-native";

import React from "react";
import monkey from "../../assets/images/monkey.png";
import styles from "./renderers-styles";

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
      source={monkey}
      style={[
        styles.monkey,
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
  return <Image source={monkey} />;
};

const Floor = ({ body, size }) => {
  return <Image source={monkey} />;
};

export { Jumper, Floor, Branch };
