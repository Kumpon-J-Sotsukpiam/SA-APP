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
import {connect} from 'react-redux'
import {add_course} from '../src/actions/course'
class Add_CourseScreen extends React.Component {
   constructor(props) {
    super(props);

    this.state = {
      semesterId:'Semester ID',
      courseId:'Course ID',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleNavigationBack = this.handleNavigationBack.bind(this)
    this.handleOnSave = this.handleOnSave.bind(this)
}
handleChange = (name,e) => {
  this.setState({
    [name]: e.nativeEvent.text
  }) 
}
handleOnSave(data,props) {
  add_course(data,props)
  //this.props.navigation.navigate('CourseList',{semesterID:this.state.semesterID})
  this.handleNavigationBack()
}

componentWillMount(){
  this.setState({
    semesterId:this.props.navigation.state.params.semesterId
  })
}
handleNavigationBack() {
  this.props.navigation.navigate('CourseList',{semesterId:this.state.semesterId})
}
render() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style = {styles.container}>
      <Header
        leftComponent={(<TouchableOpacity onPress={this.handleNavigationBack}>
                          <Text style={styles.textCancel}>Cancel</Text>
                        </TouchableOpacity>
                        )}
        centerComponent={({ text: 'New Course', style:{color: '#fff', fontSize:24, fontWeight:'bold'} })}
        rightComponent={(<TouchableOpacity onPress={() => this.handleOnSave(this.state,this.props)}>
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
        placeholder='Untitled Course'
        style={styles.textInput}
        onChange={e => this.handleChange('courseId',e)}
        />
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}
}

Add_CourseScreen.navigationOptions = {
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
const mapStateToProps = state => ({
  errors: state.errors
})
export default connect(mapStateToProps)(Add_CourseScreen)