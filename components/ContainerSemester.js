import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform
} from 'react-native';

const ContainerSemester = props => {
  
  return (

    <View style={styles.container}>

    <TouchableOpacity style={styles.containerSemester} onPress={props.NavigateCourseList}>

    <View style={styles.section1}>
    <Text style={styles.header}>{props.Semester}</Text>
    </View>

    <View style={styles.section2}>
    <Text style={styles.semesterDetails}>{props.Students}</Text>
    </View>

    <View style={styles.section3}>
      <Ionicons
      name={Platform.OS === 'ios' ? 'ios-arrow-forward' : 'md-arrow-forward'}
      size={35}
      color='#979797'
    />
    </View>
    
    </TouchableOpacity>
    </View>
  );

  }

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin:10,
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
