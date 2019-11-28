import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { Header } from 'react-native-elements';

const Heading = props => {
  
  return (

    <View style={styles.container}>
      <Text style={styles.textName}>{props.name}</Text>
    </View>

   );

  }

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderColor: '#e8e8e8',
    justifyContent:'center',
    height:40,
  },
  textName: {
    fontWeight: 'bold',
    paddingLeft:10,
    fontSize: 20
  },
});

export default Heading;
