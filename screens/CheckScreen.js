import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ContainerClass from '../components/ContainerClass';
import { Header } from 'react-native-elements';

export default class CheckScreen extends React.Component {
  constructor(props) {
    super(props);

      this.state = {
        course:'Course',
        group:'Group',
        location:'Location',
        day:'Day',
        timeStart:'Start',
        timeEnd:'End',
        students:'Total Student',
      
    }
  }

  render() {
  return (
    <View style = {styles.container}>
      <Header
        centerComponent={({ text: 'Check-in', style:{color: '#fff', fontSize:36, fontWeight:'bold'} })}
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
          course={this.state.course}
          group={this.state.group}
          location={this.state.location}
          day={this.state.day}
          timeStart={this.state.timeStart}
          timeEnd={this.state.timeEnd}
          students={this.state.students}
          navigateCamera={() => this.props.navigation.navigate('Camera')}
          navigateClassDetails={() => this.props.navigation.navigate('ClassDetails')}
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