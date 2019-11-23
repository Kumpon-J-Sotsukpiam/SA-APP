import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import AddCheckinDialogBox from '../components/AddCheckinDialogBox';
import { Ionicons } from '@expo/vector-icons';
import { Header } from 'react-native-elements';
import { connect } from "react-redux"
import { Camera } from 'expo-camera'
import * as Permissions from 'expo-permissions'
import { createFilter } from 'react-native-search-filter';
import { pull_model } from '../src/actions/model'
import { predict_face } from '../src/actions/predict'
import { faceDetectorSetting } from '../src/config'
import { push_student_in_checkIn } from '../src/actions/checkIn'
import { getDayOfWeek, formatTime,formatDate } from '../src/actions/date'


const KEYS_TO_FILTERS = ['stuId'];

class CameraScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classId: null,
      checkId: null,
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      addToggle: false,
      search: '',
      checkIn: [],
      studentList: [],
      studentSearch: []
    };
  }
  searchUpdated(data) {
    studentSearch = this.state.studentList.filter(createFilter(data, KEYS_TO_FILTERS))
    this.setState({
      search: data,
      studentSearch: studentSearch
    })
  }
  async componentWillMount() {
    id = this.props.navigation.state.params.classId
    check_id = this.props.navigation.state.params.checkIn_id
    log = this.props.checkIn.filter(i => i._id == check_id)[0]
    logClass = this.props.class.filter(i => i._id == id)[0]
    studentList = this.props.student.filter(i => logClass.studentList.indexOf(i._id) >= 0)
    this.setState({
      classId: id,
      checkId: check_id,
      checkIn: log,
      studentList: studentList
    })
  }
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === 'granted') {
      this.setState({ hasCameraPermission: status === 'granted' })
    } else {
      alert('camera permission not granted')
    }
  }
  componentWillUnmount() {
    pull_model(this.props, res => {
    })
  }
  setCamera = (ref) => {
    this.camera = ref
  }
  handleFaceDetected = async ({ faces }) => {
    if (faces.length > 0) {
      const { uri } = await this.camera.takePictureAsync() // Object {"height","uri","width"}
      this.onUploadPicture(uri)
    }
  }
  onUploadPicture = async (uri) => {
    data = {
      classId: this.state.classId,
      checkId: this.state.checkId,
      _uid: this.props.auth.user.id,
      file: {
        name: 'testSendFace.jpg',
        uri: uri,
        type: 'image/jpeg'
      }
    }
    predict_face(data, this.props)
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Header
            leftComponent=
            {(
              <TouchableOpacity onPress={() => { this.props.navigation.navigate('Check') }}>
                <Ionicons
                  name='ios-arrow-back'
                  size={45}
                  color='#fff'
                />
              </TouchableOpacity>
            )}
            rightComponent={(
              <TouchableOpacity onPress={() => this.setState({ addToggle: true })}>
                <Ionicons name='ios-add'
                  size={50}
                  color={'#fff'}
                />
              </TouchableOpacity>
            )}
            centerComponent={({ text: 'Camera', style: { color: '#fff', fontSize: 24, fontWeight: 'bold' } })}
            containerStyle={styles.containerStyle}
          />
        </View>
        <View style={styles.containerCamera}>
          <Camera
            ref={this.setCamera}
            style={{ height: 450 }}
            type={this.state.type}
            onFacesDetected={this.handleFaceDetected}
            faceDetectorSetting={faceDetectorSetting}>
          </Camera>
        </View>
        <ScrollView>
          <View>
            {this.state.checkIn.studentList.map(dataStudent => {
              const { name, stuId } = this.props.student.filter(i => i._id == dataStudent._id)[0]
              console.log('====================================');
              console.log('====================================');
              console.log(dataStudent);
              console.log('====================================');
              console.log('====================================');

              /*
              ====================================
              Object {
                "_id": "5dd150047a41c00db67ead51",
                "dataSet": true,
                "faculty": "School of Science and Technology",
                "major": "Computer Science",
                "name": "Kumpon Sotsukpiam",
                "stuId": "5905100006",
                "upload": false,
              }
              Object {
                "_id": "5dd9022aad554223ff0009a1",
                "classId": "5dd3fe2f98dc292155d9c3e2",
                "createdAt": "2019-11-23T09:55:54.980Z",
                "studentList": Array [
                  Object {
                    "_id": "5dd150047a41c00db67ead51",
                    "time": "2019-11-23T09:56:02.969Z",
                    "type": "manual",
                  },
                ],
                "updatedAt": "2019-11-23T09:55:54.980Z",
              }
              ====================================

              */
              return (
                <View key={dataStudent._id} style={{ flexDirection: 'row', padding: 2, backgroundColor: '#fff', height: 55, borderRadius: 10, margin: 5 }}>
                  <View style={{ flex: 1.5, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16 }}>{stuId}</Text>
                  </View>
                  <View style={{ flex: 2.5, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16 }}>{name}</Text>
                  </View>
                  <View style={{ flex: 0.7, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16 }}>{formatTime(dataStudent.time)}</Text>
                  </View>
                </View>
              )
            })}
          </View>
        </ScrollView>

        <AddCheckinDialogBox
          visible={this.state.addToggle}
          onTouchOutside={() => this.setState({ addToggle: false })}
          cancelBtn={() => this.setState({ addToggle: false })}
          confirmBtn={() => {
            dataReq = {
              checkInId: this.state.checkId,
              stuList: [this.state.studentSearch[0]._id]
            }
            push_student_in_checkIn(dataReq, this.props).then(() => [
              this.setState({
                addToggle: false
              })
            ])
          }}
          data={this.state.studentSearch[0]}
          search={this.state.search}
          onChangeText={data => this.searchUpdated(data)}
        />

      </View>
    );
  }
}

CameraScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  containerCamera: {
    padding: 5,
    backgroundColor: '#000',
  },
  containerMessage: {
    padding: 5,
    backgroundColor: '#fff',
  },
  containerStyle: {
    backgroundColor: '#fd4176',
    height: 80,
    justifyContent: 'space-around',
    borderBottomColor: '#be5f7a',
    borderBottomWidth: 1,
  },
});

const mapStatetoProps = state => ({
  auth: state.auth,
  model: state.model,
  checkIn: state.checkIn,
  student: state.student,
  class: state.class
})
export default connect(mapStatetoProps)(CameraScreen)