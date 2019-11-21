import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux'
import { push_student_in_checkIn } from '../src/actions/checkIn'
import { Header, CheckBox, SearchBar } from 'react-native-elements';
import { createFilter } from 'react-native-search-filter';
const KEYS_TO_FILTERS = ['stuId', 'name'];
class Add_StudentListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      dataStudent: [],
      checkIn: [],
    }
    this.handleOnSave = this.handleOnSave.bind(this)
  }
  async componentWillMount() {
    const { checkInId} = this.props.navigation.state.params
    log = this.props.checkIn.filter(i => (i._id == checkInId))
    this.setState({
      checkIn: log[0]
    })
  }
  onCheckChanged(id, checked) {
    this.setState({
      dataStudent: (checked ? this.state.dataStudent.filter(i => i != id) : [...this.state.dataStudent, id])
    })
  }
  handleOnSave = (data, props) => {
    dataReq = {
      checkInId:this.state.checkIn._id,
      stuList:this.state.dataStudent
    }
    push_student_in_checkIn(dataReq,this.props)
    this.props.navigation.navigate('CheckinDetails')
  }
  searchUpdated(data) {
    this.setState({ search: data })
  }

  render() {    
    const propStudentAllOfClass = this.props.class.filter(i => i._id == this.state.checkIn.classId)[0].studentList
    const propsStudentIdPresent = []
    this.state.checkIn.studentList.map(i => propsStudentIdPresent.push(i._id))
    const propsStudentIdAbsenec = propStudentAllOfClass.filter(i => propsStudentIdPresent.indexOf(i) < 0)
    studentListAbsenec = this.props.student.filter(i => propsStudentIdAbsenec.indexOf(i._id) >= 0)
    const filteredStudentAbsence = studentListAbsenec.filter(createFilter(this.state.search, KEYS_TO_FILTERS))
    return (
      <View style={styles.container}>
        <Header
          leftComponent={(
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('CheckinDetails') }}>
              <Text style={styles.textCancel}>Cancel</Text>
            </TouchableOpacity>
          )}
          centerComponent={({ text: 'Add Check-in', style: { color: '#fff', fontSize: 24, fontWeight: 'bold' } })}
          rightComponent={(
            <TouchableOpacity onPress={() => {this.handleOnSave(this.state,this.props) }}>
              <Text style={styles.textSave}>Save</Text>
            </TouchableOpacity>
          )}
          containerStyle={styles.containerStyle}
        />

        <SearchBar
          containerStyle={{ backgroundColor: '#fff', marginBottom: 3 }}
          placeholder="Search"
          lightTheme
          onChangeText={(data) => this.searchUpdated(data)}
          autoCorrect={false}
          value={this.state.search}
        />
        <View style={{ flexDirection: 'row', padding: 2, backgroundColor: '#fff', height: 30, margin: 3 }}>
          <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Student ID</Text>
          </View>
          <View style={{ flex: 2.5, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Name</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Add</Text>
          </View>
        </View>
        <ScrollView>
          {filteredStudentAbsence.map(dataStudentAbsence => {
            return (
              <TouchableOpacity onPress={() => alert(dataStudentAbsence.stuId)} key={dataStudentAbsence._id}>
                <View style={{ flexDirection: 'row', padding: 2, backgroundColor: '#f3f3f3', height: 55, borderRadius: 10, margin: 3 }}>
                  <View style={{ flex: 2, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16 }}>{dataStudentAbsence.stuId}</Text>
                  </View>
                  <View style={{ flex: 2.5, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16 }}>{dataStudentAbsence.name}</Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <CheckBox
                      checked={this.state.dataStudent.indexOf(dataStudentAbsence._id) != -1}
                      onPress={e => this.onCheckChanged(dataStudentAbsence._id, this.state.dataStudent.indexOf(dataStudentAbsence._id) != -1)}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    );
  }
}

Add_StudentListScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  textInput: {
    backgroundColor: '#fff',
    height: 50,
    padding: 10,
    fontSize: 18,
    color: 'gray',
    marginTop: 10,
    textAlign: 'center'
  },
  containerStyle: {
    backgroundColor: '#fd4176',
    height: 80,
    justifyContent: 'space-around',
    borderBottomColor: '#be5f7a',
    borderBottomWidth: 1,
  },
  textCancel: {
    fontSize: 18,
    color: '#fff'
  },
  textSave: {
    fontSize: 18,
    color: '#fff'
  },
});
const mapStateToProps = state => ({
  checkIn: state.checkIn,
  student: state.student,
  class: state.class
})
export default connect(mapStateToProps)(Add_StudentListScreen)
