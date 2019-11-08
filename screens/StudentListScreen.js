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
import { pull_student_in_class } from '../src/actions/class'
import { train_model } from '../src/actions/model'
const KEYS_TO_FILTERS = ['name', 'stuId'];

class StudentListScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      autoClose: true,
      search: '',
      class: [],
    };
    this.trainModel = this.trainModel.bind(this)
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
  trainModel(){
    train_model(this.state.class._id)
  }
  render() {
    //const filteredStudent = this.state.dataStudent.filter(createFilter(this.state.search, KEYS_TO_FILTERS))
    
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
          {this.state.class.studentList.map(dataStudent => {
            const { _id, name, stuId } = this.props.student.filter(i => i._id == dataStudent)[0]
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
                  <TouchableOpacity onPress={() => { this.props.navigation.navigate('StudentLog')}}
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
            onPress={() => {
              this.trainModel()
              //this.props.navigation.navigate('TraingingModel')
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
  student: state.student
})
export default connect(mapStateToProps)(StudentListScreen)