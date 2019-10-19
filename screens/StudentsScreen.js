import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function StudentsScreen() {

  return (
    <View style = {styles.container}>
      
    </View>
  );
}

StudentsScreen.navigationOptions = {
  title: 'Students',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});