import React from "react";
import { createStackNavigator} from "react-navigation";

import Edit_StudentScreen from '../screens/Edit_StudentScreen';


const EditStudentStack = createStackNavigator({
  EditStudent: { screen: Edit_StudentScreen},
});

EditStudentStack.navigationOptions = {
  tabBarVisible:true
};

export default EditStudentStack;