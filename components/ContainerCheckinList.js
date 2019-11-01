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

    <View style={{borderRadius:10}}>
    <TouchableOpacity style={styles.containerCheckinList} onPress={props.navigateCheckinList}>

    <View style={styles.section1}>
    <Text style={styles.header}>{props.dateCheckin}</Text>
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
    </View>
  );

  }

const styles = StyleSheet.create({

  containerCheckinList: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginBottom:3,
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

export default ContainerCheckinList;
