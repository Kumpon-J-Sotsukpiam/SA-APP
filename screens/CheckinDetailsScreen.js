import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header, SearchBar } from 'react-native-elements';
import { createFilter } from 'react-native-search-filter';
import { connect } from 'react-redux';
import { getDayOfWeek, formatTime, formatDate } from "../src/actions/date"

const KEYS_TO_FILTERS = ['stuId', 'name', 'type'];
class CheckinDetailsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      checkIn: []
    };
  }
  searchUpdated(data) {
    this.setState({ search: data })
  }
  async componentWillMount() {
    const { checkInId,/*createdAt*/ } = this.props.navigation.state.params
    console.log('====================================');
    console.log(checkInId);
    console.log('====================================');
    log = this.props.checkIn.filter(i => (i._id == checkInId/* && i.createdAt == createdAt*/))
    this.setState({
      checkIn: log[0]
    })
  }
  render() {
    console.log('====================================');
    console.log(this.state.checkIn);
    console.log('====================================');
    const propStudentAllOfClass = this.props.class.filter(i => i._id == this.state.checkIn.classId)[0].studentList
    const propsStudentIdPresent = []
    this.state.checkIn.studentList.map(i => propsStudentIdPresent.push(i._id))
    const propsStudentIdAbsenec = propStudentAllOfClass.filter(i => propsStudentIdPresent.indexOf(i) < 0)
    studentListAbsenec = this.props.student.filter(i => propsStudentIdAbsenec.indexOf(i._id) >= 0)
    studentListPresent = this.props.student.filter(i => {
      if(propsStudentIdPresent.indexOf(i._id) >= 0){
        const {type,time} = this.state.checkIn.studentList.filter(v => v._id == i._id)[0]
        i['type'] = type
        i['time'] = time
        return i
      }
    })
    const filteredStudentAbsence = studentListAbsenec.filter(createFilter(this.state.search, KEYS_TO_FILTERS))
    const filteredStudentPresent = studentListPresent.filter(createFilter(this.state.search, KEYS_TO_FILTERS))
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
            <TouchableOpacity onPress={() => this.props.navigation.navigate('AddCheckin', { checkInId: this.state.checkIn._id })}>
              <Ionicons name='ios-add'
                size={50}
                color={'#fff'}
              />
            </TouchableOpacity>
          )}
          centerComponent={(
            ({ text: formatDate(this.state.checkIn.createdAt), style: { color: '#fff', fontSize: 24, fontWeight: 'bold' } })
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

        <ScrollView>
          <View style={styles.containerClasses}>
            <Text style={styles.textClasses}>ABSENEC</Text>
          </View>
          {filteredStudentAbsence.map(dataStudentAbsence => {
            return (

              <View key={dataStudentAbsence._id} style={{ backgroundColor: '#f3f3f3', margin: 3, borderRadius: 10 }}>

                <TouchableOpacity onPress={() => alert(dataStudentAbsence.stuId)}
                  style={{ flexDirection: 'row', backgroundColor: '#f3f3f3', borderRadius: 10, height: 50, paddingLeft: 5 }}>

                  <View style={{ flex: 2.5, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16 }}>{dataStudentAbsence.stuId}</Text>
                  </View>
                  <View style={{ flex: 2.5, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16 }}>{dataStudentAbsence.name}</Text>
                  </View>
                  <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16 }}>{'-'}</Text>
                  </View>

                </TouchableOpacity>
              </View>

            )
          })}
          <View style={styles.containerClasses}>
            <Text style={styles.textClasses}>PRESENT</Text>
          </View>
          {filteredStudentPresent.map(dataStudentPresent => {
            return (
              <View key={dataStudentPresent._id} style={{ backgroundColor: '#f3f3f3', margin: 3, borderRadius: 10 }}>
                <TouchableOpacity onPress={() => alert(dataStudentPresent.stuId)}
                  style={{ flexDirection: 'row', backgroundColor: '#f3f3f3', borderRadius: 10, height: 50, paddingLeft: 5 }}>

                  <View style={{ flex: 2.5, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16 }}>{dataStudentPresent.stuId}</Text>
                  </View>
                  <View style={{ flex: 2.5, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16 }}>{dataStudentPresent.name}</Text>
                  </View>
                  <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16 }}>{dataStudentPresent.type},{formatTime(dataStudentPresent.time)}</Text>
                  </View>

                </TouchableOpacity>
              </View>
            )
          })}
        </ScrollView>
      </View>
    );
  }
}

CheckinDetailsScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerStyle: {
    backgroundColor: '#fd4176',
    height: 80,
    justifyContent: 'space-around',
    borderBottomColor: '#be5f7a',
    borderBottomWidth: 1,
  },
  textClasses: {
    fontSize: 20,
    color: 'gray'
  },
  containerClasses: {
    marginTop: 10,
    marginLeft: 25,
    marginBottom: 10
  },
});
const mapStateToProps = state => ({
  checkIn: state.checkIn,
  student: state.student,
  class: state.class
})
export default connect(mapStateToProps)(CheckinDetailsScreen)
