import React from "react";
import { createStackNavigator} from "react-navigation";

import Add_CourseScreen from '../screens/Add_CourseScreen';


const AddCourseStack = createStackNavigator({
  AddCourse: { screen: Add_CourseScreen},
});

AddCourseStack.navigationOptions = {
  tabBarVisible:true
};

export default AddCourseStack;