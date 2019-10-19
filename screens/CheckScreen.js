import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ContainerClass from '../components/ContainerClass';


export default class CheckScreen extends React.Component {
  constructor(props) {
    super(props);

      this.state = {
      test:'Class id / CheckScreen',
    }
  }

  render() {
  return (
    <View style = {styles.container}>
      <ScrollView>
        <ContainerClass
        Course={'Course'}
        Group={'Group'}
        Location={'Location'}
        StartEndTime={'Start - End Time'}
        Students={'The Number Of Student'}
        NavigateCamera={() => this.props.navigation.navigate('Camera',{test:this.state.test})}
        NavigateClassDetails={() => this.props.navigation.navigate('Camera',{test:'Test ClassDetails / CheckScreen'})}
        />
        </ScrollView>
    </View>
  );
}
}


CheckScreen.navigationOptions = {
  title: 'Check'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});