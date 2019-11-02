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
      autoClose:true
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
            <TouchableOpacity onPress={() => this.props.navigation.navigate('CourseList', { semesterID: this.state.semesterID })}>
              <Ionicons
                name='ios-arrow-back'
                size={35}
                color='#fff'
              />
            </TouchableOpacity>
          )}
          leftContainerStyle={{ flex: 2 }}
          rightComponent={(<Ionicons name='ios-add'
            size={60}
            color={'#fff'}
            onPress={() => { this.props.navigation.navigate('AddClass', { courseId: this.state.course._id, semesterID: this.state.semesterID }) }}
          />)}
          rightContainerStyle={{ flex: 1 }}
          centerComponent={(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('EditCourse', { courseID: this.state.courseID })}>
              <View style={styles.containerHeader}>
                <View style={styles.containerTextHeader}>
                  <Text style={styles.textHeader}>{this.state.course.name}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          centerContainerStyle={{ flex: 9 }}
          containerStyle={styles.containerStyle}
        />
        <View>
          <ScrollView>
          <FlatList
            ItemSeparatorComponent={this.ListViewItemSeparator}
            data={this.props.class.filter(i => i.courseId == this.state.course._id)}
            refreshing={true}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={{margin:5,backgroundColor:'#fff'}}>
                <Swipeout left={[{
                  text: 'Delete',
                  backgroundColor: 'red',
                  autoClose:this.state.autoClose,
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
                    students={'Total'}
                    navigateCamera={() => this.props.navigation.navigate('Camera', { classID: 'ClassId' })}
                    navigateClassDetails={() => this.props.navigation.navigate('ClassDetails', { classId: item._id, courseId: this.state.course._id, semesterId: this.state.semesterID })}
                  />

                </Swipeout>
              </View>
            )}
          />
        </ScrollView>
        </View>

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
    fontSize: 14,
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