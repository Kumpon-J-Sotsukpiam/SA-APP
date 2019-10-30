import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,  
} from 'react-native';
import { CheckBox } from 'react-native-elements';






const ContainerStudentList = props => {
  
  return (
  
    <View style={{flexDirection:'row',padding:5,backgroundColor:'#fff',borderBottomColor:'#fd4176',borderBottomWidth:1,flexWrap:'wrap'}}>
    <View style={{flex:2,justifyContent:'center'}}>
      <Text style={{fontSize:16}}>{props.studentID}</Text>
    </View>
    <View style={{flex:2,justifyContent:'center'}}>
      <Text style={{fontSize:16}}>{props.name}</Text>
    </View>
    <View style={{flex:1,alignItems:'flex-end',justifyContent:'center'}}>

    </View>
  </View>

  )
    

  }

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop:5,
    marginRight:10,
    marginLeft:10,
    borderRadius:10,
  },

});

export default ContainerStudentList;
