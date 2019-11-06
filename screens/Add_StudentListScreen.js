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
import { Header, CheckBox, SearchBar } from 'react-native-elements';
import { createFilter } from 'react-native-search-filter';
import { push_student_in_class } from '../src/actions/class'

const KEYS_TO_FILTERS = ['stuId', 'name'];
class Add_StudentListScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      class: null,
      dataStudent: [],
    }
    this.handleOnSave = this.handleOnSave.bind(this)
  }
  componentWillMount() {
    const { classId } = this.props.navigation.state.params
    log = this.props.class.filter((i) => i._id === classId)
    this.setState({
      class: log[0]
    })
  }
  onCheckChanged(id, checked) {
    this.setState({
      dataStudent: (checked ? this.state.dataStudent.filter(i => i != id) : [...this.state.dataStudent, id])
    })
  }
  ListViewItemSeparator = () => {
    return (
      <View style={{ backgroundColor: '#000' }} />
    );
  };
  searchUpdated(data) {
    this.setState({ search: data })
  }
  handleOnSave = (data, props) => {
    dataReq = {
      classId:this.state.class._id,
      stuList:this.state.dataStudent
    }
    push_student_in_class(dataReq,this.props)
    this.props.navigation.navigate('StudentList')
  }
  render() {
    const propsStudent = this.props.student.filter(i => this.state.class.studentList.indexOf(i._id) < 0)
    const filteredStudent = propsStudent.filter(createFilter(this.state.search, KEYS_TO_FILTERS))

    return (
      <View style={styles.container}>
        <Header
          leftComponent={(<TouchableOpacity onPress={() => { this.props.navigation.navigate('StudentList') }}>
            <Text style={styles.textCancel}>Cancel</Text>
          </TouchableOpacity>
          )}
          centerComponent={({ text: 'Add Student', style: { color: '#fff', fontSize: 24, fontWeight: 'bold' } })}
          rightComponent={(<TouchableOpacity onPress={() => {
            this.handleOnSave(this.state,this.props)
          }}>
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
          <View>
          {filteredStudent.map(dataStudent => {
            return (
              
                <View key={dataStudent._id} style={{ flexDirection: 'row', padding: 2, backgroundColor: '#f3f3f3', height: 55, borderRadius: 10, margin: 3 }}>
                  <View style={{ flex: 2, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16 }}>{dataStudent.stuId}</Text>
                  </View>
                  <View style={{ flex: 2.5, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16 }}>{dataStudent.name}</Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <CheckBox
                      checked={this.state.dataStudent.indexOf(dataStudent._id) != -1}
                      onPress={e => this.onCheckChanged(dataStudent._id, this.state.dataStudent.indexOf(dataStudent._id) != -1)}
                    />
                  </View>
                </View> 
            )
          })}
          </View>
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
  student: state.student,
  class: state.class
})
export default connect(mapStateToProps)(Add_StudentListScreen)