import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={35}
      style={{ marginBottom: -7 }}
      color={props.focused ? '#fd4176' : Colors.tabIconDefault}
      
    />
  );
}
