import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from 'react-native-elements';
import { calDurationsTime } from "../src/actions/durations"
import { getDayOfWeek, formatTime,formatDate } from "../src/actions/date"
import ContainerCheckinList from '../components/ContainerCheckinList';
import { connect } from 'react-redux'
var getDate = new Date();
class ClassDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseId: '',
      semesterId: '',
      class: []
    };
  }
  async componentWillMount() {
    const { classId, courseId, semesterId } = this.props.navigation.state.params
    log = this.props.class.filter((i) => i._id === classId)

    this.setState({
      class: log[0],
      semesterId: semesterId,
      courseId: courseId,
    })
  }
  render() {
    const { _id, courseId, day, endTime, group, location, startTime, studentList } = this.state.class

    return (
      <View style={styles.container}>
        <Header
          leftComponent={(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ClassList', { courseId: this.state.courseId, semesterID: this.state.semesterId })}>
              <Ionicons
                name='ios-arrow-back'
                size={45}
                color='#fff'
              />
            </TouchableOpacity>
          )}

          centerComponent={(
            <View>
              <Text style={styles.textGroup}>{group}</Text>
              <Text style={styles.textLocation}>{location}</Text>
              <Text style={styles.textDetails}>Total Student {studentList.length}</Text>
              <Text style={styles.textDetails}>{getDayOfWeek(day)} , {formatTime(startTime)} - {formatTime(endTime)}</Text>
              <Text style={styles.textDetails}>Durations : {calDurationsTime(startTime, endTime)}</Text>
            </View>
          )}
          centerContainerStyle={{ flex: 8, alignItems: 'flex-start' }}

          rightComponent={(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('EditClass', { classID: 'Class ID' })}>
              <Ionicons name='ios-settings'
                size={30}
                color={'#fff'}
              />
            </TouchableOpacity>
          )}

          containerStyle={styles.containerStyle}
        />

        <TouchableOpacity onPress={() => this.props.navigation.navigate('StudentList', { classId: this.state.class._id })}>
          <View style={styles.containerStudentList}>
            <View style={styles.headleftSection1}>
              <Text style={styles.textHead}>Student List</Text>
            </View>
            <View style={styles.headleftSection2}>
              <Ionicons
                name='ios-list'
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

          <FlatList
            ItemSeparatorComponent={this.ListViewItemSeparator}
            data={this.props.checkIn.filter(i => i.classId == this.state.class._id)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.containerCheckinList}>
                <ContainerCheckinList
                  dateCheckin={formatDate(item.createdAt)+" / "+formatTime(item.createdAt)}
                  student={item.studentList.length}
                  navigateCheckinList={() => this.props.navigation.navigate('CheckinDetails',{checkInId:item._id})}
                />
              </View>
            )}
          />

        </View>
      </View>
    );
  }
}

ClassDetailsScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  containerStudentList: {
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: '#e8e8e8',
    height: 50,
    flexDirection: 'row'
  },
  textHead: {
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 20
  },
  headleftSection1: {
    flex: 1,
    justifyContent: 'center'
  },
  headleftSection2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 10
  },
  textClasses: {
    fontSize: 20,
    color: 'gray'
  },
  containerClasses: {
    marginTop: 10,
    marginLeft: 35
  },
  containerStyle: {
    backgroundColor: '#fd4176',
    height: 140,
    justifyContent: 'space-around',
    borderBottomColor: '#be5f7a',
    borderBottomWidth: 1,
  },
  containerCheckinList: {
    backgroundColor: '#fff',
    marginTop: 5,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 10,
  },
  textGroup: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  textLocation: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  textDetails: {
    color: '#fff',
    fontSize: 16,
  }
});
const mapStateToProps = state => ({
  class: state.class,
  errors: state.errors,
  checkIn: state.checkIn
})
export default connect(mapStateToProps)(ClassDetailsScreen)