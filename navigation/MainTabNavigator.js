import React from "react";
import { Platform } from "react-native";
import { createStackNavigator, createBottomTabNavigator} from "react-navigation";

import TabBarIcon from '../components/TabBarIcon';
import { Ionicons } from '@expo/vector-icons';

// App
import TodayScreen from '../screens/TodayScreen'

// Semester Stack
import CourseListScreen from "../screens/CourseListScreen";
import SemestersScreen from '../screens/SemestersScreen';

// Check Stack
import CheckScreen from '../screens/CheckScreen';

// Student Stack
import StudentsScreen from '../screens/StudentsScreen';

import SettingsScreen from '../screens/SettingsScreen';




const TodayStack = createStackNavigator(
  {
    Today: TodayScreen,
  },
);

TodayStack.navigationOptions = {
  tabBarLabel: 'Today',
  tabBarIcon: ({focused}) => (
      <TabBarIcon 
      focused={focused}
      name={'ios-calendar' }
      size={35}
      /> 
  ),
};

TodayStack.path = '';

const SemestersStack = createStackNavigator(
  {
    Semesters: SemestersScreen,
    CourseList: CourseListScreen,
  },
);

SemestersStack.navigationOptions = {
  tabBarLabel: 'Semesters',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon 
    focused={focused}
    name={'ios-book'}
    />
  ),
};

SemestersStack.path = '';

const CheckStack = createStackNavigator({
  Check: { screen: CheckScreen },
});

CheckStack.navigationOptions = {
  tabBarLabel: 'Check',
  tabBarIcon: ({ focused }) => (

    <Ionicons
    name={'ios-camera'}
    size={80}
    style={{position:'absolute'}}
    color={focused ? '#fd4176' : 'gray'}
    
  />
  ),
};

CheckStack.path = '';;

const StudentsStack = createStackNavigator(
  {
    Students: StudentsScreen,
  
  },
  
);

StudentsStack.navigationOptions = {
  tabBarLabel: 'Students',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
    focused={focused}
    name={'ios-school'}
    />
  ),
};

StudentsStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon 
    focused={focused}
    name={'ios-settings'}
    />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  TodayStack,
  SemestersStack,
  CheckStack,
  StudentsStack,
  SettingsStack,
},{tabBarOptions: {
  activeTintColor: '#fd4176',
  labelStyle: {
    fontSize: 14,
    fontWeight: 'bold'
    
  },
  style: {
    height:60

  },
},

});

tabNavigator.path = '';

export default tabNavigator;