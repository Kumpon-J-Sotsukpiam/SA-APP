import React from "react";
import { createStackNavigator} from "react-navigation";

import Add_StudentScreen from '../screens/Add_StudentScreen';


const AddStudentStack = createStackNavigator({
  AddStudent: { screen: Add_StudentScreen},
});

AddStudentStack.navigationOptions = {
  tabBarVisible:true
};

export default AddStudentStack;