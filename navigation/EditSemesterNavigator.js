import React from "react";
import { createStackNavigator} from "react-navigation";

import Edit_SemesterScreen from '../screens/Edit_SemesterScreen';


const EditSemesterStack = createStackNavigator({
  EditSemester: { screen: Edit_SemesterScreen},
});

EditSemesterStack.navigationOptions = {
  tabBarVisible:true
};

export default EditSemesterStack;