import React from 'react';
import { ScrollView, StyleSheet, View, Text,TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from 'react-native-elements';
import ContainerSemester from '../components/ContainerSemester';
import { calDurationsSemesterLeft } from "../src/actions/durations"

var dateCurent = new Date();
var dateEnd = '2019/12/31';

export default class CourseListScreen extends React.Component {

  constructor(props) {
    super(props);

      this.state = {
      semesterID:'Semester ID',
      course:'Course',
      students:'Total student',
      
    };
  }


 render() {

  return (
    <View style = {styles.container}>
      <Header
        
        leftComponent={(
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Semesters')}>
        <Ionicons
          name='md-arrow-back'
          size={35}
          color='#fff'
        />
        </TouchableOpacity>
        )}
        leftContainerStyle={{flex:2}}
        rightComponent={(<Ionicons name={'ios-add'}
        size={60}
        color={'#fff'}
        onPress={()=>{this.props.navigation.navigate('AddCourse')}}
      />)}
        rightContainerStyle={{flex:1}}
        centerComponent={(
        <View style={styles.containerHeader}>
          <View style={styles.containerTextHeader}>
            <Text style={styles.textHeader}>{this.state.semesterID}</Text>
          </View>
          <View style={styles.containerDurationsHeader}>
            <Text style={styles.durationsHeader}>Durations : {calDurationsSemesterLeft(dateCurent,dateEnd)}</Text>
          </View>
        </View>
        )}
        centerContainerStyle={{flex:10}}
        containerStyle={styles.containerStyle}
      />
     
        <ContainerSemester
          course={this.state.course}
          students={this.state.students}
          navigateCourseList={() => this.props.navigation.navigate('ClassList')}
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
  containerStyle:{
    backgroundColor: '#fd4176',
    height:120,
    justifyContent: 'space-around',
    borderBottomColor: '#be5f7a',
    borderBottomWidth: 1,
  },
});
