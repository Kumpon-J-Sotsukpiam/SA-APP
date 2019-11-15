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

    <TouchableOpacity style={styles.container} onPress={props.navigateCourseList}>

    <View style={styles.section1}>
    <Text style={styles.textSemester}>{props.semester}</Text>
    </View>

    <View style={styles.section2}>
    <Text style={styles.textTotal}>{props.totalCourse}</Text>
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

  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    padding:3,
    borderRadius:10,
    justifyContent:'center'
  },
  section1: {
    flex: 5,
    backgroundColor: '#fff',
    justifyContent:'center'
  },
  section2: {
    flex: 2,
    justifyContent: 'center',
  },
  section3: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textSemester:{
    fontSize:20,
    fontWeight: 'bold',
    color:'#000',
  },
  textTotal:{
    fontSize:16,
    color:'#000',
  }

});

export default ContainerSemester;
