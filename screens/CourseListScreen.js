import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from 'react-native-elements';
import ContainerCourse from '../components/ContainerCourse';
import { calDurationsSemesterLeft } from "../src/actions/durations"
import Swipeout from 'react-native-swipeout';
import { connect } from 'react-redux'
import { del_course } from '../src/actions/course'

var dateCurent = new Date();
class CourseListScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      autoClose: true,
      semester: [],
      course: []
    };
  }
  async componentWillMount() {
    id = this.props.navigation.state.params.semesterId
    console.log('====================================');
    console.log(this.props.navigation.state.params);
    console.log('====================================');
    log = this.props.semester.filter((i) => i._id === id)
    this.setState({
      semester: log[0]
    })
  }

  checkClass(data){
    if(data > 1){
      return data +' Classes'
    } else {
      return data +' Class'
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header

          leftComponent={(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Semesters')}>
              <Ionicons
                name='ios-arrow-back'
                size={45}
                color='#fff'
              />
            </TouchableOpacity>
          )}

          rightComponent={(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('AddCourse', { semesterId: this.state.semester._id })}>
            <Ionicons name={'ios-add'}
              size={50}
              color={'#fff'}
              />
            </TouchableOpacity>
          )}
          centerComponent={(
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('EditSemester', { semesterId: this.state.semester._id }) }}>
              <View style={styles.containerHeader}>
                <View style={styles.containerTextHeader}>
                  <Text style={styles.textHeader}>{this.state.semester.name}</Text>
                </View>
                <View style={styles.containerDurationsHeader}>
                  <Text style={styles.durationsHeader}>Durations : {calDurationsSemesterLeft(this.state.semester.endDate)}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}

          centerContainerStyle={{ flex: 10 }}
          containerStyle={styles.containerStyle}
        />
        <ScrollView>
          <View style={styles.containerSemester}>
          </View>
          <View style={{ paddingBottom: 5 }}>
            <FlatList
              data={this.props.course.filter(i => i.semesterId == this.state.semester._id)}
              extraData={this.props.course}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.containerSemesterList}>
                  <Swipeout left={[{
                    text: 'Delete',
                    backgroundColor: 'red',
                    onPress: () => { del_course(item._id, this.props) }
                  }]}
                    style={{ borderBottomLeftRadius: 10, borderTopLeftRadius: 10 }}
                    autoClose={this.state.autoClose}
                    backgroundColor='transparent'>
                    <ContainerCourse
                      course={item.name}
                      totalClass={this.checkClass(this.props.class.filter(i => i.courseId == item._id).length)}
                      navigateCourseList={() => this.props.navigation.navigate('ClassList', { courseId: item._id, semesterId: this.state.semester._id })}
                    />
                  </Swipeout>
                </View>
              )}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
CourseListScreen.navigationOptions = {
  header: null
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  textHeader: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold'
  },
  containerDurationsHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  durationsHeader: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold'
  },
  containerStyle: {
    backgroundColor: '#fd4176',
    height: 120,
    justifyContent: 'space-around',
    borderBottomColor: '#be5f7a',
    borderBottomWidth: 1,
  },
  containerSemesterList: {
    backgroundColor: '#fff',
    marginTop: 5,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 10,
  },
});
const mapStateToProps = state => ({
  semester: state.semester,
  course: state.course,
  class: state.class
})
export default connect(mapStateToProps)(CourseListScreen)