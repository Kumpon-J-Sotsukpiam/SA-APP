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
      <TouchableOpacity style={styles.containerClass} onPress={props.navigateClassDetails}>
        <View style={styles.section1}>
          <Text style={styles.headerClass}>{props.course}</Text>
          <Text style={styles.textClass}>{props.group}</Text>
          <Text style={styles.textClass}>{props.location}</Text>
          <Text style={styles.textClassDetails}>{props.day} , {props.timeStart} - {props.timeEnd}</Text>
          <Text style={styles.textClass}>{props.students}</Text>
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
    marginTop:5,
    marginLeft:5,
    marginRight:5,
    borderRadius:10, 
  },
  containerClass: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    margin:10
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
  headerClass:{
    fontSize:20,
    fontWeight: 'bold',
  },
  textClass:{
    fontSize:16
  },
  
});

export default ContainerClass;
