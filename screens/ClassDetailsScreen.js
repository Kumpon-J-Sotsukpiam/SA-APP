import React from 'react';
import { ScrollView, StyleSheet, View, Text, Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from 'react-native-elements';
import { calDurationsTime } from "../src/actions/durations"
import ContainerCheckinList from '../components/ContainerCheckinList';

var getDate = new Date();
var getTimeStarts = new Date(getDate.getFullYear(), getDate.getMonth(), getDate.getDate(), 8, 0, 0);
var getTimeEnds = new Date(getDate.getFullYear(), getDate.getMonth(), getDate.getDate(), 11, 0, 0);
class ClassDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        courseId:'',
        semesterId:'',  
        class:[]      
        /*group:'Group',
        location:'Location',
        day:'Day',
        startTime:'Start ',
        endTime:'End Time',
        totalStudent:'Total student',
        setTimeStarts:getTimeStarts,
        setTimeEnds:getTimeEnds,
        dateCheckin:'Date',
        percentage:'Percentage'*/
    };
  }
  componentWillMount(){
    const {classId,courseId,semesterId} = this.props.navigation.state.params
    log = this.props.class.filter((i) => i._id === classId)
    this.setState({
      class:log[0],
      semesterId:semesterId,
      courseId:courseId
    })
  }
 render() {
  const {_id,courseId,day,endTime,group,location,startTime,studentList} = this.state.class

  return (
    <View style = {styles.container}>
      <Header
        leftComponent={(
        <View style={styles.containerLeftHeader}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('ClassList',{courseId:this.state.courseId,semesterID:this.state.semesterId})}>
        <View style={styles.leftSection1}>
          <Ionicons
            name='ios-arrow-back'
            size={35}
            color='#fff'
          />
        </View>
        </TouchableOpacity>    
        <View style={styles.leftSection2}>
          <Text style={styles.textHeader}>{group}</Text>
          <Text style={styles.textHeader}>{location}</Text>
          <Text style={styles.textHeader}>{day} , {new Date(startTime).toLocaleTimeString()} - {new Date(endTime).toLocaleTimeString()}</Text>
          <Text style={styles.textHeader}>{'totalStudent'}</Text>
          <Text style={styles.textHeader}>Durations : {calDurationsTime(this.state.setTimeStarts,this.state.setTimeEnds)}</Text>
        </View>
        </View>
        
        )}
        leftContainerStyle={{flex:8}}
        rightComponent={(<Ionicons name='ios-settings'
        size={30}
        color={'#fff'}
        onPress={()=>{this.props.navigation.navigate('EditClass',{classID:'Class ID'})}}
      />)}
        containerStyle={styles.containerStyle}
      />

      <TouchableOpacity onPress={() => this.props.navigation.navigate('StudentList')}>
      <View style={styles.containerStudentList}>
        <View style={styles.headleftSection1}>
          <Text style={styles.textHead}>Student List</Text>
        </View>
        <View style={styles.headleftSection2}>
          <Ionicons
            name='ios-arrow-forward'
            size={35}
            color='#979797'
          />
        </View>
      </View>
      </TouchableOpacity>

      <View style={styles.containerClasses}>
        <Text style={styles.textClasses}>CLASSES</Text>  
      </View>
      
      <View style={styles.containerClassList}>
        <ScrollView>
          <View>
          
              <ContainerCheckinList
              dateCheckin={'Date'}
              students={'total'}
              navigateCheckinList={() => this.props.navigation.navigate('Semesters')}
              />

              <ContainerCheckinList
              dateCheckin={'Date'}
              students={'total'}
              navigateCheckinList={() => this.props.navigation.navigate('Semesters')}
              />

              </View>
        </ScrollView>
      </View>

    </View>
  );
}
}

ClassDetailsScreen.navigationOptions = {
  header:null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  containerStudentList: {
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderTopWidth:2,
    borderColor: '#e8e8e8',
    height:50,
    marginTop:5,
    flexDirection:'row'
  },
  containerLeftHeader: {
    flex: 1,
    flexDirection:'row'
  },
  textHeader: {
    color: '#fff',
    fontSize:18,
    fontWeight:'bold'
  },
  leftSection1: {
    flex:1,
    justifyContent:'center',
    marginRight:10
  },
  leftSection2: {
    flex:2,
    justifyContent:'center'
  },
  textHead: {
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 20
  },
  headleftSection1: {
    flex:1,
    justifyContent:'center'
  },
  headleftSection2: {
    flex:1,
    justifyContent:'center',
    alignItems:'flex-end',
    marginRight:10
  },
  textClasses: {
    fontSize:20,
    color:'gray'
  },
  containerClasses: {
    marginTop:10,
    marginLeft:35
  },
  containerClassList: {
    margin:10,
  },
  containerClass: {
    borderBottomWidth:1,
    borderColor:'#fd4176',
    marginTop:10,
    flexDirection:'row'
  },
  containerStyle:{
    backgroundColor: '#fd4176',
    height:130,
    justifyContent: 'space-around',
    borderBottomColor: '#be5f7a',
    borderBottomWidth: 1,
  },
});
const mapStateToProps = state => ({
  class:state.class,
  errors:state.errors
})
export default connect(mapStateToProps)(ClassDetailsScreen)