import React from "react";
import { createStackNavigator} from "react-navigation";

import ClassDetailsScreen from '../screens/ClassDetailsScreen';
import StudentListScreen from '../screens/StudentListScreen';
import TrainingModelScreen from '../screens/TrainingModelScreen';


const ClassDetailsStack = createStackNavigator({
  ClassDetails: { screen: ClassDetailsScreen },
  StudentList: { screen: StudentListScreen },
  TraingingModel: { screen: TrainingModelScreen },
});

ClassDetailsStack.navigationOptions = {
  tabBarVisible:true
};

export default ClassDetailsStack;