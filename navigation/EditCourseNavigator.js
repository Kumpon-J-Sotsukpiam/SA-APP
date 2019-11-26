import React from "react";
import { createStackNavigator} from "react-navigation";

import Edit_CourseScreen from '../screens/Edit_CourseScreen';


const EditCourseStack = createStackNavigator({
  EditCourse: { screen: Edit_CourseScreen},
});

EditCourseStack.navigationOptions = {
  tabBarVisible:true
};

export default EditCourseStack;