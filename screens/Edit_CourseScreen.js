import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { connect } from 'react-redux'
import { set_course } from '../src/actions/course'
import { Header } from 'react-native-elements';

class Edit_CourseScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      courseId: null,
      semesterId: null,
      courseName: 'Course'
    }
    this.setCourseName = this.setCourseName.bind(this);
    this.handleBack = this.handleBack.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }
  componentWillMount() {
    const { courseId, semesterId } = this.props.navigation.state.params
    log = this.props.course.filter((i) => i._id === courseId)[0]
    this.setState({
      courseId: courseId,
      courseName: log.name,
      semesterId: semesterId,
    })
  }
  setCourseName(name) {
    this.setState({ courseName: name });
  }
  handleBack() {
    this.props.navigation.navigate('ClassList', { semesterId: this.state.semesterId, courseId: this.state.courseId })
  }
  handleSave() {
    set_course(this.state.courseId, { name: this.state.courseName }, this.props).then(() => {
      this.handleBack()
    })
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Header
            leftComponent={(<TouchableOpacity onPress={this.handleBack}>
              <Text style={styles.textCancel}>Cancel</Text>
            </TouchableOpacity>
            )}
            centerComponent={({ text: 'Edit Course', style: { color: '#fff', fontSize: 24, fontWeight: 'bold' } })}
            rightComponent={(<TouchableOpacity onPress={this.handleSave}>
              <Text style={styles.textSave}>Save</Text>
            </TouchableOpacity>
            )}
            containerStyle={{
              backgroundColor: '#fd4176',
              height: 80,
              justifyContent: 'space-around',
              borderBottomColor: '#be5f7a',
              borderBottomWidth: 1,
            }}
          />
          <View style={styles.containerTextInput}>
            <TextInput
              value={this.state.courseName}
              placeholder={this.state.courseName}
              style={styles.textInput}
              onChangeText={this.setCourseName}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Edit_CourseScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
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
  course: state.course
})
export default connect(mapStateToProps)(Edit_CourseScreen)