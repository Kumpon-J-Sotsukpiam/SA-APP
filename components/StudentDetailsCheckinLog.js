import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native';
import { Header } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

const StudentDetailsCheckinLog = props => {
  
  return (

    <View style={styles.container}>
      <View style={styles.section1}>
        <Text style={styles.textStdId}>{props.stdId}</Text>
        <Text style={styles.textName}>{props.name}</Text>
        <Text style={styles.textFaculty}>{props.faculty}</Text>
        <Text style={styles.textMajor}>{props.major}</Text>
      </View>
      <View style={styles.section2}>
        <Ionicons
          name='ios-analytics'
          size={70}
          color='#f7ebc3'
        />
        <Text style={styles.textPercentage}>{props.percentage}</Text>
      </View>
    </View>

   );

  }

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    padding:8,
    backgroundColor:'#fff',
    height:120,
    borderBottomColor: '#be5f7a',
    borderBottomWidth: 1,
  },
  section1: {
    alignItems:'flex-start',
    justifyContent:'center',
    flex:4,
    paddingTop:1
  },
  section2: {
    alignItems:'center',
    justifyContent:'center',
    flex:1.5,
  },
  textStdId: {
    color: '#1f1b24',
    fontSize: 22,
    fontWeight: 'bold'
  },
  textName: {
    color: '#1f1b24',
    fontSize: 18,
    fontWeight: 'bold'
  },
  textFaculty: {
    color: '#1f1b24',
    fontSize: 14,
    marginTop:5
  },
  textMajor: {
    color: '#1f1b24',
    fontSize: 14,
  },
  textPercentage: {
    color: '#1f1b24',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop:-10
  },
});

export default StudentDetailsCheckinLog;
