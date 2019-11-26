import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const ContainerMenu = props => {
  return (
    <View style={styles.container}>
    <TouchableOpacity
        style={styles.ContainerMenu}
        onPress={props.onPress}>
    <View style={styles.section1}>
    <Text style={styles.header}>{props.Name}</Text>
    </View>
    <View style={styles.section3}>
      <Ionicons
        name={'ios-arrow-forward'}
        size={35}
        color='red'
        />
    </View>
    </TouchableOpacity>
    </View>
  );

  }

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f3f3',
    margin:10,
    borderRadius:10,
    
  },
  ContainerMenu: {
    flexDirection: 'row',
    margin: 10,
  },
  section1: {
    flex: 4,
    justifyContent: 'center',
    
  },
  section2: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section3: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    fontSize:20,
    fontWeight: 'bold',
    color:'red'
  }
});

export default ContainerMenu;
