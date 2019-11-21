import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header, Button, SearchBar } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import { connect } from 'react-redux'
import { createFilter } from 'react-native-search-filter';
import { del_student } from '../src/actions/student'
const KEYS_TO_FILTERS_STUDENT = ['name', 'stuId', 'major', 'faculty'];

class StudentsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autoClose: true,
      search: '',
    };
  }
  searchUpdated(data) {
    this.setState({ search: data })
  }
  handleCheckVideo(data) {
    if (data === true) {
      return (
        <Ionicons name='ios-checkmark'
          size={45}
          color={'blue'}
        />
      )
    } else {
      return (
        <Ionicons name='ios-close'
          size={45}
          color={'red'}
        />
      )
    }
  }
  render() {
    const filteredStudent = this.props.student.filter(createFilter(this.state.search, KEYS_TO_FILTERS_STUDENT))
    console.log(filteredStudent)
    return (
      <View style={styles.container}>
        <View>
          <Header
            rightComponent={(
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, marginRight: 5, justifyContent: 'center' }}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('ImportStudent')}>
                    <Ionicons name='ios-archive'
                      size={30}
                      color={'#fff'}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('AddStudent')}>
                    <Ionicons name='ios-add'
                      size={45}
                      color={'#fff'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            centerComponent={(
              ({ text: 'Students', style: { color: '#fff', fontSize: 36, fontWeight: 'bold' } })
            )}
            containerStyle={styles.containerStyle}
          />
        </View>

        <View style={{ flexWrap: 'wrap' }}>
          <SearchBar
            containerStyle={{ backgroundColor: '#fff', marginBottom: 3 }}
            placeholder="Search"
            lightTheme
            onChangeText={(data) => this.searchUpdated(data)}
            autoCorrect={false}
            value={this.state.search}
          />
        </View>

        <View style={{ flexDirection: 'row', padding: 2, backgroundColor: '#fff', height: 30, margin: 3 }}>
          <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Student ID</Text>
          </View>
          <View style={{ flex: 3.3, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Name</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Profile</Text>
            <Text style={{ fontSize: 9.5, fontWeight: 'bold' }}>Complete</Text>
          </View>
        </View>

        <ScrollView>
          <FlatList
            data={filteredStudent}
            extraData={this.props.student}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View key={item._id} style={{ backgroundColor: '#f3f3f3', margin: 3, borderRadius: 10 }}>
                <Swipeout left={[{
                  text: 'Delete',
                  backgroundColor: 'red',
                  onPress: () => { del_student(item._id, this.props) }
                }]}
                  style={{ borderBottomLeftRadius: 10, borderTopLeftRadius: 10 }}
                  autoClose={this.state.autoClose}
                  backgroundColor='transparent'>

                  <TouchableOpacity onPress={() => this.props.navigation.navigate('StudentProfile', { stuId: item._id })}
                    style={{ flexDirection: 'row', backgroundColor: '#f3f3f3', borderRadius: 10, height: 50, paddingLeft: 3 }}>

                    <View style={{ flex: 2, justifyContent: 'center' }}>
                      <Text style={{ fontSize: 16 }}>{item.stuId}</Text>
                    </View>
                    <View style={{ flex: 3.3, justifyContent: 'center' }}>
                      <Text style={{ fontSize: 16 }}>{item.name}</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 16 }}>{this.handleCheckVideo(item.upload)}</Text>
                    </View>
                  </TouchableOpacity>
                </Swipeout>
              </View>
            )}
          />
        </ScrollView>

      </View>
    );
  }
}

StudentsScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textHeader: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold'
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
  student: state.student
})
export default connect(mapStateToProps)(StudentsScreen)