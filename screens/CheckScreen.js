import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ContainerClass from '../components/ContainerClass';
import { Header } from 'react-native-elements';

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
      <Header
        centerComponent={({ text: 'Today', style:{color: '#fff', fontSize:36, fontWeight:'bold'} })}
        containerStyle={{
          backgroundColor: '#fd4176',
          height:120,
          justifyContent: 'space-around',
          borderBottomColor: '#be5f7a',
          borderBottomWidth: 1,
        }}
      />     
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
  header:null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
});