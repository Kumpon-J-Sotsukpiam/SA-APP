import React from "react";
import { createStackNavigator} from "react-navigation";

import Student_ProfileScreen from '../screens/Student_ProfileScreen';


const StudentProfileStack = createStackNavigator({
  StudentProfile: Student_ProfileScreen,
});

StudentProfileStack.navigationOptions = {
  tabBarVisible:true
};

export default StudentProfileStack;