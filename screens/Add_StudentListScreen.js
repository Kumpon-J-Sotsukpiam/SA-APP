import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, TextInput, FlatList} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header,CheckBox } from 'react-native-elements';


export default class Add_StudentListScreen extends React.Component {
  constructor(props) {
    super(props);

      this.state = {
        data: [
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
  
 render() {
  let { data } = this.state;

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
        <View style={{flexDirection:'row',padding:5,backgroundColor:'#fff',borderBottomColor:'#fd4176',borderBottomWidth:1,flexWrap:'wrap'}}>
          <View style={{flex:2,justifyContent:'center'}}>
            <Text style={{fontSize:16}}>{this.state.studentID}</Text>
          </View>
          <View style={{flex:2,justifyContent:'center'}}>
            <Text style={{fontSize:16}}>{this.state.name}</Text>
          </View>
          <View style={{flex:1,alignItems:'flex-end',justifyContent:'center'}}>
          </View>
        </View>

        <FlatList
        data={data}
          extraData={this.state}
          renderItem={({ item, index }) =>
          <View>
        <Text>{item.studentID}</Text>
        <Text>{item.studentName}</Text>
        
        <CheckBox
          title={item.checked+''}
          checked={item.checked}
          onPress={() => this.onCheckChanged(item.studentID)}
          key={item.key}
          />
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