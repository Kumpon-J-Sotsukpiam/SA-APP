import React from 'react';
import { ScrollView, StyleSheet, View, Text, Platform, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header,Button } from 'react-native-elements';


export default class StudentListScreen extends React.Component {
  constructor(props) {
    super(props);

      this.state = {
      classID:'Class ID',
      studentID:'1100500589302',
      name:'Chanathip Nobnom',
      percentage:'100%',
    };
  }

 render() {

  return (
    <View style = {styles.container}>
      <Header
        
        leftComponent={(
        <TouchableOpacity onPress={() => this.props.navigation.navigate('ClassDetails')}>
        <Ionicons
          name='ios-arrow-back'
          size={35}
          color='#fff'
        />
        </TouchableOpacity>
        )}
        leftContainerStyle={{flex:2}}
        rightComponent={(
          <Ionicons name='ios-add'
            size={60}
            color={'#fff'}
            onPress={()=>{this.props.navigation.navigate('AddStudentList')}}
      />)}
        rightContainerStyle={{flex:1}}
        centerComponent={(
        <View style={styles.containerHeader}>
          <View style={styles.containerTextHeader}>
            <Text style={styles.textHeader}>Student List</Text>
          </View>
        </View>
        )}
        centerContainerStyle={{flex:9}}
        containerStyle={styles.containerStyle}
      />
        
        <TextInput
        placeholder='Search'
        style={styles.textInput}
        />

      <View style={{marginTop:10,paddingBottom:3,paddingTop:3,backgroundColor:'#fff'}}>
      <ScrollView>
      <View style={{flexDirection:'row',padding:5,backgroundColor:'#fff',height:50,borderBottomColor:'#fd4176',borderBottomWidth:1}}>
        <View style={{flex:2,justifyContent:'center'}}>
          <Text style={{fontSize:16}}>{this.state.studentID}</Text>
        </View>
        <View style={{flex:2,justifyContent:'center'}}>
          <Text style={{fontSize:16}}>{this.state.name}</Text>
        </View>
        <View style={{flex:1,alignItems:'flex-end',justifyContent:'center'}}>
          <Text style={{fontSize:16}}>{this.state.percentage}</Text>
        </View>
      </View>
      </ScrollView>
      </View>

      <View style={styles.buttonButtom}>
      <Button
        title="Training Model"
        buttonStyle={{backgroundColor:'#fd4176',height:50}}
        onPress = {()=>{this.props.navigation.navigate('TraingingModel')}}
        />
      </View>
        
    </View>
  );
}
}

StudentListScreen.navigationOptions = {
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
  buttonButtom: {
    flex: 1,
    justifyContent: 'flex-end',
    margin:10
  },
  containerStyle:{
    backgroundColor: '#fd4176',
    height:120,
    justifyContent: 'space-around',
    borderBottomColor: '#be5f7a',
    borderBottomWidth: 1,
  },
});