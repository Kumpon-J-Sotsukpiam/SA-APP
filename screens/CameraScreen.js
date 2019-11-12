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
import * as FaceDetector from 'expo-face-detector'
import * as ImageManipulator from 'expo-image-manipulator'
import * as FileSystem from 'expo-file-system'
import { ip_server, port, server_url } from '../src/config'
import { pull_model } from '../src/actions/model'
import { predict_face, predicted_face } from '../src/actions/predict'
import { faceDetectorSetting } from '../src/config'

const io = require('socket.io-client')
class CameraScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classId: null,
      hasCameraPermission: null,
      type: Camera.Constants.Type.front,
      isConnect: false,
      addToggle: false,
      search: '',
      dataTest: [{ _id: '1', stuId: '5905100025', name: 'Chanathip Nobnom' },
      { _id: '2', stuId: '1910511101025', name: 'Jiraphat Asavagunchorn' },
      { _id: '3', stuId: '5905100025', name: 'Tanaboon Chutisakkage' },
      { _id: '4', stuId: '5905100025', name: 'Kumpom Sodsukpiem' },
      { _id: '5', stuId: '5905100025', name: 'Arisa koonchawa' },
      { _id: '6', stuId: '5905100025', name: 'Chanathip Nobnom' },]
    };
  }
  async componentWillMount() {
    id = this.props.navigation.state.params.classId
    this.setState({
      classId: id
    })
  }
  async componentDidMount() {
    // check permissions camera
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === 'granted') {
      this.setState({ hasCameraPermission: status === 'granted' });
      this.socket = io(server_url, {
        transportOptions: ['websocket'],
        autoConnect: true
      })
      this.socket.on('connect', () => {
        this.setState({ isConnect: true })
        predicted_face(this.props, this.socket)
      })
    } else {
      alert('camera permission not granted')
    }
  }
  componentWillUnmount(){
    pull_model(this.props)
  }
  setCamera = (ref) => {
    this.camera = ref
  }
  handleFaceDetected = async ({ faces }) => {
    if (faces.length > 0) this.taskPicture()
  }
  taskPicture = async () => { // todo del
    option = {
      captureAudio: false
    }
    if (this.camera)
      this.camera.takePictureAsync(option).then(picture => {
        this.faceDetection(picture)
      })
  }
  faceDetection = async ({ uri }) => {
    FaceDetector.detectFacesAsync(uri, faceDetectorSetting).then(faceArray => {
      const { faces, image } = faceArray
      if (faces.length > 0) {
        faces.map((value, i) => {
          const { origin, size } = value.bounds
          actions = [{
            crop: {
              originX: origin.x,
              originY: origin.y,
              width: size.width,
              height: size.height
            }
          }]
          ImageManipulator.manipulateAsync(image.uri, actions, { format: ImageManipulator.SaveFormat.JPEG }).then(v => {
            this.onUploadPicture(v.uri)
          })
        })
      }
    })
  }
  onUploadPicture = async (uri) => {
    options = {
      encoding: FileSystem.EncodingType.Base64
    }
    FileSystem.readAsStringAsync(uri, options).then(v => {
      data = {
        Base64: v,
        name: uri.split("/").pop(),
        type: 'data:image/jpg;base64',
        classId: this.state.classId,
        authId: this.props.auth.user.id
      }
      predict_face(data, this.socket)
    }).then(() => {
      FileSystem.deleteAsync(uri).then(e => {
        console.log('delete Success...');
      })
    })
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
            style={{ height: 250 }}
            type={this.state.type}
            onFacesDetected={this.handleFaceDetected}
            faceDetectorSetting={faceDetectorSetting}>
          </Camera>
        </View>
        <ScrollView>
          <View>
            {this.state.dataTest.map(dataStudent => {
              return (
                <View key={dataStudent._id} style={{ flexDirection: 'row', padding: 2, backgroundColor: '#fff', height: 55, borderRadius: 10, margin: 5 }}>
                  <View style={{ flex: 1.5, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16 }}>{dataStudent.stuId}</Text>
                  </View>
                  <View style={{ flex: 2.5, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16 }}>{dataStudent.name}</Text>
                  </View>
                  <View style={{ flex: 0.7, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16 }}>33.33</Text>
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
          confirmBtn={() => { }}
          search={'Test'}
          onTextChange={{}}
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
  model: state.model
})
export default connect(mapStatetoProps)(CameraScreen)