import React from "react";
import { createStackNavigator} from "react-navigation";

import Add_SemesterScreen from '../screens/Add_SemesterScreen';


const AddSemesterStack = createStackNavigator({
  AddSemester: { screen: Add_SemesterScreen},
});

AddSemesterStack.navigationOptions = {
  tabBarVisible:true
};

export default AddSemesterStack;