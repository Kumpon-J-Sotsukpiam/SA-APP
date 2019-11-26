import React from "react";
import { createStackNavigator} from "react-navigation";

import Add_ClassScreen from '../screens/Add_ClassScreen';


const AddClassStack = createStackNavigator({
  AddClass: { screen: Add_ClassScreen},
});

AddClassStack.navigationOptions = {
  tabBarVisible:true
};

export default AddClassStack;