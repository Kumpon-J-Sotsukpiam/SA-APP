import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
export default class Add_CheckinScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: this.props.navigation.state.params.testAdd,
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.test}</Text>
      </View>
    );
  }
}
Add_CheckinScreen.navigationOptions = {
  title: 'Add Check-in',
  headerTintColor: '#000000',
  headerTitleStyle: { fontWeight: 'bold' },

};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});