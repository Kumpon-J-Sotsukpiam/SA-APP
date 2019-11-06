import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from 'react-native-elements';
import ContainerSemester from '../components/ContainerSemester';
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
      semester: {},
      course: []
    };
  }
  async componentWillMount() {
    id = this.props.navigation.state.params.semesterID
    log = this.props.semester.filter((i) => i._id === id)
    this.setState({
      semester: log[0]
    })
    // await get_course(id,this.props)
  }
  ListViewItemSeparator = () => {
    return (
      <View style={{ backgroundColor: '#000' }} />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Header

          leftComponent={(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Semesters')}>
              <Ionicons
                name='ios-arrow-back'
                size={35}
                color='#fff'
              />
            </TouchableOpacity>
          )}
          leftContainerStyle={{ flex: 2 }}
          rightComponent={(<Ionicons name={'ios-add'}
            size={60}
            color={'#fff'}
            onPress={() => { this.props.navigation.navigate('AddCourse', { semesterID: this.state.semester._id }) }}
          />)}
          rightContainerStyle={{ flex: 1 }}
          centerComponent={(
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('EditSemester', { semesterID: this.state.semester.semesterID }) }}>
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
              ItemSeparatorComponent={this.ListViewItemSeparator}
              data={this.props.course.filter(i => i.semesterId == this.state.semester._id)}
              refreshing={true}
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
                    <ContainerSemester
                      semester={item.name}
                      students={'Total Student in course  '}
                      navigateCourseList={() => this.props.navigation.navigate('ClassList', { courseId: item._id, semesterID: this.state.semester._id })}
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
  course: state.course
})
export default connect(mapStateToProps)(CourseListScreen)