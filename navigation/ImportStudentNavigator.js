import React from "react";
import { createStackNavigator} from "react-navigation";

import ImportStudentScreen from '../screens/ImportStudentScreen';


const ImportStudentStack = createStackNavigator({
  ImportStudent: { screen: ImportStudentScreen},
});

ImportStudentStack.navigationOptions = {
  tabBarVisible:true
};

export default ImportStudentStack;