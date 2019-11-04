import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header, Button, SearchBar } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import { createFilter } from 'react-native-search-filter';
import { connect } from 'react-redux'

const KEYS_TO_FILTERS = ['studentID', 'studentName'];

class StudentListScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      autoClose: true,
      search: '',
      class: [],
      dataStudent: [
        { key: '1', studentID: 5905100025, studentName: 'Chanathip Nobnom', percentage: '100%' },
        { key: '2', studentID: 5905100026, studentName: 'Champ Nobnom', percentage: '100%' },
        { key: '3', studentID: 5915100026, studentName: 'Chanathip Moochamp', percentage: '100%' },
        { key: '4', studentID: 1100500589302, studentName: 'Champ Iix', percentage: '100%' },
      ],
    };
  }
  componentWillMount() {
    const { classId } = this.props.navigation.state.params
    log = this.props.class.filter((i) => i._id === classId)
    this.setState({
      class: log[0]
    })
  }
  searchUpdated(data) {
    this.setState({ search: data })
  }

  render() {
    const filteredStudent = this.state.dataStudent.filter(createFilter(this.state.search, KEYS_TO_FILTERS))
    const { dataStudent } = this.state;
    return (
      <View style={styles.container}>
        <Header

          leftComponent={(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ClassDetails')}>
              <Ionicons
                name='ios-arrow-back'
                size={35}
                color='#fff'
              />
            </TouchableOpacity>
          )}
          leftContainerStyle={{ flex: 2 }}
          rightComponent={(
            <Ionicons name='ios-add'
              size={60}
              color={'#fff'}
              onPress={() => { this.props.navigation.navigate('AddStudentList', { classId: this.state.class._id }) }}
            />)}
          rightContainerStyle={{ flex: 1 }}
          centerComponent={(
            <View style={styles.containerHeader}>
              <View style={styles.containerTextHeader}>
                <Text style={styles.textHeader}>Student List</Text>
              </View>
            </View>
          )}
          centerContainerStyle={{ flex: 9 }}
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
          {this.state.class.studentList.map(dataStudent => {
            const { _id, name, stuId } = this.props.student.filter(i => i._id == dataStudent)[0]
            return (
              <View key={_id} style={{ backgroundColor: '#f3f3f3', margin: 3, borderRadius: 10 }}>
                <Swipeout left={[{
                  text: 'Delete',
                  backgroundColor: 'red',

                }]}
                  style={{ borderBottomLeftRadius: 10, borderTopLeftRadius: 10 }}
                  autoClose={this.state.autoClose}
                  backgroundColor='transparent'>

                  <TouchableOpacity onPress={() => alert(_id)}
                    style={{ flexDirection: 'row', backgroundColor: '#f3f3f3', borderRadius: 10, height: 50, paddingLeft: 5 }}>

                    <View style={{ flex: 2, justifyContent: 'center' }}>
                      <Text style={{ fontSize: 16 }}>{stuId}</Text>
                    </View>
                    <View style={{ flex: 2.5, justifyContent: 'center' }}>
                      <Text style={{ fontSize: 16 }}>{name}</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 16 }}>{100}</Text>
                    </View>

                  </TouchableOpacity>
                </Swipeout>
              </View>
            )
          })}
        </ScrollView>
        <View style={styles.buttonButtom}>
          <Button
            title="Training Model"
            buttonStyle={{ backgroundColor: '#fd4176', height: 50 }}
            onPress={() => { this.props.navigation.navigate('TraingingModel') }}
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
  buttonButtom: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 10
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
  student: state.student
})
export default connect(mapStateToProps)(StudentListScreen)