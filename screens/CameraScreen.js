import React from 'react';
import { StyleSheet,Alert, View, Text, Button, Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from 'react-native-elements';
import { connect } from "react-redux"
import { Camera } from 'expo-camera'
import * as Permissions from 'expo-permissions'
import * as FaceDetector from 'expo-face-detector'
import * as ImageManipulator from 'expo-image-manipulator'
import * as FileSystem from 'expo-file-system'
import { ip_server, port, server_url } from '../src/config'
import { get_model, del_model } from '../src/actions/model'
import { predict_face, predicted_face } from '../src/actions/predict'
import { faceDetectorSetting } from '../src/config'

const io = require('socket.io-client')
class CameraScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classId: 'vgg_face',
      hasCameraPermission: null,
      type: Camera.Constants.Type.front,
      isConnect: false
    };
  }
  async componentWillMount() {
    get_model(this.state.classId,this.props)
  }
  async componentDidMount() {
    // check permissions camera
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    // connect socket.IO
    this.socket = io(server_url, {
      transportOptions: ['websocket'],
      autoConnect: true
    })
    this.socket.on('connect', () => {
      this.setState({isConnect: true })
    })
  }
  setCamera = (ref) => {
    this.camera = ref
  }
  handleFaceDetected = async ({ faces }) => {
    if (faces.length > 0) this.taskPicture()
  }
  taskPicture = async () => {
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
      this.socket.emit('predict', {
        Base64: v,
        name: uri.split("/").pop(),
        type: 'data:image/jpg;base64',
        classId: this.state.classId,
        authId: this.props.auth.user.id
      })
    }).then(() => {
      FileSystem.deleteAsync(uri).then(e => {
        console.log('delete Success...');
      })
    })
  }
  render() {
    return (
      <View style={styles.container}>

        <Header
          leftComponent={(<TouchableOpacity onPress={() => {
            this.socket.emit('del-model', {
              classId: this.state.classId
            })
            this.props.navigation.navigate('Check')
          }}>
            <Text style={styles.textCancel}>Camera</Text>
          </TouchableOpacity>
          )}
          centerComponent={({ text: 'Camera', style: { color: '#fff', fontSize: 24, fontWeight: 'bold' } })}
          rightComponent={(<View style={styles.containerRightHeader}>
            <Ionicons name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
              size={60}
              color={'#fff'}
              onPress={() => { this.props.navigation.navigate('CheckScreen') }}
            />
          </View>
          )}
          containerStyle={{
            backgroundColor: '#fd4176',
            height: 80,
            justifyContent: 'space-around',
            borderBottomColor: '#be5f7a',
            borderBottomWidth: 1,
          }}
        />

        <View style={styles.containerCamera}>
          <Camera
            ref={this.setCamera}
            style={{ flex: 1 }}
            type={this.state.type}
            onFacesDetected={this.handleFaceDetected}
            faceDetectorSetting={faceDetectorSetting}
          >
          </Camera>
        </View>

        <View style={styles.containerMessage}>
          <Text>{this.state.test}</Text>
        </View>
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
    backgroundColor: '#fff',
    flexDirection: 'column'
  },
  containerCamera: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#000000',
  },
  containerMessage: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  containerRightHeader: {
    flex: 1,
  },
  textCancel: {
    fontSize: 18,
    color: '#fff'
  },
});

const mapStatetoProps = state => ({
  auth: state.auth,
  model: state.model
})
export default connect(mapStatetoProps)(CameraScreen)