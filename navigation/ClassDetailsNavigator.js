import React from "react";
import { createStackNavigator} from "react-navigation";

import ClassDetailsScreen from '../screens/ClassDetailsScreen';
import StudentListScreen from '../screens/StudentListScreen';
import Add_StudentListScreen from '../screens/Add_StudentListScreen';
import CheckinDetailsScreen from '../screens/CheckinDetailsScreen';
import Add_CheckinScreen from '../screens/Add_CheckinScreen';
import StudentLogScreen from '../screens/StudentLogScreen';


const ClassDetailsStack = createStackNavigator({
  ClassDetails: { screen: ClassDetailsScreen },
  StudentList: { screen: StudentListScreen },
  StudentLog: { screen: StudentLogScreen},
  AddStudentList: { screen: Add_StudentListScreen },
  CheckinDetails: { screen: CheckinDetailsScreen},
  AddCheckin: { screen: Add_CheckinScreen }
  
});

ClassDetailsStack.navigationOptions = {
  tabBarVisible:true
};

export default ClassDetailsStack;