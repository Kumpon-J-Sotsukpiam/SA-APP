import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header, CheckBox, SearchBar } from 'react-native-elements';
import { createFilter } from 'react-native-search-filter';


const KEYS_TO_FILTERS = ['studentID', 'studentName'];


export default class Add_StudentListScreen extends React.Component {
  constructor(props) {
    super(props);

      this.state = {
     
        search:'',      

        dataStudentAbsence: [
          { key:'1',studentID: 5905100025, studentName:'Chanathip Nobnom',checked:false },
          { key:'2',studentID: 5905100026, studentName:'Champ Nobnom',checked:false},
          { key:'3',studentID: 5915100026, studentName:'Chanathip Moochamp',checked:false},
          { key:'4',studentID: 1100500589302, studentName:'Champ Iix',checked:false},
                     ],
    }

  }

  onCheckChanged(studentID) {
      const dataStudentAbsence = this.state.dataStudentAbsence;
      const index = dataStudentAbsence.findIndex(x => x.studentID === studentID);
      dataStudentAbsence[index].checked = !dataStudentAbsence[index].checked;
      this.setState(dataStudentAbsence);
  }

  
  searchUpdated(data) {
    this.setState({ search: data })
  }

  
 render() {

  const filteredStudentAbsence = this.state.dataStudentAbsence.filter(createFilter(this.state.search, KEYS_TO_FILTERS))
  


  return (
    <View style = {styles.container}>
      <Header
        leftComponent={(<TouchableOpacity onPress={()=>{this.props.navigation.navigate('CheckinDetails')}}>
                          <Text style={styles.textCancel}>Cancel</Text>
                        </TouchableOpacity>
                        )}
        centerComponent={({ text: 'Add Checkin', style:{color: '#fff', fontSize:24, fontWeight:'bold'} })}
        rightComponent={(<TouchableOpacity onPress={()=>{this.props.navigation.navigate('CheckinDetails')}}>
                          <Text style={styles.textSave}>Save</Text>
                        </TouchableOpacity>
                        )}
        containerStyle={styles.containerStyle}
      />
        
      <SearchBar
      containerStyle={{backgroundColor:'#fff',marginBottom:3}}   
      placeholder="Search"        
      lightTheme        
      onChangeText={(data) => this.searchUpdated(data)}
      autoCorrect={false}
      value={this.state.search}

       /> 

            <View style={{flexDirection:'row',padding:2,backgroundColor:'#fff',height:30,margin:3}}>
                            <View style={{flex:2,justifyContent:'center',alignItems:'center'}}>
                              <Text style={{fontSize:16,fontWeight:'bold'}}>Student ID</Text>
                            </View>
                            <View style={{flex:2.5,justifyContent:'center',alignItems:'center'}}>
                              <Text style={{fontSize:16,fontWeight:'bold'}}>Name</Text>
                            </View>
                            <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:16,fontWeight:'bold'}}>Add</Text>
                            </View>
                          </View>

      
      <ScrollView>
      {filteredStudentAbsence.map(dataStudentAbsence => {
            return (
              <TouchableOpacity onPress={()=>alert(dataStudentAbsence.studentID)} key={dataStudentAbsence.key}>
                          <View style={{flexDirection:'row',padding:2,backgroundColor:'#f3f3f3',height:55,borderRadius:10,margin:3}}>
                            <View style={{flex:2,justifyContent:'center'}}>
                              <Text style={{fontSize:16}}>{dataStudentAbsence.studentID}</Text>
                            </View>
                            <View style={{flex:2.5,justifyContent:'center'}}>
                              <Text style={{fontSize:16}}>{dataStudentAbsence.studentName}</Text>
                            </View>
                            <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                            <CheckBox
                              checked={dataStudentAbsence.checked}
                              onPress={() => this.onCheckChanged(dataStudentAbsence.studentID)}
          
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
  header:null
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
    justifyContent:'center',
    alignItems: 'center'
  },
  textHeader:{
      color: '#fff',
      fontSize:36,
      fontWeight:'bold'
  },
  textInput: {
    backgroundColor:'#fff',
    height:50,
    padding: 10,
    fontSize:18,
    color:'gray',
    marginTop:10,
    textAlign:'center'
  },
  containerStyle:{
    backgroundColor: '#fd4176',
    height:80,
    justifyContent: 'space-around',
    borderBottomColor: '#be5f7a',
    borderBottomWidth: 1,
  },
  textCancel: {
    fontSize:18,
    color:'#fff'
  },
  textSave: {
    fontSize:18,
    color:'#fff'
  },
});