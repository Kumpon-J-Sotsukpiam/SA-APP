import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,  
} from 'react-native';

import Swipeout from 'react-native-swipeout';

const ContainerSemester = props => {
  
  let swipeBtns = [{
    text: 'Delete',
    backgroundColor: 'red',
    underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
    onPress: () => {}
  }];

  
  return (
    

    <View style={styles.container}>
      <Swipeout left={swipeBtns}
              autoClose='true'
              backgroundColor= 'transparent'>

    <TouchableOpacity style={styles.containerSemester} onPress={props.navigateCourseList}>

    <View style={styles.section1}>
    <Text style={styles.header}>{props.course}{props.semester}</Text>
    </View>

    <View style={styles.section2}>
    <Text style={styles.semesterDetails}>{props.students}</Text>
    </View>

    <View style={styles.section3}>
      <Ionicons
      name='ios-arrow-forward'
      size={35}
      color='#979797'
    />
    </View>
    
    </TouchableOpacity>
    </Swipeout>
    </View>
  );

  }

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop:5,
    marginRight:10,
    marginLeft:10,
    borderRadius:10,
  },
  containerSemester: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    margin: 10,
  },
  section1: {
    flex: 4,
    backgroundColor: '#fff',
    justifyContent: 'center',
    
  },
  section2: {
    flex: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  section3: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    fontSize:20,
    fontWeight: 'bold',
  },
  classDetails:{
    fontSize:16
  }

});

export default ContainerSemester;
