import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput} from 'react-native';
import { Header } from 'react-native-elements';

export default class Add_SemesterScreen extends React.Component {
   constructor(props) {
    super(props);

    this.state = {
      test:'Semester id / SemestersScreen',

    }
  }

  
  render() {
  return (
    <View style = {styles.container}>
      <Header
        leftComponent={(<TouchableOpacity onPress={()=>{this.props.navigation.navigate('Semesters')}}>
                          <Text style={styles.textCancel}>Cancel</Text>
                        </TouchableOpacity>
                        )}
        centerComponent={({ text: 'New Semester', style:{color: '#fff', fontSize:24, fontWeight:'bold'} })}
        rightComponent={(<TouchableOpacity onPress={()=>{this.props.navigation.navigate('Semesters')}}>
                          <Text style={styles.textSave}>Save</Text>
                        </TouchableOpacity>
                        )}
        containerStyle={{
          backgroundColor: '#fd4176',
          height:80,
          justifyContent: 'space-around',
          borderBottomColor: '#be5f7a',
          borderBottomWidth: 1,
        }}
      />

      <View style={{marginTop:10}}>
        <TextInput
        placeholder='Untitled Semester'
        style={{backgroundColor:'#fff',
                height:50,
                padding: 10,
                fontSize:18}}
        />
      </View>
    </View>
  );
}
}

Add_SemesterScreen.navigationOptions = {
  header:null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
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