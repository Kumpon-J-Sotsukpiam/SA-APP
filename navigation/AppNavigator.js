// import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import CheckNavigator from './CheckNavigator';
import AddSemesterNavigator from './AddSemesterNavigator';

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
  })
);

export default AppContainer;
