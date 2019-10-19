import React from "react";
import { createStackNavigator} from "react-navigation";

import CameraScreen from '../screens/CameraScreen';
import Add_CheckinScreen from '../screens/Add_CheckinScreen';


const CheckInStack = createStackNavigator({
  Camera: { screen: CameraScreen},
  Add_Checkin: { screen: Add_CheckinScreen },
});

CheckInStack.navigationOptions = {
  tabBarVisible:true
};

export default CheckInStack;