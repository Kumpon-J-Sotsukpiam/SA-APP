import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Header } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

const HeaderCheckinLog = props => {
  
  return (

    <View>

      <Header
          leftComponent={(

           
              <TouchableOpacity onPress={props.backBtn}>
                
                  <Ionicons
                    name='ios-arrow-back'
                    size={35}
                    color='#fff'
                  />
                
              </TouchableOpacity>
    
                        )}

          centerComponent={({ text: props.name, style:{color: '#fff', fontSize:24, fontWeight:'bold'} })}
 
          containerStyle={styles.containerStyle}
        />

     

    </View>

   );

  }

const styles = StyleSheet.create({
  containerStyle:{
    backgroundColor: '#fd4176',
    height: 70,
    justifyContent: 'space-around',
    borderBottomColor: '#be5f7a',
    borderBottomWidth: 1,
  },
});

export default HeaderCheckinLog;
