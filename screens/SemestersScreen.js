import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function SemestersScreen() {
  return (
    <View style = {styles.container}>
      
    </View>
  );
}

SemestersScreen.navigationOptions = {
  title: 'Semesters',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
