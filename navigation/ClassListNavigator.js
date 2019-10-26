import React from "react";
import { createStackNavigator} from "react-navigation";

import ClassListScreen from '../screens/ClassListScreen';

const ClassListStack = createStackNavigator({
  ClassList: { screen: ClassListScreen},
});

ClassListStack.navigationOptions = {
  tabBarVisible:true
};

export default ClassListStack;