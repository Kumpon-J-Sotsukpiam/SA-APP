import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Picker,
  Modal,
  TouchableHighlight,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header, Button, SearchBar,Icon } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import {connect} from 'react-redux'
import { createFilter } from 'react-native-search-filter';
import { del_student } from '../src/actions/student'
const KEYS_TO_FILTERS = ['studentID', 'studentName','faculty','major'];
class StudentsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      autoClose: true,
      search: '',
      faculty:'',
      major:'',
      test:'',
      toggleFaculty:false,
      toggleMajor:false,
      filterMajor:false,
      majorList:[],
      dataStudent: [
        { key: '1', studentID: 5905100025, studentName: 'Chanathip Nobnom',faculty:'School of Science and Technology',major:'Computer Science'},
        { key: '2', studentID: 5905100026, studentName: 'Champ Nobnom',faculty:'School of Science and Technology',major:'Financial engineering'},
        { key: '3', studentID: 5915100026, studentName: 'Chanathip Moochamp',faculty:'School of Law',major:'Food Science'},
        { key: '4', studentID: 1100500589302, studentName: 'Champ Iix',faculty:'School of Communication OF Arts',major:'Advertise'},
      ],
    };
  }
  searchUpdated(data) {
    this.setState({ search: data,test:data+' '+this.state.faculty+' '+this.state.major })
  }

  setFaculty(data) {
    this.setState({ 
      filterMajor:true,
      faculty: data,
      test:this.state.search+' '+data,
      major:'',
    })
    this.setMajorList(data)
  }

  setMajor(data) {
    this.setState({ major: data,test:this.state.search+' '+this.state.faculty+' '+data})
  }

  toggleFaculty(){
    this.setState({toggleFaculty:!this.state.toggleFaculty})
  }
  toggleMajor(){
    this.setState({toggleMajor:!this.state.toggleMajor})
  }

  setMajorList(data){
    var major=[];

    if(data == 'School of Business'){
      major = [
               'Marketing',
               'International Business Management',
               'Finance',
               'Management',
               'Business Computer',
               'Logistics Management',
               'Game and eSports',
               'Innovation Driven Entrepreneurship'
              ]
    }
    if (data == 'School of Accountancy' ){
      major = [
               'Accountancy',
               'Accountancy (International Program)',
              ]
    }

    if (data == 'School of Science and Technology' ){
      major = [
               'Computer Science',
               'Computer Animation',
               'Information and Communication Technology',
               'Financial Engineering',
               'Food Science and Technology',
               'Food Business Management',
               'Food Innovation',
               'Digital Technology',
               'Big Data Management',
               'Interdisciplinary'
              ]
    }

    if (data == 'School of Economics' ){
      major = [
               'Economics',
              ]
    }
    
    if (data == 'School of Humanities and Applied Arts' ){
      major = [
               'Business English (Bilingual Program)',
               'English for Business Communication',
               'Japanese',
               'English and Translation',
               'Thai Language for Communication',
               'Chinese',
               'Performing Arts',
               'Korean',
               'Interdisciplinary Studies',

              ]
    }
    
    if (data == 'School of Communication of Arts' ){
      major = [
               'Communication Arts Program',
              ]
    }

    if (data == 'School of Engineering' ){
      major = [
               'Electrical and Energy Engineering',
               'Logistics Engineering',
               'Computer Engineering and Artificial Intelligence',
               'Rail Business Innovation Engineering',
               'Automotion Innovation Engineering',
              ]
    }

    if (data == 'School of Tourism and Services' ){
      major = [
               'Tourism',
               'Hotel Management',
               'Tourism Management',
               'Airline Business Management',
               'Event Management',
               'Tourism Management (International Program)'
              ]
    }

    if (data == 'School of Law' ){
      major = [
               'Laws',
              ]
    }

    if (data == 'School of Early Childhood Education' ){
      major = [
               'Early Childhood Education',
              ]
    }

    if (data == 'College of Entrepreneurship' ){
      major = [
               'Entrepreneurship',
              ]
    }

    if (data == 'International School of Management' ){
      major = [
               'Accountancy (International Program)',
               'Business Administration (International Program)'
              ]
    }

    this.setState({majorList:major})
  }

  render() {
    console.log(this.props.student);
    
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
              onPress={() => { this.props.navigation.navigate('AddStudent') }}
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


        <View>
        {Platform.OS === 'ios' ? (<Button
          title={(' Filter Faculty '+this.state.faculty)}
          type='clear'
          titleStyle={{color:'#000',fontSize:14}}
          icon= {
            <Ionicons
              name='ios-add'
              size={20}
              color='black'
            />}
            onPress={()=> this.toggleFaculty()}
        />) : (<Text>Test</Text>)}


        {Platform.OS === 'ios' ? 
        this.state.filterMajor &&(
                  <Button
                  title={(' Filter Major '+this.state.major)}
                  type='clear'
                  titleStyle={{color:'#000',fontSize:14}}
                  icon= {
                    <Ionicons
                      name='ios-add'
                      size={20}
                      color='black'
                    />}
                    onPress={()=> this.toggleMajor()}
                />) : (<Text>Test</Text>
                
                )}
        
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
        </View>

        <ScrollView>
          {(this.props.student).map(dataStudent => {
            return (

              <View key={dataStudent._id} style={{ backgroundColor: '#f3f3f3', margin: 3, borderRadius: 10 }}>
                <Swipeout left={[{
                  text: 'Delete',
                  backgroundColor: 'red',
                  onPress: () => { del_student(dataStudent._id, this.props)}
                }]}
                  style={{ borderBottomLeftRadius: 10, borderTopLeftRadius: 10 }}
                  autoClose={this.state.autoClose}
                  backgroundColor='transparent'>

                  <TouchableOpacity onPress={() => alert(dataStudent.stuId)}
                    style={{ flexDirection: 'row', backgroundColor: '#f3f3f3', borderRadius: 10, height: 50, paddingLeft: 5 }}>

                    <View style={{ flex: 2, justifyContent: 'center' }}>
                      <Text style={{ fontSize: 16 }}>{dataStudent.stuId}</Text>
                    </View>
                    <View style={{ flex: 2.5, justifyContent: 'center' }}>
                      <Text style={{ fontSize: 16 }}>{dataStudent.name}</Text>
                    </View>
                  </TouchableOpacity>
                </Swipeout>
              </View>

            )
          })}

        </ScrollView>
          


        <Modal visible={this.state.toggleFaculty}
        transparent={true}
        animationType={'slide'}
        onRequestClose={()=> console.log('Close')}>
         
          <TouchableHighlight style={{bottom:0,left:0,right:0,top:0,position:'absolute',justifyContent:'center'}} onPress={() => this.toggleFaculty()}>
          <Picker
          selectedValue={this.state.faculty}
          style={{bottom:0,left:0,right:0,position:'absolute',backgroundColor:'#f3f3f3'}}
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
        </Picker>
        
          </TouchableHighlight>
        </Modal>

        <Modal visible={this.state.toggleMajor}
        transparent={true}
        animationType={'slide'}
        onRequestClose={()=> console.log('Close')}>
         
          <TouchableHighlight style={{bottom:0,left:0,right:0,top:0,position:'absolute',}} onPress={() => this.toggleMajor()}>
          <Picker
          selectedValue={this.state.major}
          style={{bottom:0,left:0,right:0,position:'absolute',backgroundColor:'#f3f3f3'}}
          onValueChange={(itemValue, itemIndex) => this.setMajor(itemValue)}>
                    <Picker.Item label='Default' value='' />
          {Object.keys(this.state.majorList).map((key) => {
            return (<Picker.Item label={this.state.majorList[key]} value={this.state.majorList[key]} key={key}/>)
          })}
        </Picker>
        
          </TouchableHighlight>
        </Modal>



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
const mapStateToProps = state => ({
  student: state.student
})
export default connect(mapStateToProps)(StudentsScreen)