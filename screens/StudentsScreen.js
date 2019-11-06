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
import { Header, Button, SearchBar} from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import {connect} from 'react-redux'
import { createFilter } from 'react-native-search-filter';
import { del_student } from '../src/actions/student'
import { school } from '../constants'
const KEYS_TO_FILTERS_STUDENT = ['name', 'stuId','major','faculty'];
const KEYS_TO_FILTERS_SCHOOL = ['faculty.name'];

class StudentsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      autoClose: true,
      search: '',
      faculty:'',
      major:'',
      resultFilter:'',
      toggleFaculty:false,
      toggleMajor:false,
      filterMajor:false,
      majorList:[],
    };
  }
  searchUpdated(data) {
    this.setState({ search: data,resultFilter:data+' '+this.state.faculty+' '+this.state.major })
  }

  setFaculty(data) {
    this.setState({ 
      filterMajor:true,
      faculty: data,
      resultFilter:this.state.search+' '+data,
      major:'',
    })
    
    if(data === ''){
      this.setState({filterMajor:false})
    }
    setMajor = school.filter(createFilter(data,KEYS_TO_FILTERS_SCHOOL))
    this.setState({majorList : setMajor})

  }

  setMajor(data) {
    this.setState({ major: data,resultFilter:this.state.search+' '+this.state.faculty+' '+data})
  }

  toggleFaculty(){
    this.setState({toggleFaculty:!this.state.toggleFaculty})
  }
  toggleMajor(){
    this.setState({toggleMajor:!this.state.toggleMajor})
  }

  render() {
    
    const filteredStudent = this.props.student.filter(createFilter(this.state.resultFilter,KEYS_TO_FILTERS_STUDENT))
    
    
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
          {filteredStudent.map(dataStudent => {
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
          {school.map(item => {
            return (<Picker.Item label={item.faculty.name} value={item.faculty.name} key={item.faculty.name}/>)
          })}
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
          {this.state.majorList.map((item) =>  
                Object.keys(item.faculty.major).map((key) => {
                  return (<Picker.Item label={item.faculty.major[key]} value={item.faculty.major[key]} key={key}/>)
          })
          )
          }
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