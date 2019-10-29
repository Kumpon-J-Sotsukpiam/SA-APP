import React from 'react';
import { ScrollView, StyleSheet, View, Text, Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from 'react-native-elements';
import ContainerClassList from '../components/ContainerClassList';

export default class ClassListScreen extends React.Component {
  constructor(props) {
    super(props);

      this.state = {
      courseID:'Course ID',
      classID:'Class ID',
      group:'Group',
      location:'Location',
      day:'Day',
      timeStart:'Start',
      timeEnd:'End',
      students:'Total Student',
    };
  }

 render() {

  return (
    <View style = {styles.container}>
      <Header
        
        leftComponent={(
          <TouchableOpacity onPress={() => this.props.navigation.navigate('CourseList')}>
        <Ionicons
          name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
          size={35}
          color='#fff'
        />
        </TouchableOpacity>
        )}
        leftContainerStyle={{flex:2}}
        rightComponent={(<Ionicons name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
        size={60}
        color={'#fff'}
        onPress={()=>{this.props.navigation.navigate('AddClass')}}
      />)}
        rightContainerStyle={{flex:1}}
        centerComponent={(
        <View style={styles.containerHeader}>
          <View style={styles.containerTextHeader}>
            <Text style={styles.textHeader}>{this.state.courseID}</Text>
          </View>
        </View>
        )}
        centerContainerStyle={{flex:9}}
        containerStyle={styles.containerStyle}
      />

        <ContainerClassList
        group={this.state.group}
        location={this.state.location}
        day={this.state.day}
        timeStart={this.state.timeStart}
        timeEnd={this.state.timeEnd}
        students={this.state.students}
        navigateCamera={() => this.props.navigation.navigate('Camera')}
        navigateClassDetails={() => this.props.navigation.navigate('ClassDetails')}
        />
        
    </View>
  );
}
}

ClassListScreen.navigationOptions = {
  header:null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  containerHeader: {
    flexDirection: 'column',
  },
  containerTextHeader: {
    flex: 2,
    justifyContent:'center',
    alignItems: 'center'
  },
  textHeader:{
      color: '#fff',
      fontSize:36,
      fontWeight:'bold'
  },
  containerDurationsHeader: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center'
  },
    durationsHeader:{
      color: '#fff',
      fontSize:14,
      fontWeight:'bold'
  },
  containerStyle:{
    backgroundColor: '#fd4176',
    height:120,
    justifyContent: 'space-around',
    borderBottomColor: '#be5f7a',
    borderBottomWidth: 1,
  },
});