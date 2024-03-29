import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native';
import HeaderCheckinLog from '../components/HeaderCheckinLog';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux'
import StudentDetailsCheckinLog from '../components/StudentDetailsCheckinLog';
import { formatTime,formatDate } from '../src/actions/datetimeformat'

class StudentLogScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      student: [],
      class: [],
      checkIn: [],
    }
}
  componentWillMount() {
    const { classId, stuId } = this.props.navigation.state.params
    log = this.props.student.filter(i => i._id == stuId)
    logClass = this.props.class.filter(i => i._id == classId)
    logCheckIn = this.props.checkIn.filter(i => i.classId == classId)
    this.setState({
      student: log[0],
      class: logClass[0],
      checkIn: logCheckIn
    })
  }
  render() {
    const { _id, stuId, name, faculty, major, } = this.state.student
    const history = []
    this.state.checkIn.map(i => {
      i.studentList.map(v => {
        if (v._id == _id) {
          v['createdAt'] = i.createdAt
          history.push(v)
        }
      })
    })
    const percentage = (history.length/this.state.checkIn.length)*100||0
    return (
      <View style={styles.container}>
        <HeaderCheckinLog
          backBtn={() => this.props.navigation.navigate('StudentList')}
          name={'Check-in Log'}
        />
        <StudentDetailsCheckinLog
          stdId={stuId}
          name={name}
          faculty={faculty}
          major={major}
          percentage={`${percentage}%`}
        />
        <ScrollView>
          <View style={{ padding: 10 }}>
            <View style={{ borderRadius: 10, backgroundColor: '#fff' }}>
              {history.map(data => {
                return (
                  <View key={data._id} style={{ flexDirection: 'row', height: 50, paddingLeft: 15, paddingRight: 15, borderBottomColor: '#f3f3f3', borderBottomWidth: 2 }}>
                    <View style={{ justifyContent: 'center' }}>
                      <Ionicons
                        name='ios-radio-button-on'
                        size={10}
                        color={'#a50b69'}
                      />
                    </View>
                    <View style={{ justifyContent: 'center', marginLeft: 10, alignItems: 'flex-start' }}>
                      <Text style={{ fontSize: 18 }}>{formatDate(data.createdAt)}</Text>
                    </View>
                    <View style={{ justifyContent: 'center', flex: 1, alignItems: 'flex-end' }}>
                      <Text style={{ fontSize: 18 }}>{formatTime(data.time)}</Text>
                    </View>
                  </View>
                )
              })}

            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

StudentLogScreen.navigationOptions = {
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
  containerLeftHeader: {
    flex: 1,
    flexDirection: 'row'
  },
  leftSection1: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 10
  },
  leftSection2: {
    flex: 2,
    justifyContent: 'center'
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
  containerCheckinList: {
    backgroundColor: '#fff',
    marginTop: 5,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 10,
  },
});
const mapStateToProps = state => ({
  student: state.student,
  class: state.class,
  checkIn: state.checkIn
})

export default connect(mapStateToProps)(StudentLogScreen)