import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,  
} from 'react-native';

const ContainerCheckinList = props => {
  
  return (

    <TouchableOpacity style={styles.container} onPress={props.navigateCheckinList}>

    <View style={styles.section1}>
    <Text style={styles.header}>{props.course}{props.dateCheckin}</Text>
    </View>

    <View style={styles.section2}>
    <Text style={styles.semesterDetails}>{props.student}</Text>
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
    margin: 10,
  },
  section1: {
    flex: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    
  },
  section2: {
    flex: 2,
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
    fontSize:18,
    fontWeight: 'bold',
  },
  classDetails:{
    fontSize:16
  }

});

export default ContainerCheckinList;
