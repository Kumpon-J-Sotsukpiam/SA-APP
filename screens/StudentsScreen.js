import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header } from 'react-native-elements';

export default function StudentsScreen() {

  return (
    <View style = {styles.container}>
      <Header
        centerComponent={({ text: 'Students', style:{color: '#fff', fontSize:36, fontWeight:'bold'} })}
        containerStyle={{
          backgroundColor: '#fd4176',
          height:120,
          justifyContent: 'space-around',
          borderBottomColor: '#be5f7a',
          borderBottomWidth: 1,
        }}
      />     
    </View>
  );
}

StudentsScreen.navigationOptions = {
  header:null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});