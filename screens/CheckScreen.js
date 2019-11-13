import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  FlatList
} from 'react-native';
import ContainerClass from '../components/ContainerClass';
import { connect } from 'react-redux'
import { Header, SearchBar } from 'react-native-elements';
import { getDayOfWeek, formatTime } from "../src/actions/date"
import { exp, diff } from '../src/actions/durations'
import { push_model } from '../src/actions/model'
import { createFilter } from 'react-native-search-filter';
import CountDown from 'react-native-countdown-component';
import DialogBoxAlert from '../components/DialogBoxAlert';
const KEYS_TO_FILTERS = ['name'];

class CheckScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      class: [],
      alertToggle: false,
      loading: false,
      message: "",
      search: '',
    }
    this.handlePushModel = this.handlePushModel.bind(this)
  }
  handlePushModel(_id) {
    this.setState({
      alertToggle: true,
      loading: true,
      message: "Check and Loading Model"
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
  searchUpdated(data) {
    this.setState({ search: data })
  }
  handleTime(id, start, end) {
    var currentTime = new Date().getTime()
    var endTime = new Date(end).getTime()
    var startTime = new Date(start).getTime()

    if (startTime < currentTime && endTime > currentTime) {

      return (<CountDown
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
    toDate = new Date()
    semesterNow = semester.filter(i => toDate >= new Date(i.startDate) && toDate <= new Date(i.endDate))
    semesterId = []
    semesterNow.map(v => semesterId.push(v._id))

    CourseNow = course.filter(i => semesterId.indexOf(i.semesterId) >= 0)
    CourseId = []
    CourseNow.map(v => CourseId.push(v._id))

    ClassNow = Class.filter(i => CourseId.indexOf(i.courseId) >= 0)
    ClassNow.map((v, i) => {
      v.name = CourseNow.filter(ii => ii._id == v.courseId)[0].name
      v.semesterId = CourseNow.filter(ii => ii._id == v.courseId)[0].semesterId
    })
    const filterClass = ClassNow.filter(createFilter(this.state.search, KEYS_TO_FILTERS))
    return (
      <View style={styles.container}>
        <View>
          <Header
            centerComponent={({ text: 'Check-in', style: { color: '#fff', fontSize: 36, fontWeight: 'bold' } })}
            containerStyle={styles.containerStyle}
          />
        </View>

        <View>
          <SearchBar
            containerStyle={{ backgroundColor: '#fff', marginBottom: 3 }}
            placeholder="Search"
            lightTheme
            onChangeText={(data) => this.searchUpdated(data)}
            autoCorrect={false}
            value={this.state.search}
          />
        </View>

        <ScrollView>
          {<FlatList
            data={filterClass}
            extraData={this.state}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <ContainerClass
                diff={this.handleTime(item._id, item.startTime, item.endTime)}
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
            )}
          />}
        </ScrollView>

        <DialogBoxAlert
          visible={this.state.alertToggle}
          message={this.state.message}
          onTouchOutside={() => {
            if (!this.state.loading) {
              this.setState({
                alertToggle: false
              })
            }
          }}
        />
      </View>
    );
  }
}
CheckScreen.navigationOptions = {
  header: null
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  containerStyle: {
    backgroundColor: '#fd4176',
    height: 120,
    justifyContent: 'space-around',
    borderBottomColor: '#be5f7a',
    borderBottomWidth: 1,
  }
});
const mapStateToProps = state => ({
  Class: state.class,
  course: state.course,
  semester: state.semester
})
export default connect(mapStateToProps)(CheckScreen)