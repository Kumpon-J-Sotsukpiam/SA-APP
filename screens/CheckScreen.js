import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  FlatList
} from 'react-native';
import ContainerClass from '../components/ContainerClass';
import { connect } from 'react-redux'
import { Header } from 'react-native-elements';
import { getDayOfWeek, formatTime } from "../src/actions/date"
import { push_model } from '../src/actions/model'
import DialogBoxAlert from '../components/DialogBoxAlert';

class CheckScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      class: [],
      alertToggle:false
    }

    this.handlePushModel = this.handlePushModel.bind(this)
  }
  handlePushModel(_id) {
    push_model(_id,this.prop)
    //this.props.navigation.navigate('Camera', { classId: item._id })
  }
  componentWillMount() {
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
    this.setState({
      class: ClassNow
    })
  }


  render() {
    return (
      <View style={styles.container}>
        <View>
          <Header
            centerComponent={({ text: 'Check-in', style: { color: '#fff', fontSize: 36, fontWeight: 'bold' } })}
            containerStyle={styles.containerStyle}
          />
        </View>

        <ScrollView>
          {<FlatList
            data={this.state.class} q
            refreshing={true}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (

              <ContainerClass
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
          onTouchOutside = {() => this.setState({ alertToggle: false })}
          okayBtn = {() => this.setState({ alertToggle: false })}
          alertText={'wow'}
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