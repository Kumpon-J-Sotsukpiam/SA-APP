import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Button
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header, } from 'react-native-elements';
import { add_student } from '../src/actions/student'
import { connect } from 'react-redux'

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
class Add_StudentScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      studentID: '',
      studentName: '',
    }
    this.handleOnSave = this.handleOnSave.bind(this);
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
  setStudentID(data) {
    this.setState({ studentID: data });
  }
  setStudentName(data) {
    this.setState({ studentName: data });
  }
  handleOnSave = (data,props) => {
    dataReq = {
      stuId : this.state.studentID,
      name : this.state.studentName
    }
    add_student(dataReq,this.props)
    this.props.navigation.navigate('Students')
  }
  render() {

    let { image } = this.state;

    return (
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

        <View style={styles.containerTextInput}>
          <TextInput
            placeholder='Student ID'
            style={styles.textInput}
            onChangeText={(data) => this.setStudentID(data)}
          />
        </View>
        <View style={styles.containerTextInput}>
          <TextInput
            placeholder='Student Name'
            style={styles.textInput}
            onChangeText={(data) => this.setStudentName(data)}
          />
        </View>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button
            title="Pick an image from camera roll"
            onPress={this._pickImage}
          />
        </View>

      </View>

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
    backgroundColor: '#fff',
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
  },
});
const mapStateToProps = state => ({
  errors:state.errors
})
export default connect(mapStateToProps)(Add_StudentScreen)