// import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import CheckNavigator from './CheckNavigator';
import AddSemesterNavigator from './AddSemesterNavigator';
import EditSemesterNavigator from './EditSemesterNavigator';
import AddCourseNavigator from './AddCourseNavigator';
import AddClassNavigator from './AddClassNavigator';
import ClassListNavigator from './ClassListNavigator';
import ClassDetailsNavigator from './ClassDetailsNavigator';
import EditCourseNavigator from './EditCourseNavigator';
import EditClassNavigator from './EditClassNavigator';
import EditStudentNavigator from './EditStudentNavigator';
import AddStudentNavigator from './AddStudentNavigator';
import StudentProfileNavigator from './StudentProfileNavigator';


// Loading Screens
import AuthLoading from "../screens/AuthLoadingScreen";
// Auth Screens
import Register from "../screens/Register";
import Login from "../screens/Login";



const AuthStackNavigator = createStackNavigator({
  SignIn: {
    screen:Login,
    navigationOptions: {
      header: null,
  }
  },
  SignUp: {
    screen:Register,
    navigationOptions: {
      header: null,
  }
  },
});



const AppContainer = createAppContainer(createSwitchNavigator({
    AuthLoading:AuthLoading,
    Auth:AuthStackNavigator,
    App: MainTabNavigator,
    CheckNavigator,
    AddSemesterNavigator,
    AddCourseNavigator,
    AddClassNavigator,
    ClassListNavigator,
    ClassDetailsNavigator,
    EditSemesterNavigator,
    EditCourseNavigator,
    EditClassNavigator,
    EditStudentNavigator,
    AddStudentNavigator,
    StudentProfileNavigator,
  })
);

export default AppContainer;
