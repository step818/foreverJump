import { Image, View } from "react-native";

import React from "react";
import branch from "../../assets/images/branch.png";
import monkey from "../../assets/images/monkey.png";
import styles from "./renderers-styles";

const Jumper = ({ body, size }) => {
  const { position } = body;
  const sizeWidth = size[0];
  const sizeHeight = size[1];
  const x = position.x - sizeWidth / 2;
  const y = position.y + sizeHeight - 170;

  return (
    // <Image
    //   source={monkey}
    //   style={[
    //     styles.monkey,
    //     {
    //       left: x,
    //       top: y,
    //       width: sizeWidth,
    //       height: sizeHeight,
    //     },
    //   ]}
    // />
    <View
      style={[
        styles.monkey,
        {
          left: x,
          top: y,
          width: sizeWidth,
          height: sizeHeight,
          backgroundColor: "black",
        },
      ]}
    />
  );
};

const Branch = ({ body, size }) => {
  const { position } = body;
  const sizeWidth = size[0];
  const sizeHeight = size[1];
  const x = position.x - sizeWidth / 2;
  const y = position.y + sizeHeight - 50;

  return (
    // <Image
    //   source={branch}
    //   style={[
    //     styles.branch,
    //     {
    //       left: x,
    //       top: y,
    //       width: sizeWidth,
    //       height: sizeHeight,
    //     },
    //   ]}
    // />
    <View
      style={[
        styles.branch,
        {
          left: x,
          top: y,
          width: sizeWidth,
          height: sizeHeight,
          backgroundColor: "green",
        },
      ]}
    />
  );
};

// const Floor = ({ body, size }) => {
//   return <Image source={monkey} />;
// };

export { Jumper, Branch };
