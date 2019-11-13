import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Platform,
  FlatList
} from 'react-native';
import Swipeout from 'react-native-swipeout';


import { Header, Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import Heading from '../components/Heading';
import ContainerSemester from '../components/ContainerSemester';
import { del_semester } from '../src/actions/semester'
import { connect } from "react-redux"

class SemestersScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      autoClose: true,
      students: ''
    }
  }

  checkCourse(data){
    if(data > 1){
      return data +' Courses'
    } else {
      return data +' Course'
    }
  }

  render() {
    const toDate = new Date()
    return (
      <View style={styles.container}>
        <Header
          centerComponent={({ text: 'Semester', style: { color: '#fff', fontSize: 36, fontWeight: 'bold' } })}
          rightComponent={(
            <Ionicons name={'ios-add'}
              size={50}
              color={'#fff'}
              onPress={() => { this.props.navigation.navigate('AddSemester') }}
            />

          )}
          rightContainerStyle={{ justifyContent: 'center' }}
          containerStyle={styles.containerStyle}
        />
        <ScrollView>
          {
            this.props.semester.filter(i => toDate < new Date(i.endDate)).length > 0 ? <Heading name={'CURRENT'} /> : null
          }
          <View style={{ paddingBottom: 5 }}>
            <FlatList
              data={this.props.semester.filter(i => toDate < new Date(i.endDate))}
              extraData={this.props.semester}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.containerSemesterList}>
                  <Swipeout left={[{
                    text: 'Delete',
                    backgroundColor: 'red',
                    onPress: () => { del_semester(item._id, this.props) }
                  }]}
                    style={{ borderBottomLeftRadius: 10, borderTopLeftRadius: 10 }}
                    autoClose={this.state.autoClose}
                    backgroundColor='transparent'>
                    <ContainerSemester
                      semester={item.name}
                      totalCourse={this.checkCourse(this.props.course.filter(i => i.semesterId == item._id).length)}
                      navigateCourseList={() => this.props.navigation.navigate('CourseList', { semesterID: item._id })}
                    />
                  </Swipeout>
                </View>
              )}
            />
          </View>
          {
            this.props.semester.filter(i => toDate > new Date(i.endDate)).length > 0 ? <Heading name={'PAST'} /> : null
          }
          <View style={{ paddingBottom: 5 }}>
            <FlatList
              data={this.props.semester.filter(i => toDate > new Date(i.endDate))}
              extraData={this.props.semester}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.containerSemesterList}>
                  <Swipeout left={[{
                    text: 'Delete',
                    backgroundColor: 'red',
                    onPress: () => { del_semester(item._id, this.props) }
                  }]}
                    style={{ borderBottomLeftRadius: 10, borderTopLeftRadius: 10 }}
                    autoClose={this.state.autoClose}
                    backgroundColor='transparent'>
                    <ContainerSemester
                      semester={item.name}
                      totalCourse={this.checkCourse(this.props.course.filter(i => i.semesterId == item._id).length)}
                      navigateCourseList={() => this.props.navigation.navigate('CourseList', { semesterID: item._id })}
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

SemestersScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  containerSemester: {
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderColor: '#e8e8e8',
  },
  header: {
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5,
    fontSize: 20,
  },
  containerRightHeader: {
    flex: 1,
    marginTop: 22,
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
export default connect(mapStateToProps)(SemestersScreen)