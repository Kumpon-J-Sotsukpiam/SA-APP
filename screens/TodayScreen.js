import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';

import { Header } from 'react-native-elements';
import { connect } from 'react-redux'
//action
import { currentDay, currentMonth, currentDate, currentYear } from "../src/actions/currentdate"
// Component
import ContainerClass from '../components/ContainerClass';

class TodayScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      now: [],
      next: []
    }
  }
  componentWillMount() {
    const { semester, course, Class } = this.props
    toDate = new Date()
    toDay = toDate.getDay() - 1

    semesterNow = semester.filter(i => toDate >= new Date(i.startDate) && toDate <= new Date(i.endDate))[0]
    CourseNow = course.filter(i => i.semesterId === semesterNow._id)
    CourseId = []
    CourseNow.map(v => CourseId.push(v._id))
    ClassNow = Class.filter(i => i.day == toDay && CourseId.indexOf(i.courseId) >= 0)
    ClassNow.map((v,i) => {
      v.name = CourseNow.filter(ii => ii._id == v.courseId)[0].name
    })
    this.setState({
      now:ClassNow
    })
  }
  render() {
    return (

      <View style={styles.container}>

        <Header
          centerComponent={(<View style={styles.containerHeader}>
            <View style={styles.containerTextHeader}>
              <Text style={styles.textHeader}>Today</Text>
            </View>
            <View style={styles.containerCurrentDateHeader}>
              <Text style={styles.dayHeader}>{currentDay()}</Text>
            </View>
            <View style={styles.containerDateHeader}>
              <Text style={styles.dateHeader}>{currentDate()} {currentMonth()} {currentYear()}</Text>
            </View>
          </View>
          )}
          containerStyle={styles.containerStyle}
        />

        <ScrollView>
          <View style={styles.containerClassHeader}>
            <Text style={styles.textClassHeader}>NOW</Text>
          </View>
          <FlatList
            ItemSeparatorComponent={this.ListViewItemSeparator}
            data={this.state.now}
            refreshing={true}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.containerSemesterList}>
                <ContainerClass
                  course={item.name}
                  group={item.group}
                  location={item.location}
                  day={item.day}
                  timeStart={this.state.timeStart}
                  timeEnd={this.state.timeEnd}
                  students={this.state.students}
                  navigateCamera={() => this.props.navigation.navigate('Camera')}
                  navigateClassDetails={() => this.props.navigation.navigate('ClassDetails')}
                />
              </View>
            )}
          />
          <View style={styles.containerClassHeader}>
            <Text style={styles.textClassHeader}>NEXT</Text>
          </View>
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

  /* Container Header */
  containerHeader: {
    flexDirection: 'column',
  },
  containerTextHeader: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerCurrentDateHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textHeader: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold'
  },
  dayHeader: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  dateHeader: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 3
  },
  containerStyle: {
    backgroundColor: '#fd4176',
    height: 120,
    justifyContent: 'space-around',
    borderBottomColor: '#be5f7a',
    borderBottomWidth: 1,
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