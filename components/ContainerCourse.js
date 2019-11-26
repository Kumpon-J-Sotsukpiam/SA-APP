import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,  
} from 'react-native';

const ContainerCourse = props => {
  
  return (

    <TouchableOpacity style={styles.container} onPress={props.navigateCourseList}>

    <View style={styles.section1}>
    <Text style={styles.textCourse}>{props.course}</Text>
    </View>

    <View style={styles.section2}>
    <Text style={styles.texTotal}>{props.totalClass}</Text>
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
    marginHorizontal:10,
    marginVertical:3,
    paddingVertical:5,
    paddingHorizontal:3,
    borderRadius:10,
    justifyContent:'center'
  },
  section1: {
    flex: 5,
    justifyContent: 'center',
    
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
  textCourse:{
    fontSize:16,
    fontWeight: 'bold',
  },
  texTotal:{
    fontSize:15
  }

});

export default ContainerCourse;
