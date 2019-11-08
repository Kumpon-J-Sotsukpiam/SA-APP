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

const KEYS_TO_FILTERS = ['studentID', 'studentName','type'];


export default class CheckinDetailsScreen extends React.Component {
  constructor(props) {
    super(props);

      this.state = {
        search:'',
        date:'18 January 2019',
        dataStudentPresent: [
          { key:'1',studentID: 5905100025, studentName:'Chanathip Nobnom',type:'Face',time:'09.00' },
          { key:'2',studentID: 5905100026, studentName:'Champ Nobnom',type: 'Manual',time:'09.25' },
          { key:'3',studentID: 5915100026, studentName:'Chanathip Moochamp',type:'Face',time:'09.00'},
          { key:'4',studentID: 1100500589302, studentName:'Champ Iix',type: 'Face',time:'09.10' },
        ],
        dataStudentAbsence: [
          { key:'1',studentID: 5905100025, studentName:'Chanathip Nobnom',type:'Face',time:'09.00' },
          { key:'2',studentID: 5905100026, studentName:'Champ Nobnom',type: 'Manual',time:'09.25' },
          { key:'3',studentID: 5915100026, studentName:'Chanathip Moochamp',type:'Face',time:'09.00'},
          { key:'4',studentID: 1100500589302, studentName:'Champ Iix',type: 'Face',time:'09.10' },
        ],
    };
  }
  searchUpdated(data) {
    this.setState({ search: data })
  }

 render() {

  const filteredStudentAbsence = this.state.dataStudentAbsence.filter(createFilter(this.state.search, KEYS_TO_FILTERS))
  const filteredStudentPresent = this.state.dataStudentPresent.filter(createFilter(this.state.search, KEYS_TO_FILTERS))
 

  return (
    <View style = {styles.container}>

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
            <TouchableOpacity onPress={() => this.props.navigation.navigate('AddCheckin')}>
              <Ionicons name='ios-add'
                size={50}
                color={'#fff'}
              />
            </TouchableOpacity>
              )}
    
          centerComponent={(
              ({ text: this.state.date, style: { color: '#fff', fontSize: 24, fontWeight: 'bold' } })
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

      <ScrollView>

      <View style={styles.containerClasses}>
          <Text style={styles.textClasses}>ABSENEC</Text>
      </View>


          {filteredStudentAbsence.map(dataStudentAbsence => {
            return (
    
              <View key={dataStudentAbsence.key} style={{backgroundColor: '#f3f3f3',margin:3,borderRadius:10}}>

              <TouchableOpacity onPress={()=>alert(dataStudentAbsence.studentID)}
              style={{flexDirection:'row',backgroundColor:'#f3f3f3',borderRadius:10,height:50,paddingLeft:5}}>
                
                            <View style={{flex:2.5,justifyContent:'center'}}>
                              <Text style={{fontSize:16}}>{dataStudentAbsence.studentID}</Text>
                            </View>
                            <View style={{flex:2.5,justifyContent:'center'}}>
                              <Text style={{fontSize:16}}>{dataStudentAbsence.studentName}</Text>
                            </View>
                            <View style={{flex:2, justifyContent:'center',alignItems:'flex-end'}}>
                              <Text style={{fontSize:16}}>{dataStudentAbsence.type},{dataStudentAbsence.time}</Text>
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
    
              <View key={dataStudentPresent.key} style={{backgroundColor: '#f3f3f3',margin:3,borderRadius:10}}>

              <TouchableOpacity onPress={()=>alert(dataStudentPresent.studentID)}
              style={{flexDirection:'row',backgroundColor:'#f3f3f3',borderRadius:10,height:50,paddingLeft:5}}>
                
                            <View style={{flex:2.5,justifyContent:'center'}}>
                              <Text style={{fontSize:16}}>{dataStudentPresent.studentID}</Text>
                            </View>
                            <View style={{flex:2.5,justifyContent:'center'}}>
                              <Text style={{fontSize:16}}>{dataStudentPresent.studentName}</Text>
                            </View>
                            <View style={{flex:2, justifyContent:'center',alignItems:'flex-end'}}>
                              <Text style={{fontSize:16}}>{dataStudentPresent.type},{dataStudentPresent.time}</Text>
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
  header:null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerStyle: {
    backgroundColor: '#fd4176',
    height:80,
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