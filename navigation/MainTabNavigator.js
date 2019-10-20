import React from "react";
import { Platform } from "react-native";
import { createStackNavigator, createBottomTabNavigator} from "react-navigation";

import Colors from '../constants/Colors';
import TabBarIcon from '../components/TabBarIcon';
import { Ionicons } from '@expo/vector-icons';

// App
import TodayScreen from '../screens/TodayScreen'
import SemestersScreen from '../screens/SemestersScreen';
// Check Stack
import CheckScreen from '../screens/CheckScreen';

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
      name={Platform.OS === 'ios' ? 'ios-calendar' : 'md-calendar'}
      size={35}
      /> 
  ),
};

TodayStack.path = '';

const SemestersStack = createStackNavigator(
  {
    Semesters: SemestersScreen,
  },
);

SemestersStack.navigationOptions = {
  tabBarLabel: 'Semesters',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon 
    focused={focused}
    name={Platform.OS === 'ios' ? 'ios-book' : 'md-book'}
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
    name={Platform.OS === 'ios' ? 'ios-camera' : 'md-camera'}
    size={77}
    style={{ marginTop: -3,position:'absolute'}}
    color={focused ? '#fd4176' : Colors.tabIconDefault}
    
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
    name={Platform.OS === 'ios' ? 'ios-school' : 'md-school'}
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
    name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'}
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