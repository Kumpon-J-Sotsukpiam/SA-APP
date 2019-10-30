import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { IconButton } from 'react-native-paper';

const ContainerClassList = props => {
  
  return (

    <View style={styles.container}>

      <TouchableOpacity style={styles.containerClassDetails} onPress={props.navigateClassDetails}>
        <View style={styles.section1}>
          <Text style={styles.headerClassDetails}>{props.group}</Text>
          <Text style={styles.textClassDetails}>{props.location}</Text>
          <Text style={styles.textClassDetails}>{props.day} , {props.timeStart} - {props.timeEnd}</Text>
          <Text style={styles.textClassDetails}>{props.students}</Text>
        </View>
    
      <View style={styles.section2}>
        <IconButton
          icon='camera'
          color='#979797'
          size={60}
          onPress={props.navigateCamera}
          animated='true'
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
  containerClassDetails: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    margin: 10,
  },
  section1: {
    flex: 8,
    backgroundColor: '#fff',
  },
  section2: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerClassDetails:{
    fontSize:20,
    fontWeight: 'bold',
  },
  textClassDetails:{
    fontSize:16
  }

});

export default ContainerClassList;
