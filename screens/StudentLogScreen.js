import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import HeaderCheckinLog from '../components/HeaderCheckinLog';
import { connect } from 'react-redux'
import StudentDetailsCheckinLog from '../components/StudentDetailsCheckinLog copy';

class StudentLogScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentID:'5905100025',
      name:'Jiraphat Asavagunchorn',
      faculty:'School of Science and Technology',
      major:'Computer Science',
      percentage:'100%',
      dataTest:[{id:'1',date:'6/11/2019',time:''}]
    };
  }
  
  render() {

    return (
      <View style={styles.container}>
        
        <HeaderCheckinLog
          backBtn = {() => this.props.navigation.navigate('StudentList')}
          name = {'Check-in Log'}
        />

        <StudentDetailsCheckinLog
          stdId = {this.state.studentID}
          name = {this.state.name}
          faculty = {this.state.faculty}
          major = {this.state.major}
          percentage = {this.state.percentage}
        />

              

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
    marginTop:5,
    marginRight:10,
    marginLeft:10,
    borderRadius:10,
  },
});

export default StudentLogScreen