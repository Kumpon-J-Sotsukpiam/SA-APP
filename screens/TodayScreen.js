import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  FlatList,
  Text
} from 'react-native';

import { connect } from 'react-redux'
//action
import { currentDay, currentMonth, currentDate, currentYear } from '../src/actions/currentdate'
// Component
import ContainerClass from '../components/ContainerClass';
import HeaderToday from '../components/HeaderToday';
import Heading from '../components/Heading';
import { getDayOfWeek, formatTime } from '../src/actions/date'
import { diff, exp } from '../src/actions/durations'
import CountDown from 'react-native-countdown-component';


class TodayScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thisDate: new Date()
    }
    this.refreshScreen = this.refreshScreen.bind(this)
  }
  refreshScreen() {
    this.setState({ thisDate: new Date() })
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.refreshScreen()
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  handleTime(id, start, end) {
    var currentTime = new Date().getTime()
    var endTime = new Date(end).getTime()
    var startTime = new Date(start).getTime()
    if (startTime < currentTime && endTime > currentTime) {
      return
      (<CountDown
        id={id}
        until={exp(startTime, endTime)}
        size={15}
        showSeparator={true}
      />)
    } else {
      return (<View><Text style={{ fontWeight: 'bold', fontSize: 15 }}>{diff(startTime, endTime)}</Text></View>)
    }
  }

  render() {

    const { semester, course, Class } = this.props
    toDay = (this.state.thisDate.getDay())
    toTime = this.state.thisDate.getTime()
    semesterNow = semester.filter(i => this.state.thisDate >= new Date(i.startDate) && this.state.thisDate <= new Date(i.endDate))
    semesterId = []
    semesterNow.map(v => semesterId.push(v._id))
    console.log(toDay)
    console.log(formatTime(toTime))
    CourseNow = course.filter(i => semesterId.indexOf(i.semesterId) >= 0)
    CourseId = []
    CourseNow.map(v => CourseId.push(v._id))

    tempClass = Class.filter(i => i.day == toDay && CourseId.indexOf(i.courseId) >= 0)
    tempClass.map((v, i) => {
      console.log('====================================');
      console.log(formatTime(v.startTime));
      console.log(formatTime(v.endTime));
      console.log('====================================');
      v.name = CourseNow.filter(ii => ii._id == v.courseId)[0].name
      v.semesterId = CourseNow.filter(ii => ii._id == v.courseId)[0].semesterId
    })
    console.log('====================================');
    console.log(tempClass);
    console.log('====================================');
    nowClass = []
    nextClass = []
    tempClass.map(i => {
      console.log('====================================');
      console.log(new Date(i.startTime).getTime() < toTime);
      console.log(new Date(i.endTime).getTime() > toTime);
      console.log(new Date(i.startTime).getTime() > toTime);
      console.log('====================================');
      if((new Date(i.startTime).getTime() < toTime && new Date(i.endTime).getTime() > toTime) > 0){
        console.log('====================================');
        console.log(formatTime(i.startTime));
        console.log(formatTime(i.endTime));
        console.log('====================================');
        nowClass.push(i)
      }else if((new Date(i.startTime).getTime() > toTime) > 0){
        console.log('====================================');
        console.log(formatTime(i.startTime));
        console.log(formatTime(i.endTime));
        console.log('====================================');
        nextClass.push(i)
      }
    })
    console.log('====================================');
    console.log(nowClass);
    console.log(nextClass);
    console.log('====================================');
    // console.log('====================================');
    // testClass = tempClass.filter(i => new Date(i.startTime).getTime() < toTime && new Date(i.endTime).getTime() > toTime)
    // // testClass = tempClass.filter(i => {
    // //   console.log(formatTime(new Date(i.startTime).getTime()));
    // //   console.log(formatTime(new Date(i.endTime).getTime()));
    // //   console.log(formatTime(toTime));
    // //   console.log(new Date(i.startTime).getTime() < toTime);
    // //   console.log(new Date(i.endTime).getTime() < toTime);
    // //   console.log(new Date(i.startTime).getTime() < toTime) && (new Date(i.endTime).getTime() > toTime)
    // //   return (new Date(i.startTime).getTime() < toTime) && (new Date(i.endTime).getTime() > toTime)
    // // })
    // console.log(testClass);

    // console.log('====================================');
    return (
      <View style={styles.container}>

        <HeaderToday
          name={'Today'}
          day={currentDay()}
          date={currentDate() + ' ' + currentMonth() + ' ' + currentYear()}
        />
        <ScrollView>
          {
            nowClass.length > 0 ? <Heading name={'NOW'} /> : null
          }
          <FlatList
            data={nowClass}
            extraData={nowClass}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              return (
                <View>
                  <ContainerClass
                    diff={this.handleTime(item._id, item.startTime, item.endTime)}
                    course={item.name}
                    group={item.group}
                    location={item.location}
                    day={getDayOfWeek(item.day)}
                    timeStart={formatTime(item.startTime)}
                    timeEnd={formatTime(item.endTime)}
                    students={item.studentList.length}
                    navigateCamera={() => this.props.navigation.navigate('Camera')}
                    navigateClassDetails={() => this.props.navigation.navigate('ClassDetails', { classId: item._id, courseId: item.courseId, semesterId: item.semesterId })}
                  />

                </View>
              )
            }}
          />
          {
            nextClass.length > 0 ? <Heading name={'NEXT'} /> : null
          }

          <FlatList
            data={nextClass}
            extraData={nextClass}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View>
                <ContainerClass
                  diff={this.handleTime(item._id, item.startTime, item.endTime)}
                  course={item.name}
                  group={item.group}
                  location={item.location}
                  day={getDayOfWeek(item.day)}
                  timeStart={formatTime(item.startTime)}
                  timeEnd={formatTime(item.endTime)}
                  students={item.studentList.length}
                  navigateCamera={() => this.props.navigation.navigate('Camera')}
                  navigateClassDetails={() => this.props.navigation.navigate('ClassDetails', { classId: item._id, courseId: item.courseId, semesterId: item.semesterId })}
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