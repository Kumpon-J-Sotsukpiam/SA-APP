import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import { Header, Button, CheckBox, } from 'react-native-elements';
import * as DocumentPicker from 'expo-document-picker';
import { getSchool } from '../src/actions/studentID'
import { uploadToRead, add_many_student } from '../src/actions/student'
class ImportStudentScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      excelData: [],
      idSelected: "B",
      nameSelected: "C",
      dataStudent: [],
    };
    this.checkedAll = this.checkedAll.bind(this)
    this.handleOnSave = this.handleOnSave.bind(this)
  }
  onCheckChanged(id, checked) {
    this.setState({
      dataStudent: (checked ? this.state.dataStudent.filter(i => i != id) : [...this.state.dataStudent, id])
    })
  }
  checkedAll(checked) {
    checkId = []
    if (!checked) {
      this.state.excelData.map(i => checkId.push(i[this.state.idSelected]))
    }
    this.setState({
      dataStudent: checkId
    })
  }
  handleOnSave = () => {
    dataReq = []
    const { idSelected, nameSelected } = this.state
    this.state.excelData.map(i => {
      if (this.state.dataStudent.indexOf(i[idSelected]) >= 0) {
        const { faculty, major } = getSchool(`${i[idSelected]}`)
        dataReq.push({
          stuId: `${i[idSelected]}`,
          name: i[nameSelected],
          faculty: faculty,
          major: major,
        })
      }
    })
    add_many_student(dataReq, this.props).then(() => {
      this.props.navigation.navigate('Students')
    })
  }
  _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    data = await uploadToRead(result)
    this.setState({
      excelData: data
    })
  }
  render() {
    const { excelData, idSelected, nameSelected, dataStudent } = this.state
    return (
      <View style={styles.container}>
        <View>
          <Header
            leftComponent={(
              <TouchableOpacity onPress={() => { this.props.navigation.navigate('Students') }}>
                <Text style={styles.textCancel}>Cancel</Text>
              </TouchableOpacity>
            )}
            centerComponent={({ text: 'New Student', style: { color: '#fff', fontSize: 24, fontWeight: 'bold' } })}
            rightComponent={(
              <TouchableOpacity onPress={() => { this.handleOnSave() }}>
                <Text style={styles.textSave}>Save</Text>
              </TouchableOpacity>
            )}
            containerStyle={styles.containerStyle}
          />
        </View>
        <Button
          title="Select Document"
          onPress={this._pickDocument}
          buttonStyle={styles.button}
          icon={
            <Ionicons name='ios-download'
              size={30}
              color={'#fff'}
              style={{ marginRight: 10 }}
            />
          }
        />
        <View style={{ flexDirection: 'row', padding: 2, backgroundColor: '#ffff', height: 60, marginVertical: 3, marginHorizontal: 5 }}>
          <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Student ID</Text>
          </View>
          <View style={{ flex: 2.5, justifyContent: 'center', alignItem: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Name</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <CheckBox
              iconRight
              title='Add' textStyle={{ fontSize: 16, color: '#000', marginLeft: -2 }}
              containerStyle={{ backgroundColor: '#fff', borderColor: '#ffff', justifyContent: 'center' }}
              checked={excelData == 0 ? false : excelData.length == dataStudent.length}
              onPress={e => this.checkedAll(excelData == 0 ? false : excelData.length == dataStudent.length)}
            />
          </View>
        </View>
        <ScrollView>
          {excelData.map(item => {
            return (
              <View key={item[idSelected]}>
                <View style={{ flexDirection: 'row', padding: 2, backgroundColor: '#f3f3f3', height: 60, marginVertical: 3, marginHorizontal: 5, borderRadius: 10 }}>
                  <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16 }}>{item[idSelected]}</Text>
                  </View>
                  <View style={{ flex: 2.5, justifyContent: 'center', alignItem: 'center' }}>
                    <Text style={{ fontSize: 16 }}>{item[nameSelected]}</Text>
                  </View>
                  <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                    <CheckBox
                      checked={this.state.dataStudent.indexOf(item[idSelected]) != -1}
                      onPress={e => this.onCheckChanged(item[idSelected], this.state.dataStudent.indexOf(item[idSelected]) != -1)}
                    />
                  </View>
                </View>
              </View>
            )
          })}
        </ScrollView>
      </View>
    );
  }
}

ImportStudentScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  button: {
    height: 60,
  },
});

const mapStateToProps = state => ({

})
export default connect(mapStateToProps)(ImportStudentScreen)