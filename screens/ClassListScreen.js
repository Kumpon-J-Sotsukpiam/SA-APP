import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from 'react-native-elements';
import ContainerClassList from '../components/ContainerClassList';
import { del_class } from '../src/actions/class'
import { connect } from 'react-redux'
import Swipeout from 'react-native-swipeout';
import { getDayOfWeek, formatTime } from "../src/actions/date"

class ClassListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: [],
      semesterID: '',
      autoClose: true
    };
  }
  componentWillMount() {
    const { courseId, semesterID } = this.props.navigation.state.params
    log = this.props.course.filter((i) => i._id === courseId)
    this.setState({
      course: log[0],
      semesterID: semesterID,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Header

          leftComponent={(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('CourseList', { semesterID: this.state.semesterID })}>
              <Ionicons
                name='ios-arrow-back'
                size={45}
                color='#fff'
              />
            </TouchableOpacity>
          )}
         
          rightComponent={(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('AddClass', { courseId: this.state.course._id, semesterID: this.state.semesterID })}>
              <Ionicons name='ios-add'
                size={50}
                color={'#fff'}
              />
            </TouchableOpacity>
          )}
          
          centerComponent={(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('EditCourse', { courseID: this.state.courseID })}>  
                  <Text style={styles.textCourse}>{this.state.course.name}</Text>
            </TouchableOpacity>
          )}
          centerContainerStyle={{ flex: 9 }}
          containerStyle={styles.containerStyle}
        />
        
          <ScrollView>
            <FlatList
              data={this.props.class.filter(i => i.courseId == this.state.course._id)}
              extraData={this.props}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={{ margin: 5, backgroundColor: '#fff' }}>
                  <Swipeout left={[{
                    text: 'Delete',
                    backgroundColor: 'red',
                    autoClose: this.state.autoClose,
                    onPress: () => { del_class(item._id, this.props) }
                  }]}
                    style={{ borderBottomLeftRadius: 10, borderTopLeftRadius: 10 }}
                    autoClose={this.state.autoClose}
                    backgroundColor='transparent'>
                    <ContainerClassList
                      group={item.group}
                      location={item.location}
                      day={getDayOfWeek(item.day)}
                      startTime={formatTime(item.startTime)}
                      endTime={formatTime(item.endTime)}
                      students={item.studentList.length}
                      navigateCamera={() => this.props.navigation.navigate('Camera', { classID: 'ClassId' })}
                      navigateClassDetails={() => this.props.navigation.navigate('ClassDetails', { classId: item._id, courseId: this.state.course._id, semesterId: this.state.semesterID })}
                    />
                  </Swipeout>
                </View>
              )}
            />
          </ScrollView>
       

      </View>
    );
  }
}

ClassListScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  textCourse: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  containerStyle: {
    backgroundColor: '#fd4176',
    height: 120,
    justifyContent: 'space-around',
    borderBottomColor: '#be5f7a',
    borderBottomWidth: 1,
  },
});

const mapStateToProps = state => ({
  class: state.class,
  course: state.course
})
export default connect(mapStateToProps)(ClassListScreen)