import React from "react";
import { createStackNavigator} from "react-navigation";

import CameraScreen from '../screens/CameraScreen';

const CheckInStack = createStackNavigator({
  Camera: { screen: CameraScreen},
});

CheckInStack.navigationOptions = {
  tabBarVisible:true
};

export default CheckInStack;