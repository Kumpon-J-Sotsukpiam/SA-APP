import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header,Input } from 'react-native-elements';
import { add_student } from '../src/actions/student'
import { connect } from 'react-redux'
import { getFaculty, getMajor } from '../src/actions/studentID'

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Video } from 'expo-av';
class Add_StudentScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      video: null,
      studentID: '',
      studentName: '',
      faculty:' ',
      major:' ',
      toggleVideo:false
    }
    this.handleOnSave = this.handleOnSave.bind(this);
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL,Permissions.CAMERA,);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }
  _pickImage = async () => {
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      base64:true
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri});
    }

   
  };

  _recordVideo = async () => {

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      base64:true
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ toggleVideo:false});
      this.setState({ video: result.uri});
    }
    
  };

  setStudentID(data) {

    this.setState({ studentID: data,
                    faculty:getFaculty(data),
                    major:getMajor(data)
    });

  }
  setStudentName(data) {
    this.setState({ studentName: data });
  }

  setStudentFaculty(data) {
    this.setState({ faculty: data });
  }

  setStudentMajor(data) {
    this.setState({ major: data });
  }

  deleteVideo() {
    this.setState({ toggleVideo:false,video:null });
  }

  handleOnSave = (data,props) => {
    dataReq = {
      stuId : this.state.studentID,
      name : this.state.studentName,
      faculty:this.state.faculty,
      major:this.state.major
    }
    add_student(dataReq,this.props)
    this.props.navigation.navigate('Students')
  }

  toggleVideo(){
    this.setState({toggleVideo:!this.state.toggleVideo})
  }

  render() {

    let { video } = this.state;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View>
          <Header
            leftComponent={(<TouchableOpacity onPress={() => { this.props.navigation.navigate('Students') }}>
              <Text style={styles.textCancel}>Cancel</Text>
            </TouchableOpacity>
            )}
            centerComponent={({ text: 'New Student', style: { color: '#fff', fontSize: 24, fontWeight: 'bold' } })}
            rightComponent={(<TouchableOpacity onPress={() => { this.handleOnSave(this.state,this.props) }}>
              <Text style={styles.textSave}>Save</Text>
            </TouchableOpacity>
            )}
            containerStyle={styles.containerStyle}
          />
        </View>

        <View style={{flexDirection:'row',margin: 5,height:115,}}>

        <View style={{
          flex:2,
          justifyContent:'center',
          alignItems:'center'}}>

        <TouchableOpacity onPress={()=> this.toggleVideo()}>
        <View style={{
          borderRadius:55,
          borderColor:'gray',
          borderWidth:5,
          height:110,
          width:110,
          justifyContent:'center',
          alignItems:'center'}}>

        <View style= {{ position: 'absolute'}}>
        <Ionicons name='ios-videocam'
              size={60}
              color={'#000'}
              onPress={()=> this.toggleVideo()}
        />
        </View>
        
        {video &&
          (<Video
            source={{ uri: video }}
            rate={1.0}
            volume={1.0}
            isMuted={true}
            resizeMode="cover"
            shouldPlay
            isLooping
            style={{ width: 100, height: 100,borderRadius:50 }}
          />)
          }
          </View>
          </TouchableOpacity>

          </View>

        </View>

        <View style={styles.containerTextInput}>
          <TextInput
            placeholderTextColor='gray'
            placeholder='Student ID'
            maxLength = {13}
            style={styles.textInput}
            onChangeText={(data) => this.setStudentID(data)}
          />
        </View>
        <View style={styles.containerTextInput}>
          <TextInput
            placeholderTextColor='gray'
            placeholder='Student Name'
            style={styles.textInput}
            onChangeText={(data) => this.setStudentName(data)}
          />
        </View>
        <View style={styles.containerTextInput}>
          <Text style={styles.textInput}>Faculty {this.state.faculty}</Text>
          <Text style={styles.textInput}>Major {this.state.major}</Text>
        </View>



      
        <Modal visible={this.state.toggleVideo}
        transparent={true}
        animationType={'slide'}
        onRequestClose={()=> console.log('Close')}>
          <TouchableOpacity style={{flex:1}} onPress={()=>this.toggleVideo()}>
          <View style={{
            margin:10,
            bottom:0,
            left:0,
            right:0,
            position:'absolute',

          }}>

          <View style={{
            borderColor:'#f3f3f3',
            borderWidth:0.5,
            borderRadius:15,
            backgroundColor:'#fff',}}>   

          <View style={{height:50,justifyContent:'center',borderBottomColor:'#f3f3f3',borderBottomWidth:1}}>
          <Button
            title="Choose Video"
            onPress={this._pickImage}
          />
          </View>

          <View style={{height:50,justifyContent:'center',borderBottomColor:'#f3f3f3',borderBottomWidth:1}}>
          <Button
            title="Record video"
            onPress={this._recordVideo}
          />
          </View>

          <View style={{height:50,justifyContent:'center'}}>
          <Button
            title="Delete"
            color='red'
            onPress={()=>this.deleteVideo()}
          />
          </View>

          </View>

          <View style={{
            marginTop:8,
            borderRadius:15,
            backgroundColor:'#fff',
            height:60,
            justifyContent:'center'}}>
          <Button
            title="Cancel"
            fontWeight='bold'
            onPress={()=>this.toggleVideo()}
          />
          </View>
            
          </View>
          </TouchableOpacity>
        </Modal>


      </View>
      </TouchableWithoutFeedback>

    );

  }
}



Add_StudentScreen.navigationOptions = {
  header: null
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  textHeader: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold'
  },
  textInput: {
    backgroundColor: '#424242',
    height: 50,
    padding: 10,
    fontSize: 18,
    color: 'gray',
    marginTop: 10,
    textAlign: 'center'
  },
  containerStyle: {
    backgroundColor: '#fd4176',
    height: 80,
    justifyContent: 'space-around',
    borderBottomColor: '#be5f7a',
    borderBottomWidth: 1,
  },
  textCancel: {
    fontSize: 18,
    color: '#fff'
  },
  textSave: {
    fontSize: 18,
    color: '#fff'
  },
  textInput: {
    backgroundColor: '#fff',
    height: 50,
    padding: 10,
    fontSize: 18
  },
  containerTextInput: {
    marginTop: 10,
    marginLeft: 7,
    marginRight:7
  },
});
const mapStateToProps = state => ({
  errors:state.errors
})
export default connect(mapStateToProps)(Add_StudentScreen)