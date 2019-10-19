import React from 'react';
import { IconButton } from 'react-native-paper';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const ContainerClass = props => {
  
  return (

    <View style={styles.container}>

    <TouchableOpacity style={styles.containerClass} onPress={props.NavigateClassDetails}>
    <View style={styles.section1}>
    <Text style={styles.header}>{props.Course}</Text>
    <Text style={styles.classDetails}>{props.Group}</Text>
    <Text style={styles.classDetails}>{props.Location}</Text>
    <Text style={styles.classDetails}>{props.StartEndTime}</Text>
    <Text style={styles.classDetails}>{props.Students}</Text>
    </View>
    
   

    <View style={styles.section2}>

    <IconButton
      icon='camera'
      color='#979797'
      size={60}
      onPress={props.NavigateCamera}
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
  containerClass: {
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
    justifyContent: 'center'
  },
  header:{
    fontSize:20,
    fontWeight: 'bold',
  },
  classDetails:{
    fontSize:16
  }

});

export default ContainerClass;
