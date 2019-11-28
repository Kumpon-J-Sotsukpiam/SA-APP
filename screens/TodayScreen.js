import React from 'react';

// Component
import {
  ScrollView,
  StyleSheet,
  View,
  FlatList,
  Text
} from 'react-native';

import { 
  HeaderToday, 
  Heading,
  ContainerClass,
  DialogBoxAlert,
} from '../components/';

import CountDown from 'react-native-countdown-component';

//Redux
import { connect } from 'react-redux'

//action
import { currentDay, currentMonth, currentDate, currentYear } from '../src/actions/currentdate'
import { push_model } from '../src/actions/model'
import { getDayOfWeek, formatTime } from '../src/actions/datetimeformat'
import { calDiffCount, defaultDiff } from '../src/actions/durations'

class TodayScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thisDate: new Date(),
      alertToggle: false,
      loading: false,
      message: '',
    }
    this.refreshScreen = this.refreshScreen.bind(this)
    this.handlePushModel = this.handlePushModel.bind(this)
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

  handlePushModel(_id) {
    this.setState({
      alertToggle: true,
      loading: true,
      message: 'Check and Loading Model'
    })
    push_model(_id, this.props, res => {
      this.setState({
        message: res.message,
        loading: false
      })
      setTimeout(() => {
        this.setState({
          alertToggle: false
        })
        if (res.ok) {
          this.props.navigation.navigate('Camera', { classId: _id, checkIn_id: res.checkIn._id })
        }
      }, 1000)
    })
  }

  handleCountDown(id, start, end) {

    var startTime = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date(start).getHours(), new Date(start).getMinutes(), new Date(start).getSeconds())
    var endTime = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date(end).getHours(), new Date(end).getMinutes(), new Date(end).getSeconds())
    var currentTime = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours(), new Date().getMinutes(), new Date().getSeconds())

    if (startTime < currentTime && endTime > currentTime) {
        return (
                  <CountDown
                    id={id}
                    until={calDiffCount(startTime, endTime)}
                    size={15}
                    showSeparator={true}
                  />
               )
    } else if (startTime < currentTime) {
        return (
                  <CountDown
                    id={id}
                    until={calDiffCount(startTime, endTime)}
                    size={15}
                    showSeparator={true}
                  />
               )
    } else {
        return (
                  <View>
                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{defaultDiff(startTime, endTime)}</Text>
                  </View>
               )
    }
  }

  render() {
    const { semester, course, Class } = this.props

    toDay = this.state.thisDate.getDay()
    toTime = this.state.thisDate.getTime()

    semesterNow = semester.filter(i => this.state.thisDate >= new Date(i.startDate) && this.state.thisDate <= new Date(i.endDate))
    semesterId = []
    semesterNow.map(v => semesterId.push(v._id))
    CourseNow = course.filter(i => semesterId.indexOf(i.semesterId) >= 0)
    CourseId = []
    CourseNow.map(v => CourseId.push(v._id))

    tempClass = Class.filter(i => i.day == toDay && CourseId.indexOf(i.courseId) >= 0)
    tempClass.map((v, i) => {
      v.name = CourseNow.filter(ii => ii._id == v.courseId)[0].name
      v.semesterId = CourseNow.filter(ii => ii._id == v.courseId)[0].semesterId
    })

    nowClass = []
    nextClass = []

    tempClass.map(i => {
      var start = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date(i.startTime).getHours(), new Date(i.startTime).getMinutes(), new Date(i.startTime).getSeconds())
      var end = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date(i.endTime).getHours(), new Date(i.endTime).getMinutes(), new Date(i.endTime).getSeconds())
      var cur = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours(), new Date().getMinutes(), new Date().getSeconds())

      if (start < cur & cur < end) {
            nowClass.push(i)
      } else if (start > cur) {
            nextClass.push(i)
      }
    })

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
                        <ContainerClass
                          diff={this.handleCountDown(item._id, item.startTime, item.endTime)}
                          course={item.name}
                          group={item.group}
                          location={item.location}
                          day={getDayOfWeek(item.day)}
                          timeStart={formatTime(item.startTime)}
                          timeEnd={formatTime(item.endTime)}
                          students={item.studentList.length}
                          navigateCamera={() => this.handlePushModel(item._id)}
                          navigateClassDetails={() => this.props.navigation.navigate('ClassDetails', { classId: item._id, courseId: item.courseId, semesterId: item.semesterId })}
                        />
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
            renderItem={({ item }) => {
              return (
                        <ContainerClass
                          diff={this.handleCountDown(item._id, item.startTime, item.endTime)}
                          course={item.name}
                          group={item.group}
                          location={item.location}
                          day={getDayOfWeek(item.day)}
                          timeStart={formatTime(item.startTime)}
                          timeEnd={formatTime(item.endTime)}
                          students={item.studentList.length}
                          navigateCamera={() => this.handlePushModel(item._id)}
                          navigateClassDetails={() => this.props.navigation.navigate('ClassDetails', { classId: item._id, courseId: item.courseId, semesterId: item.semesterId })}
                        />
                    )
                                      }}
          />

        </ScrollView>

        <DialogBoxAlert
          visible={this.state.alertToggle}
          message={this.state.message}
          onTouchOutside={() => {
            if (!this.state.loading) {
              this.setState({ alertToggle: false })
            }
                                }}
        />

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