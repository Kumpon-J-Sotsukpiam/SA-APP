import React from 'react';
import { ScrollView, StyleSheet, View, Text, Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from 'react-native-elements';
import ContainerClass from '../components/ContainerClass';

export default class ClassListScreen extends React.Component {
  constructor(props) {
    super(props);

      this.state = {
      courseID:this.props.navigation.state.params.courseID,
    };
  }


 render() {

  return (
    <View style = {styles.container}>
      <Header
        
        leftComponent={(
          <TouchableOpacity onPress={() => this.props.navigation.navigate('CourseList',{semesterID:'SemesterID'})}>
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
        onPress={()=>{this.props.navigation.navigate('AddClass',{courseID:this.state.courseID})}}
      />)}
        rightContainerStyle={{flex:1}}
        centerComponent={(
        <View style={styles.containerHeader}>
          <View style={styles.containerTextHeader}>
            <Text style={styles.textHeader}>{this.state.courseID}</Text>
          </View>
        </View>
        )}
        centerContainerStyle={{flex:10}}
        containerStyle={{
          backgroundColor: '#fd4176',
          height:120,
          justifyContent: 'space-around',
          borderBottomColor: '#be5f7a',
          borderBottomWidth: 1,
        }}
      />

        <ContainerClass
        Course={'Course'}
        Group={'Group'}
        Location={'Location'}
        StartEndTime={'Start - End Time'}
        Students={'The Number Of Student'}
        NavigateCamera={() => this.props.navigation.navigate('Camera',{classID:this.state.classID})}
        NavigateClassDetails={() => this.props.navigation.navigate('Camera',{classID:this.state.classID})}
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
});