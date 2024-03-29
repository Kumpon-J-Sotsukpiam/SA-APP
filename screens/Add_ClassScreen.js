import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  DatePickerIOS,
  Platform,
  TimePickerAndroid,
} from 'react-native';
import { Header, ButtonGroup } from 'react-native-elements';
import { calDurationsTime } from "../src/actions/durations"
import { add_class } from '../src/actions/class'
import { connect } from 'react-redux'

//Date
import { format } from 'date-fns'

var getDate = new Date();
var getTimeStarts = new Date(getDate.getFullYear(), getDate.getMonth(), getDate.getDate(), 8, 0, 0);
var getTimeEnds = new Date(getDate.getFullYear(), getDate.getMonth(), getDate.getDate(), 11, 0, 0);

class Add_ClassScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      courseId: null,
      semesterId: null,
      selectedWeek: 0,
      group: '',
      location: '',
      timepickerStarts: false,
      timepickerEnds: false,
      setTimeStarts: getTimeStarts,
      setTimeEnds: getTimeEnds,
      startTime:'',
      endTime:'',
    };
    this.updateIndex = this.updateIndex.bind(this)
    this.setTimeStarts = this.setTimeStarts.bind(this);
    this.setTimeEnds = this.setTimeEnds.bind(this);
    this.handleNavigationBack = this.handleNavigationBack.bind(this)
    this.handleOnSave = this.handleOnSave.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentWillMount() {
    const { courseId, semesterId } = this.props.navigation.state.params
    this.setState({
      courseId:courseId,
      semesterId: semesterId
    })
  }
  handleNavigationBack() {
    this.props.navigation.navigate('ClassList', { courseId: this.state.courseId, semesterId: this.state.semesterId })
  }
  updateIndex(selectedWeek) {
    this.setState({ selectedWeek: selectedWeek })
  }
  setTimeStarts(newTime) {
    this.setState({ setTimeStarts: newTime });
  }
  setTimeEnds(newTime) {
    this.setState({ setTimeEnds: newTime });
  }
  showTimePickerStarts() {
    this.setState({
      timepickerStarts: !this.state.timepickerStarts
    })
    if (this.state.timepickerEnds === true) {
      this.setState({
        timepickerEnds: false
      })
    }
  }
  showTimePickerEnds() {
    this.setState({
      timepickerEnds: !this.state.timepickerEnds
    })
    if (this.state.timepickerStarts === true) {
      this.setState({
        timepickerStarts: false
      })
    }
  }
  hideTimePicker() {
    if (this.state.timepickerStarts === true) {
      this.setState({
        timepickerStarts: false
      })
    }
    if (this.state.timepickerEnds === true) {
      this.setState({
        timepickerEnds: false
      })
    }
  }
  handleChange = (name, e) => {
    this.setState({
      [name]: e.nativeEvent.text
    })
  }
  handleOnSave(props) {
    const { courseId, group, location, selectedWeek, setTimeStarts, setTimeEnds } = this.state
    data = {
      _id: courseId,
      group: group,
      location: location,
      day: selectedWeek,
      startTime: setTimeStarts,
      endTime: setTimeEnds,
    }
    add_class(data, props)
    this.handleNavigationBack()
  }

  showPicker = async (stateKey, options, state) => {
    try {

      const { action, hour, minute } = await TimePickerAndroid.open(options);
      if (action === TimePickerAndroid.timeSetAction) {
        var time = new Date(getDate.getFullYear(), getDate.getMonth(), getDate.getDate(), hour, minute, 0);
        console.log(time)
        if (state === 'start') {
          this.setTimeStarts(time)
        } else {
          this.setTimeEnds(time)
        }
      }

    } catch ({ code, message }) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  };

  render() {
    const buttons = [ 'Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Header
            leftComponent={(<TouchableOpacity onPress={this.handleNavigationBack}>
              <Text style={styles.textCancel}>Cancel</Text>
            </TouchableOpacity>
            )}
            centerComponent={({ text: 'New Class', style: { color: '#fff', fontSize: 24, fontWeight: 'bold' } })}
            rightComponent={(<TouchableOpacity onPress={() => { this.handleOnSave(this.props) }}>
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
              placeholder='Group'
              style={styles.textInput}
              onFocus={() => this.hideTimePicker()}
              onChange={e => { this.handleChange('group', e) }}
            />
          </View>
          <View style={styles.containerTextInput}>
            <TextInput
              placeholder='Location'
              style={styles.textInput}
              onFocus={() => this.hideTimePicker()}
              onChange={e => { this.handleChange('location', e) }}
            />
          </View>

          <View style={styles.containerSelectedWeek}>
            <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={this.state.selectedWeek}
              buttons={buttons}
              containerStyle={styles.selectedWeek}
              selectedTextStyle={{ fontWeight: 'bold', fontSize: 18 }}
              selectedButtonStyle={{ backgroundColor: '#6e635b' }}
            />
          </View>

          {Platform.OS === 'ios' ? (
            <TouchableOpacity onPress={() => this.showTimePickerStarts()}>
              <View style={styles.containerDate}>
                <View style={styles.containerTextTime}>
                  <Text style={styles.timeInput}>Starts</Text>
                </View>
                <View style={styles.containerShowTime}>
                  <Text style={styles.showTime}>{format(this.state.setTimeStarts, 'HH:mm')}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )
            :
            (
              <TouchableOpacity
                onPress={this.showPicker.bind(this, 'spinner', {
                  mode: 'spinner',
                  hour: 8,
                  minute: 0,
                  is24Hour: true,
                }, 'start')}>
                <View style={styles.containerDate}>
                  <View style={styles.containerTextTime}>
                    <Text style={styles.timeInput}>Starts</Text>
                  </View>
                  <View style={styles.containerShowTime}>
                    <Text style={styles.showTime}>{format(this.state.setTimeStarts, 'HH:mm')}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}



          {this.state.timepickerStarts &&
            (
              <View style={styles.containerInputTime}>
                <DatePickerIOS
                  date={this.state.setTimeStarts}
                  onDateChange={this.setTimeStarts}
                  mode='time'
                  minuteInterval='10'
                />
              </View>
            )}

          {Platform.OS === 'ios' ? (
            <TouchableOpacity onPress={() => this.showTimePickerEnds()}>
              <View style={styles.containerDate}>
                <View style={styles.containerTextTime}>
                  <Text style={styles.timeInput}>Ends</Text>
                </View>
                <View style={styles.containerShowTime}>
                  <Text style={styles.showTime}>{format(this.state.setTimeEnds, 'HH:mm')}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )
            :
            (
              <TouchableOpacity
                onPress={this.showPicker.bind(this, 'spinner', {
                  mode: 'spinner',
                  hour: 11,
                  minute: 0,
                  is24Hour: true,
                }, 'end')}>
                <View style={styles.containerDate}>
                  <View style={styles.containerTextTime}>
                    <Text style={styles.timeInput}>Ends</Text>
                  </View>
                  <View style={styles.containerShowTime}>
                    <Text style={styles.showTime}>{format(this.state.setTimeEnds, 'HH:mm')}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}


          {this.state.timepickerEnds && (
            <View style={styles.containerInputTime}>
              <DatePickerIOS
                date={this.state.setTimeEnds}
                onDateChange={this.setTimeEnds}
                mode='time'
                minuteInterval='10'
                minimumDate={this.state.setTimeStarts}
              />
            </View>
          )}


          <View style={styles.containerDurations}>
            <Text>Durations : {calDurationsTime(this.state.setTimeStarts, this.state.setTimeEnds)}</Text>
          </View>


        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Add_ClassScreen.navigationOptions = {
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
  selectedWeek: {
    height: 50,
    margin: -5
  },
  containerSelectedWeek: {
    marginTop: 10,
    backgroundColor: '#fd4176',
  },
  containerInputTime: {
    flexWrap: 'wrap',
    backgroundColor: '#fff',
  },
  containerTextTime: {
    flex: 2,
    justifyContent: 'center'
  },
  containerShowTime: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  showTime: {
    fontSize: 18,
    color: 'gray',
  },
  timeInput: {
    fontSize: 18,
  },
  containerDate: {
    fontSize: 18,
    backgroundColor: '#fff',
    height: 50,
    marginTop: 8,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  containerDurations: {
    margin: 5
  },
});
const mapStateToProps = state => ({
  errors: state.errors
})
export default connect(mapStateToProps)(Add_ClassScreen)