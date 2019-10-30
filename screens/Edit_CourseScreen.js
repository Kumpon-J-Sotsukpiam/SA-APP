import React from 'react';
import { StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Header } from 'react-native-elements';

export default class Edit_CourseScreen extends React.Component {
   constructor(props) {
    super(props);

    this.state = {
      courseID:this.props.navigation.state.params.courseID,
      courseName:'Course'
    }
    this.setCourseName = this.setCourseName.bind(this);
}

setCourseName(name){
  this.setState({ courseName:name });
}
 
render() {
    
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style = {styles.container}>
      <Header
        leftComponent={(<TouchableOpacity onPress={()=>{this.props.navigation.navigate('ClassList')}}>
                          <Text style={styles.textCancel}>Cancel</Text>
                        </TouchableOpacity>
                        )}
        centerComponent={({ text: 'Edit Course', style:{color: '#fff', fontSize:24, fontWeight:'bold'} })}
        rightComponent={(<TouchableOpacity onPress={()=>{this.props.navigation.navigate('ClassList')}}>
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
      <View style={styles.containerTextInput}>
        <TextInput
        placeholder={this.state.courseName}
        style={styles.textInput}
        onChangeText={this.setSemesterName}
        />
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}
}

Edit_CourseScreen.navigationOptions = {
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
  textInput: {
    backgroundColor:'#fff',
    height:50,
    padding: 10,
    fontSize:18
  },
  containerTextInput: {
    marginTop:10,
  },
});