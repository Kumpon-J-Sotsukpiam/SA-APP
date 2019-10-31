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


export default class Add_StudentListScreen extends React.Component {
  constructor(props) {
    super(props);

      this.state = {
     
        data: [],      
        error: null,
        text:'',

        dataStudent: [
          { key:'student',studentID: 5905100025, studentName:'Chanathip Nobnom',checked: false },
          { key:'student',studentID: 5905100026, studentName:'Chanathip Nobnom',checked: false },
              ]
    }

  }

  onCheckChanged(studentID) {
      const data = this.state.data;
      const index = data.findIndex(x => x.studentID === studentID);
      data[index].checked = !data[index].checked;
      this.setState(data);
  }

  ListViewItemSeparator = () => {
    return (
      <View style={{ backgroundColor: '#000'}} />
    );
  };
  
  searchFilterFunction(text){ 
    const newData = this.state.dataStudent.filter(item => {      
      const itemData = item.studentID ? item.studentID+''.toUpperCase() : ''.toUpperCase();
      
       const textData = text.toUpperCase();
        
       return itemData.indexOf(textData) > -1;    
    });
    
    this.setState({ data: newData,text: text});  
  };

  
 render() {


  return (
    <View style = {styles.container}>
      <Header
        leftComponent={(<TouchableOpacity onPress={()=>{this.props.navigation.navigate('StudentList')}}>
                          <Text style={styles.textCancel}>Cancel</Text>
                        </TouchableOpacity>
                        )}
        centerComponent={({ text: 'Add Student', style:{color: '#fff', fontSize:24, fontWeight:'bold'} })}
        rightComponent={(<TouchableOpacity onPress={()=>{this.props.navigation.navigate('StudentList')}}>
                          <Text style={styles.textSave}>Save</Text>
                        </TouchableOpacity>
                        )}
        containerStyle={styles.containerStyle}
      />
        
        <TextInput
        placeholder='Search'
        style={styles.textInput}
        />

      <View style={{marginTop:10,paddingBottom:3,paddingTop:3,backgroundColor:'#fff'}}>
      <ScrollView>
 
      <SearchBar        
      placeholder="Type Here..."        
      lightTheme        
      round
      onChangeText={text => this.searchFilterFunction(text)}
      autoCorrect={false}
      value={this.state.text}

       />  


        <FlatList
          ItemSeparatorComponent={this.ListViewItemSeparator}
          data={this.state.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) =>
        
        
      <View style={{flexDirection:'row',padding:2,backgroundColor:'#fff',flexWrap:'wrap',borderBottomColor:'#fd4176',borderBottomWidth:1}}>
        <View style={{flex:2,justifyContent:'center'}}>
          <Text style={{fontSize:16}}>{item.studentID}</Text>
        </View>
        <View style={{flex:2,justifyContent:'center'}}>
          <Text style={{fontSize:16}}>{item.studentName}</Text>
        </View>
        <View style={{flex:1, justifyContent:'center'}}>
        <CheckBox
          checked={item.checked}
          onPress={() => this.onCheckChanged(item.studentID)}
          
          />
        </View>
      </View>
 
       
         }
        />
 
      </ScrollView>
      </View>
        
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
    backgroundColor: '#f3f3f3',
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