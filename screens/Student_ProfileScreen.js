import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux'
import { Header, Button } from 'react-native-elements';
import { Video } from 'expo-av';

class Student_ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      student: [],
      video: null,
    }
    this.handleBack = this.handleBack.bind(this)
  }
  handleBack() {
    this.props.navigation.navigate('Students')
  }
  async componentWillMount() {
    const { stuId } = this.props.navigation.state.params
    log = this.props.student.filter(i => i._id == stuId)[0]
    this.setState({
      student: log
    })
  }
  render() {
    historyList = []
    this.props.class.map(v => {
      score = 0
      if (v.studentList.indexOf(this.state.student._id) >= 0) {
        this.props.course.map(vCourse => {
          if (v.courseId == vCourse._id) {
            this.props.semester.map(vSemester => {
              if (vCourse.semesterId == vSemester._id) {
                historyList.push({
                  classId: v._id,
                  classGroup: v.group,
                  className: v.name,
                  courseId: v.courseId,
                  courseName: vCourse.name,
                  semesterId: vSemester._id,
                  semesterName: vSemester.name
                })
              }
            })
          }
        })
      }
      console.log(score);
    })
    console.log('====================================');
    console.log(historyList);
    console.log('====================================');
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View>
            <Header
              leftComponent={(
                <TouchableOpacity onPress={this.handleBack}>
                  <Ionicons
                    name='ios-arrow-back'
                    size={35}
                    color='#fff'
                  />
                </TouchableOpacity>
              )}
              rightComponent={(
                <TouchableOpacity onPress={() => this.props.navigation.navigate('EditStudent', { stuId: this.state.student._id })}>
                  <Ionicons
                    name='ios-settings'
                    size={35}
                    color='#fff'
                  />
                </TouchableOpacity>
              )}
              containerStyle={styles.containerStyle}
            />
          </View>

          <View style={{ backgroundColor: '#fd4176', height: 300, paddingBottom: 30, alignItems: 'center', justifyContent: 'flex-end' }}>
            <View style={{
              borderRadius: 55,
              borderColor: '#fff',
              borderWidth: 5,
              height: 110,
              width: 110,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 15
            }}>
              {this.state.video &&
                (<Video
                  source={{ uri: video }}
                  rate={1.0}
                  isMuted={true}
                  resizeMode="cover"
                  shouldPlay
                  isLooping
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />)
              }
            </View>
            <Text style={{ color: '#fff', fontSize: 25 }}>{this.state.student.stuId}</Text>
            <Text style={{ color: '#fff', fontSize: 25, marginBottom: 10 }}>{this.state.student.name}</Text>
            <Text style={{ color: '#fff', fontSize: 16 }}>• {this.state.student.faculty}</Text>
            <Text style={{ color: '#fff', fontSize: 16 }}>• {this.state.student.major}</Text>
          </View>

          <ScrollView>
            <FlatList
              data={historyList}
              extraData={historyList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (

                <TouchableOpacity style={{
                  marginLeft: 15,
                  marginBottom: 5,
                  marginTop: 8,
                  flexDirection: 'row',
                  height: 100
                }}>
                  <View style={{ flex: 1.5, alignItems: 'center' }}>
                    <View style={{
                      backgroundColor: '#999999',
                      borderRadius: 30,
                      height: 60,
                      width: 60,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                      <Ionicons
                        name='ios-school'
                        size={40}
                        color='#fff'
                      />
                    </View>
                    <View style={{ borderLeftColor: '#999999', borderLeftWidth: 2.5, height: 50 }} />
                  </View>
                  <View style={{ flex: 4, borderBottomColor: '#999999', borderBottomWidth: 1.5 }}>
                    <Text style={{ fontSize: 25, color: '#fd4176' }}>{item.semesterName}</Text>
                    <Text style={{ fontSize: 18, marginTop: 5 }}>{item.courseName}</Text>
                    <Text style={{ fontSize: 16, marginTop: 3 }}>Group {item.classGroup}</Text>
                  </View>
                  <View style={{ flex: 1, alignItems: 'center', borderBottomColor: '#999999', borderBottomWidth: 1.5, paddingTop: 10 }}>
                    <Ionicons
                      name='ios-analytics'
                      size={50}
                      color='#f7ebc3'
                    />
                    <Text style={{ fontSize: 16, marginTop: -5 }}>{/*item.percentage*/}</Text>
                  </View>
                </TouchableOpacity>
              )} />
          </ScrollView>

        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Student_ProfileScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerStyle: {
    backgroundColor: '#fd4176',
    height: 70,
    justifyContent: 'space-around',
    borderBottomColor: '#fd4176'
  },
});
const mapStateToProps = state => ({
  student: state.student,
  semester: state.semester,
  course: state.course,
  class: state.class,
  checkIn: state.checkIn
})
export default connect(mapStateToProps)(Student_ProfileScreen)