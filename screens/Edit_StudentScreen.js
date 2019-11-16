import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header, Button } from 'react-native-elements';
import { set_student } from '../src/actions/student'
import { connect } from 'react-redux'
import { getFaculty, getMajor } from '../src/actions/studentID'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system'
import * as Permissions from 'expo-permissions';
import { Video } from 'expo-av';
class Edit_StudentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      video: null,
      id: null,
      stuId: '',
      name: '',
      faculty: '',
      major: '',
      toggleVideo: false
    }
    this.handleOnSave = this.handleOnSave.bind(this);
  }
  async componentWillMount() {
    const { stuId } = this.props.navigation.state.params
    log = this.props.student.filter(i => i._id == stuId)[0]
    this.setState({
      id: log._id,
      stuId: log.stuId,
      name: log.name,
      faculty: log.faculty,
      major: log.major
    })
  }
  componentDidMount() {
    this.getPermissionAsync();
  }
  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Videos });
    //Object {"cancelled","duration","height","rotation","type","uri","width"}
    if (!result.cancelled) {
      this.setState({
        image: result
      });
    }
  };
  _recordVideo = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      base64: true
    });
    if (!result.cancelled) {
      this.setState({ toggleVideo: false });
      this.setState({ video: result.uri });
    }
  };
  setStudentID(data) {
    this.setState({
      stuId: data,
      faculty: getFaculty(data),
      major: getMajor(data)
    });
  }
  setStudentName(data) {
    this.setState({ name: data });
  }
  setStudentFaculty(data) {
    this.setState({ faculty: data });
  }
  setStudentMajor(data) {
    this.setState({ major: data });
  }
  deleteVideo() {
    this.setState({ toggleVideo: false, video: null });
  }
  handleOnSave = (data, props) => {
    dataReq = {
      stuId: this.state.stuId,
      name: this.state.name,
      faculty: this.state.faculty,
      major: this.state.major,
      image: this.state.image
    }
    set_student(this.state.id, dataReq, this.props).then(() => {
      this.props.navigation.navigate('Students')
    })
    //this.props.navigation.navigate('Students')
  }
  toggleVideo() {
    this.setState({ toggleVideo: !this.state.toggleVideo })
  }
  render() {
    let { video } = this.state;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View>
            <Header
              leftComponent={(
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Students') }}>
                  <Text style={styles.textCancel}>Cancel</Text>
                </TouchableOpacity>
              )}
              centerComponent={({ text: 'Edit Student', style: { color: '#fff', fontSize: 24, fontWeight: 'bold' } })}
              rightComponent={(
                <TouchableOpacity onPress={() => { this.handleOnSave(this.state, this.props) }}>
                  <Text style={styles.textSave}>Save</Text>
                </TouchableOpacity>
              )}
              containerStyle={styles.containerStyle}
            />
          </View>
          <TouchableOpacity style={{ justifyContent: 'center', margin: 10, alignItems: 'center' }} onPress={() => this.toggleVideo()}>
            <View style={{
              borderRadius: 55,
              borderColor: 'gray',
              borderWidth: 5,
              height: 110,
              width: 110,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <View style={{ position: 'absolute' }}>
                <Ionicons name='ios-videocam'
                  size={60}
                  color={'#000'}
                  onPress={() => this.toggleVideo()}
                />
              </View>
              {video &&
                (<Video
                  source={{ uri: video }}
                  rate={1.0}
                  isMuted={true}
                  resizeMode="cover"
                  shouldPlay
                  isLooping
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />)
              }
            </View>
          </TouchableOpacity>
          <View style={styles.containerTextInput}>
            <Text style={styles.labelStyle}>Student ID</Text>
            <TextInput
              placeholderTextColor='gray'
              placeholder='Student Identification Number'
              maxLength={13}
              value={this.state.stuId}
              style={styles.textInput}
              onChangeText={(data) => this.setStudentID(data)}
            />
          </View>
          <View style={styles.containerTextInput}>
            <Text style={styles.labelStyle}>Student Name</Text>
            <TextInput
              placeholderTextColor='gray'
              placeholder='Full Name'
              style={styles.textInput}
              value={this.state.name}
              onChangeText={(data) => this.setStudentName(data)}
            />
          </View>
          <View style={styles.containerTextInput}>
            <Text style={styles.labelStyle}>Faculty</Text>
            <TextInput
              placeholderTextColor='gray'
              placeholder='Faculty'
              style={styles.textInput}
              value={this.state.faculty}
              onChangeText={(data) => this.setStudentFaculty(data)}
            />
          </View>
          <View style={styles.containerTextInput}>
            <Text style={styles.labelStyle}>Major</Text>
            <TextInput
              placeholderTextColor='gray'
              placeholder='Major'
              style={styles.textInput}
              value={this.state.major}
              onChangeText={(data) => this.setStudentFaculty(data)}
            />
          </View>
          <Modal visible={this.state.toggleVideo}
            transparent={true}
            animationType={'slide'}
            onRequestClose={() => console.log('Close')}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => this.toggleVideo()}>
              <View style={{
                margin: 10,
                bottom: 0,
                left: 0,
                right: 0,
                position: 'absolute',
              }}>
                <View style={{
                  borderColor: '#f3f3f3',
                  borderWidth: 0.5,
                  borderRadius: 15,
                  backgroundColor: '#fff',
                }}>
                  <Button
                    title='Choose Video'
                    type='clear'
                    onPress={this._pickImage}
                    containerStyle={{
                      backgroundColor: '#fff',
                      height: 50,
                      borderTopLeftRadius: 15,
                      borderTopRightRadius: 15,
                      borderBottomColor: '#f3f3f3',
                      borderBottomWidth: 1,
                      justifyContent: 'center',
                    }}
                  />
                  <Button
                    title='Record video'
                    type='clear'
                    onPress={this._recordVideo}
                    containerStyle={{
                      backgroundColor: '#fff',
                      borderBottomColor: '#f3f3f3',
                      borderBottomWidth: 1,
                      height: 50,
                      justifyContent: 'center'
                    }}
                  />
                  <View style={{ height: 50, justifyContent: 'center' }}>
                    <Button
                      title="Delete"
                      type='clear'
                      onPress={() => this.deleteVideo()}
                      containerStyle={{
                        backgroundColor: '#fff',
                        borderBottomLeftRadius: 15,
                        borderBottomRightRadius: 15,
                        height: 50
                      }}
                      titleStyle={{ color: 'red' }}
                    />
                  </View>
                </View>
                <Button
                  title="Cancel"
                  type='clear'
                  onPress={() => this.toggleVideo()}
                  containerStyle={{ backgroundColor: '#fff', borderRadius: 15, height: 60, justifyContent: 'center', marginTop: 8, borderColor: '#f3f3f3', borderWidth: 1 }}
                  titleStyle={{ fontWeight: 'bold' }}
                />
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Edit_StudentScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
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
    marginLeft: 15,
    marginRight: 15,
  },
  labelStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 3
  },
});
const mapStateToProps = state => ({
  errors: state.errors,
  student: state.student
})
export default connect(mapStateToProps)(Edit_StudentScreen)