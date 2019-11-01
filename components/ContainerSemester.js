import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,  
} from 'react-native';

const ContainerSemester = props => {
  
  return (

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
  );

  }

const styles = StyleSheet.create({

  containerSemester: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    margin: 10,
    padding:3
  },
  section1: {
    flex: 4,
    backgroundColor: '#fff',
    justifyContent: 'center',
    
  },
  section2: {
    flex: 5,
    backgroundColor: '#fff',
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
