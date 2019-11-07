import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';

import { Header } from 'react-native-elements';
import { connect } from 'react-redux'
//action
import { currentDay, currentMonth, currentDate, currentYear } from '../src/actions/currentdate'
// Component
import ContainerClass from '../components/ContainerClass';
import HeaderToday from '../components/HeaderToday';
import Heading from '../components/Heading';
import { getDayOfWeek, formatTime } from '../src/actions/date'


class TodayScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Class: [],
    }
  }

  componentWillMount() {

    const { semester, course, Class } = this.props
    toDate = new Date()
    thisTime = toDate.getTime()
    toDay = (toDate.getDay() == 0 ? 6 : toDate.getDay() - 1)
    thisNow = []
    next = []

    semesterNow = semester.filter(i => toDate >= new Date(i.startDate) && toDate <= new Date(i.endDate))
    semesterId = []
    semesterNow.map(v => semesterId.push(v._id))

    CourseNow = course.filter(i => semesterId.indexOf(i.semesterId) >= 0)
    CourseId = []
    CourseNow.map(v => CourseId.push(v._id))

    ClassNow = Class.filter(i => i.day == toDay && CourseId.indexOf(i.courseId) >= 0)
    ClassNow.map((v, i) => {
      v.name = CourseNow.filter(ii => ii._id == v.courseId)[0].name
      v.semesterId = CourseNow.filter(ii => ii._id == v.courseId)[0].semesterId
    })
    this.setState({
      Class: ClassNow
    })
  }
  
  render() {
    return (

      <View style={styles.container}>

        <HeaderToday
          name={'Today'}
          day={currentDay()}
          date={currentDate()+' '+currentMonth()+' '+currentYear()}
        />


        <ScrollView>
          <Heading name={'NOW'}/>
          <FlatList
            data={this.state.Class.filter(i => new Date(i.startTime).getTime() < thisTime && new Date(i.endTime).getTime() > thisTime)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View>
                <ContainerClass
                  course={item.name}
                  group={item.group}
                  location={item.location}
                  day={getDayOfWeek(item.day)}
                  timeStart={formatTime(item.startTime)}
                  timeEnd={formatTime(item.endTime)}
                  students={item.studentList.length}
                  navigateCamera={() => this.props.navigation.navigate('Camera')}
                  navigateClassDetails={() => this.props.navigation.navigate('ClassDetails',{ classId: item._id, courseId: item.courseId, semesterId: item.semesterId })}
                />
                
              </View>
            )}
          />

          <Heading name={'NEXT'}/>

          <FlatList
            ItemSeparatorComponent={this.ListViewItemSeparator}
            data={this.state.Class.filter(i => new Date(i.startTime).getTime() > thisTime)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View>
                <ContainerClass
                  course={item.name}
                  group={item.group}
                  location={item.location}
                  day={getDayOfWeek(item.day)}
                  timeStart={formatTime(item.startTime)}
                  timeEnd={formatTime(item.endTime)}
                  students={item.studentList.length}
                  navigateCamera={() => this.props.navigation.navigate('Camera')}
                  navigateClassDetails={() => this.props.navigation.navigate('ClassDetails',{ classId: item._id, courseId: item.courseId, semesterId: item.semesterId })}
                />
                
              </View>
            )}
          />
        </ScrollView>

      </View>
    );
  }
}

TodayScreen.navigationOptions = {
  header: null
};


const styles = StyleSheet.create({
  /* Container Screen */
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },

  /* Container Class */
  containerClassHeader: {
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderColor: '#e8e8e8'
  },
  textClassHeader: {
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5,
    fontSize: 20
  },


});
const mapStateToProps = state => ({
  Class: state.class,
  course: state.course,
  semester: state.semester
})
export default connect(mapStateToProps)(TodayScreen) 