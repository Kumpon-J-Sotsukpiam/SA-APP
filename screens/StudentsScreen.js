import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Picker
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header, Button, SearchBar } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import { createFilter } from 'react-native-search-filter';
import { isThisHour } from 'date-fns';

const KEYS_TO_FILTERS = ['studentID', 'studentName','faculty','major'];

export default class StudentsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      autoClose: true,
      search: '',
      faculty:'',
      major:'',
      test:'',
      dataStudent: [
        { key: '1', studentID: 5905100025, studentName: 'Chanathip Nobnom',faculty:'School of Science and Technology',major:'Computer Science', percentage: '100%' },
        { key: '2', studentID: 5905100026, studentName: 'Champ Nobnom',faculty:'School of Science and Technology',major:'Financial engineering',  percentage: '100%' },
        { key: '3', studentID: 5915100026, studentName: 'Chanathip Moochamp',faculty:'School of Law',major:'Food Science',  percentage: '100%' },
        { key: '4', studentID: 1100500589302, studentName: 'Champ Iix',faculty:'School of Communication OF Arts',major:'Advertise',  percentage: '100%' },
      ],
    };
  }
  searchUpdated(data) {
    this.setState({ search: data,test:data+' '+this.state.faculty })
  }

  setFaculty(data) {
    this.setState({ showMajor:true,faculty: data,test:this.state.search+' '+data })
  }

  setMajor(data) {
    this.setState({ major: data,test:this.state.search+' '+this.state.faculty+' '+data})
  }

 

  render() {

    const filteredStudent = this.state.dataStudent.filter(createFilter(this.state.test,KEYS_TO_FILTERS))
    const { dataStudent } = this.state;
    return (
      <View style={styles.container}>
        <View>
        <Header
          rightComponent={(
            <Ionicons name='ios-add'
              size={60}
              color={'#fff'}
              onPress={() => { this.props.navigation.navigate('AddStudentList') }}
            />)}
          rightContainerStyle={{ flex: 1 }}
          centerComponent={(
            <View style={styles.containerHeader}>
              <View style={styles.containerTextHeader}>
                <Text style={styles.textHeader}>Students</Text>
              </View>
            </View>
          )}
          centerContainerStyle={{ flex: 9 }}
          containerStyle={styles.containerStyle}
        />
        </View>

        
        <View style={{flexWrap:'wrap'}}>
        <SearchBar
          containerStyle={{ backgroundColor: '#fff', marginBottom: 3 }}
          placeholder="Search"
          lightTheme
          onChangeText={(data) => this.searchUpdated(data)}
          autoCorrect={false}
          value={this.state.search}
        />
        </View>


        

          
        

        <View style={{flexDirection: 'row', padding: 2, backgroundColor: '#fff', height: 30, margin: 3 }}>
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
            return (

              <View key={dataStudent.key} style={{ backgroundColor: '#f3f3f3', margin: 3, borderRadius: 10 }}>
                <Swipeout left={[{
                  text: 'Delete',
                  backgroundColor: 'red',

                }]}
                  style={{ borderBottomLeftRadius: 10, borderTopLeftRadius: 10 }}
                  autoClose={this.state.autoClose}
                  backgroundColor='transparent'>

                  <TouchableOpacity onPress={() => alert(dataStudent.studentID)}
                    style={{ flexDirection: 'row', backgroundColor: '#f3f3f3', borderRadius: 10, height: 50, paddingLeft: 5 }}>

                    <View style={{ flex: 2, justifyContent: 'center' }}>
                      <Text style={{ fontSize: 16 }}>{dataStudent.studentID}</Text>
                    </View>
                    <View style={{ flex: 2.5, justifyContent: 'center' }}>
                      <Text style={{ fontSize: 16 }}>{dataStudent.studentName}</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 16 }}>{dataStudent.percentage}</Text>
                    </View>

                  </TouchableOpacity>
                </Swipeout>
              </View>

            )
          })}

        </ScrollView>
          
        <Picker
          selectedValue={this.state.faculty}
          style={{bottom:0,left:0,right:0,position:'absolute'}}
          onValueChange={(itemValue, itemIndex) => this.setFaculty(itemValue)}>
        <Picker.Item label='Default' value='' />
        <Picker.Item label='School of Business' value='School of Business' />
        <Picker.Item label='School of Accountancy' value='School of Accountancy' />
        <Picker.Item label='School of Science and Technology' value='School of Science and Technology' />
        <Picker.Item label='School of Economics' value='School of Economics' />
        <Picker.Item label='School of Humanities and Applied Arts' value='School of Humanities and Applied Arts' />
        <Picker.Item label='School of Communication of Arts' value='School of Communication of Arts' />
        <Picker.Item label='School of Law' value='School of Law' />
        <Picker.Item label='School of Tourism and Services' value='School of Tourism and Services' />
        <Picker.Item label='School of Engineering' value='School of Engineering' />
        <Picker.Item label='School of Early Childhood Education' value='School of Early Childhood Education' />
        <Picker.Item label='College of Entrepreneurship' value='College of Entrepreneurship' />
        <Picker.Item label='International School of Management' value='International School of Management' />
        <Picker.Item label='Extension School' value='Extension School' />
        </Picker>



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
  containerStyle: {
    backgroundColor: '#fd4176',
    height: 120,
    justifyContent: 'space-around',
    borderBottomColor: '#be5f7a',
    borderBottomWidth: 1,
  },
});