import * as Font from "expo-font";

import React, { PureComponent } from "react";

import { AppLoading } from "expo";
import AppNavigator from "./src/home-stack";
import { Asset } from "expo-asset";

export default class App extends PureComponent {
  state = {
    isLoadingComplete: false,
  };

  loadResourcesAsync = async () =>
    Promise.all([
      Asset.loadAsync([require("./assets/images/branch.png")]),
      Asset.loadAsync([require("./assets/images/monkey.png")]),
      Font.loadAsync({
        indieFlower: require("./assets/fonts/IndieFlower-Regular.ttf"),
      }),
    ]);

  handleLoadingError = (error) => {
    console.warn(error);
  };

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      );
    }

    return <AppNavigator />;
  }
}
