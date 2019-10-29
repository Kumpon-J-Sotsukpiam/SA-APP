import React from "react";
import { createStackNavigator} from "react-navigation";

import ClassDetailsScreen from '../screens/ClassDetailsScreen';
import StudentListScreen from '../screens/StudentListScreen';
import TrainingModelScreen from '../screens/TrainingModelScreen';
import Add_StudentListScreen from '../screens/Add_StudentListScreen';


const ClassDetailsStack = createStackNavigator({
  ClassDetails: { screen: ClassDetailsScreen },
  StudentList: { screen: StudentListScreen },
  TraingingModel: { screen: TrainingModelScreen },
  AddStudentList: { screen: Add_StudentListScreen },
});

ClassDetailsStack.navigationOptions = {
  tabBarVisible:true
};

export default ClassDetailsStack;