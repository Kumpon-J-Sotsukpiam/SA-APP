import React from 'react';
import { ScrollView, StyleSheet, View, Text, Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from 'react-native-elements';
import ContainerSemester from '../components/ContainerSemester';
import { calDurations } from "../src/actions/durations"

var dateStarts = '2562/10/1';
var dateEnds = '2562/10/1';

export default class CourseListScreen extends React.Component {
  constructor(props) {
    super(props);

      this.state = {
      semesterID:this.props.navigation.state.params.semesterID,
      courseID : 'Course ID'
    };
  }


 render() {

  return (
    <View style = {styles.container}>
      <Header
        
        leftComponent={(
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Semesters')}>
        <Ionicons
          name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
          size={35}
          color='#fff'
        />
        </TouchableOpacity>
        )}
        leftContainerStyle={{flex:1}}
        rightComponent={(<Ionicons name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
        size={60}
        color={'#fff'}
        onPress={()=>{this.props.navigation.navigate('AddCourse',{semesterID:this.state.semesterID})}}
      />)}
        rightContainerStyle={{flex:1}}
        centerComponent={(
        <View style={styles.containerHeader}>
          <View style={styles.containerTextHeader}>
            <Text style={styles.textHeader}>{this.state.semesterID}</Text>
          </View>
          <View style={styles.containerDurationsHeader}>
            <Text style={styles.durationsHeader}>Durations : {calDurations(dateStarts,dateEnds)}</Text>
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

        <ContainerSemester
        Semester={'Course'}
        Students={'Total student'}
        NavigateCourseList={() => this.props.navigation.navigate('Camera',{courseID:this.state.courseID})}
        />
    </View>
  );
}
}

CourseListScreen.navigationOptions = {
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