import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { Header } from 'react-native-elements';

const HeaderToday = props => {
  
  return (

    <View>
      <Header
          centerComponent={(

            <View style={styles.container}>
              <Text style={styles.textName}>{props.name}</Text>
              <Text style={styles.textDay}>{props.day}</Text>
              <Text style={styles.textDate}>{props.date}</Text>
            </View>
          )}

          containerStyle={styles.containerStyle}
        />

    </View>

   );

  }

const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
    alignItems:'center'
  },
  containerStyle: {
    backgroundColor: '#fd4176',
    height: 120,
    justifyContent: 'space-around',
    borderBottomColor: '#be5f7a',
    borderBottomWidth: 1,
  },
  textName: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold'
  },
  textDay: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  textDate: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },

});

export default HeaderToday;
