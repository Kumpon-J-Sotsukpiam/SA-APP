import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  PointPropType,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header, Button, SearchBar } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import { createFilter } from 'react-native-search-filter';
import { connect } from 'react-redux'
import { pull_student_in_class } from '../src/actions/class'
import { train_model, check_status_model } from '../src/actions/model'
const KEYS_TO_FILTERS = ['stuId', 'name', 'faculty', 'major'];
class ButtonTrain extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: {
        "-1": { "message": "Train Model" },
        "0": { "message": "Cancel Train Model" },
        "1": { "message": "Training Model" },
        "2": { "message": "Have Model" }
      }
    }
  }
  render() {
    const { status, disabled } = this.props
    return (
      <Button
        title={this.state.status[status == undefined ? -1 : status].message}
        buttonStyle={{ backgroundColor: '#fd4176', height: 50 }}
        onPress={this.props.onPress}
        disabled={disabled ? true : status == 1}
      />
    )
  }
}
class StudentListScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      autoClose: true,
      search: '',
      class: [],
      status: -1,
    };
    this.trainModel = this.trainModel.bind(this)
  }
  async componentWillMount() {
    const { classId } = this.props.navigation.state.params
    log = this.props.class.filter((i) => i._id === classId)
    this.setState({
      class: log[0]
    })
    await check_status_model(classId, res => {
      this.setState({
        status: res.status
      })
    })
  }
  searchUpdated(data) {
    this.setState({ search: data })
  }
  trainModel(id) {
    train_model(id, res => {
      this.setState({
        status: res.status
      })
    })
  }
  cancelQueue() {
    console.log('this cancel train');
  }
  render() {
    const propsStudent = this.props.student.filter(i => this.state.class.studentList.indexOf(i._id >= 0))
    const propsCheckIn = this.props.checkIn.filter(i => i.classId == this.state.class._id)
    const studentList = this.state.class.studentList

    propsStudent.map(i => {
      var history = 0
      propsCheckIn.map(ic => {
        ic.studentList.map(ics => {
          if (ics._id == i._id) {
            history++
          }
        })
      })
      i['history'] = history
    })
    const filteredStudent = propsStudent.filter(createFilter(this.state.search, KEYS_TO_FILTERS))
    return (
      <View style={styles.container}>
        <Header
          leftComponent={(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ClassDetails')}>
              <Ionicons
                name='ios-arrow-back'
                size={45}
                color='#fff'
              />
            </TouchableOpacity>
          )}
          rightComponent={(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('AddStudentList', { classId: this.state.class._id })}>
              <Ionicons name='ios-add'
                size={50}
                color={'#fff'}
              />
            </TouchableOpacity>
          )}
          centerComponent={(
            ({ text: 'Student List', style: { color: '#fff', fontSize: 24, fontWeight: 'bold' } })
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
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Checkin</Text>
            <Text style={{ fontSize: 9.5, fontWeight: 'bold' }}>(Percentage)</Text>
          </View>
        </View>

        <ScrollView>
          {filteredStudent.map(dataStudent => {
            const { _id, name, stuId, history } = dataStudent
            return (
              <View key={_id} style={{ backgroundColor: '#f3f3f3', margin: 3, borderRadius: 10 }}>
                <Swipeout left={[{
                  text: 'Delete',
                  backgroundColor: 'red',
                  onPress: () => { pull_student_in_class({ classId: this.state.class._id, stuId: _id }, this.props) }
                }]}
                  style={{ borderBottomLeftRadius: 10, borderTopLeftRadius: 10 }}
                  autoClose={this.state.autoClose}
                  backgroundColor='transparent'>
                  <TouchableOpacity onPress={() => { this.props.navigation.navigate('StudentLog', { classId: this.state.class._id, stuId: _id }) }}
                    style={{ flexDirection: 'row', backgroundColor: '#f3f3f3', borderRadius: 10, height: 50, paddingLeft: 5 }}>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                      <Text style={{ fontSize: 16 }}>{stuId}</Text>
                    </View>
                    <View style={{ flex: 2.5, justifyContent: 'center' }}>
                      <Text style={{ fontSize: 16 }}>{name}</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 16 }}>{`${(history/propsCheckIn.length)*100||0}%`}</Text>
                    </View>

                  </TouchableOpacity>
                </Swipeout>
              </View>
            )
          })}
        </ScrollView>
        <View style={styles.buttonButtom}>
          <ButtonTrain
            status={this.state.status}
            disabled={this.state.class.studentList.length == 0}
            onPress={() => {
              _id = this.state.class._id
              switch (this.state.status) {
                case -1:
                  this.trainModel(_id)
                  break;
                case 0:
                  this.cancelQueue(_id)
                  break;
                case 2:
                  this.trainModel(_id)
                  break;
              }
            }}
          />
        </View>
      </View>
    );
  }
}

StudentListScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  buttonButtom: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 10
  },
  containerStyle: {
    backgroundColor: '#fd4176',
    height: 80,
    justifyContent: 'space-around',
    borderBottomColor: '#be5f7a',
    borderBottomWidth: 1,
  },
});

const mapStateToProps = state => ({
  class: state.class,
  checkIn: state.checkIn,
  student: state.student
})
export default connect(mapStateToProps)(StudentListScreen)