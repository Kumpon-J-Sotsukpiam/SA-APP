import React from "react";
import { createStackNavigator} from "react-navigation";

import Edit_ClassScreen from '../screens/Edit_ClassScreen';


const EditClassStack = createStackNavigator({
  EditClass: { screen: Edit_ClassScreen},
});

EditClassStack.navigationOptions = {
  tabBarVisible:true
};

export default EditClassStack;