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
          {props.diff}
        </View>
        <View style={styles.section2}>
          <Text style={styles.headerClass}>{props.course}</Text>
          <Text style={styles.textClass}>{props.group}</Text>
          <Text style={styles.textClass}>{props.location}</Text>
          <Text style={styles.textClassDetails}>{props.day} , {props.timeStart} - {props.timeEnd}</Text>
          <Text style={styles.textClass}>Total Student {props.students}</Text>
        </View>
    
      <View style={styles.section3}>
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
    borderRadius:10,
    marginTop:5,
    marginLeft:5,
    marginRight:5
  },
  containerClass: {
    flexDirection: 'row',
    margin:10
  },
  section1: {
    flex: 2.5,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    borderColor:'gray',
    borderWidth:2,
    marginRight:5
  },
  section2: {
    flex: 6,
  },
  section3: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerClass: {
    fontSize:18,
    fontWeight: 'bold',
  },
  textClass: {
    fontSize:16
  },
  textDiff: {
    fontSize:16,
    fontWeight: 'bold',
  }
  
});

export default ContainerClass;
