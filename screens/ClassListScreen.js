import React from 'react';
import { ScrollView, StyleSheet, View, Text, Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from 'react-native-elements';
import ContainerClassList from '../components/ContainerClassList';
import {get_class} from '../src/actions/class'
import {connect} from 'react-redux'
class ClassListScreen extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        course: [],
        semesterID:''
    };
  }
  componentWillMount(){
    const {courseId,semesterID} = this.props.navigation.state.params
    log = this.props.course.filter((i) => i._id === courseId)
    this.setState({
      course:log[0],
      semesterID:semesterID
    })
    get_class(courseId,this.props)
  } 
 render() {
  console.log('====================================');
  console.log(this.props.class);
  console.log('====================================');
  return (
    <View style = {styles.container}>
      <Header
        
        leftComponent={(
          <TouchableOpacity onPress={() => this.props.navigation.navigate('CourseList',{semesterID:this.state.semesterID})}>
        <Ionicons
          name='ios-arrow-back'
          size={35}
          color='#fff'
        />
        </TouchableOpacity>
        )}
        leftContainerStyle={{flex:2}}
        rightComponent={(<Ionicons name='ios-add'
        size={60}
        color={'#fff'}
        onPress={()=>{this.props.navigation.navigate('AddClass',{courseId:this.state.course._id,semesterID:this.state.semesterID})}}
      />)}
        rightContainerStyle={{flex:1}}
        centerComponent={(
          <TouchableOpacity onPress={() => this.props.navigation.navigate('EditCourse',{courseID:this.state.courseID})}>
        <View style={styles.containerHeader}>
          <View style={styles.containerTextHeader}>
            <Text style={styles.textHeader}>{this.state.course.name}</Text>
          </View>
        </View>
        </TouchableOpacity>
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
const mapStateToProps = state => ({
  class:state.class,
  course: state.coures
})
export default connect(mapStateToProps)(ClassListScreen)