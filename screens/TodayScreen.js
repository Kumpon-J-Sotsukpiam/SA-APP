import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';

import { Header } from 'react-native-elements';
import ContainerClass from '../components/ContainerClass';

this.state = {
  FlatListNow: [],
  FlatListNext:[],
  showNow: false,
  showNext: false,
 };


 
export default class TodayScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      test:'Class id / TodayScreen',
    }
  }

  render() {


  return (

    <View style={styles.container}>
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

      <View style={styles.containerClass}>
      <Text style={styles.header}>Now</Text>
      </View>

        <ContainerClass
        Course={'Course'}
        Group={'Group'}
        Location={'Location'}
        StartEndTime={'Start - End Time'}
        Students={'The Number Of Student'}
        NavigateCamera={() => this.props.navigation.navigate('Camera',{test:this.state.test})}
        NavigateClassDetails={() => this.props.navigation.navigate('Camera',{test:'Test ClassDetails / TodayScreen'})}
        />

    <View style={styles.containerClass}>
        <Text style={styles.header}>Next</Text>
    </View>

      </View>
  );
}
}

TodayScreen.navigationOptions = {
  header:null
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  containerClass: {
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderColor: '#e8e8e8'

  },
  header: {
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10,
    marginBottom:5,
    fontSize: 22

  },
});
