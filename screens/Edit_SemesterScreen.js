import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  DatePickerIOS,
  TouchableWithoutFeedback,
  Keyboard,
  Platform

} from 'react-native';

import { Header } from 'react-native-elements';
import { calDurationsDate } from "../src/actions/durations"
import { connect } from 'react-redux'
import { set_semester } from '../src/actions/semester'
import { format } from 'date-fns'

var getDate = new Date();


class Edit_SemesterScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      semesterId: null,
      semesterName:null,
      dateStarts: getDate,
      dateEnds: getDate,
      datepickerStarts: false,
      datepickerEnds: false,
    }

    this.setDateStarts = this.setDateStarts.bind(this);
    this.setDateEnds = this.setDateEnds.bind(this);
    this.setSemesterName = this.setSemesterName.bind(this);
  }

  async componentWillMount() {
    id = this.props.navigation.state.params.semesterId
    log = this.props.semester.filter((i) => i._id === id)[0]
    console.log('====================================');
    console.log(log);
    console.log('====================================');
    this.setState({
      semesterId: log._id,
      semesterName: log.name,
      dateStarts: new Date(log.startDate),
      dateEnds: new Date(log.endDate)
    })
    this.handleBack = this.handleBack.bind(this)
    this.handleOnSave = this.handleOnSave.bind(this)
  }
  setSemesterName(name) {
    this.setState({ semesterName: name });
  }

  setDateStarts(newDate) {
    this.setState({ dateStarts: newDate });
  }
  setDateEnds(newDate) {
    this.setState({ dateEnds: newDate });
  }

  showDatePickerStarts() {
    this.setState({
      datepickerStarts: !this.state.datepickerStarts
    })

    if (this.state.datepickerEnds === true) {
      this.setState({
        datepickerEnds: false
      })
    }
  }

  showDatePickerEnds() {

    this.setState({
      datepickerEnds: !this.state.datepickerEnds
    })

    if (this.state.datepickerStarts === true) {
      this.setState({
        datepickerStarts: false
      })
    }
  }

  hideDatePicker() {
    if (this.state.datepickerStarts === true) {
      this.setState({
        datepickerStarts: false
      })
    }
    if (this.state.datepickerEnds === true) {
      this.setState({
        datepickerEnds: false
      })
    }

  }
  handleOnSave() {
    data = {
      name: this.state.semesterName,
      startDate: this.state.dateStarts,
      endDate: this.state.dateEnds
    }
    set_semester(this.state.semesterId, data, this.props).then(() => {
      this.handleBack()
    })
  }
  handleBack() {
    this.props.navigation.navigate('CourseList', { semesterId: this.state.semesterId })
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
            centerComponent={({ text: 'Edit Semester', style: { color: '#fff', fontSize: 24, fontWeight: 'bold' } })}
            rightComponent={(<TouchableOpacity onPress={this.handleOnSave}>
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
              placeholder={this.state.semesterName}
              value={this.state.semesterName}
              style={styles.textInput}
              onFocus={() => this.hideDatePicker()}
              onChangeText={this.setSemesterName}
            />

          </View>

          <TouchableOpacity onPress={() => this.showDatePickerStarts()}>
            <View style={styles.containerDate}>
              <View style={styles.containerTextDate}>
                <Text style={styles.dateInput}>Starts</Text>
              </View>
              <View style={styles.containerShowDate}>
                <Text style={styles.showDate}>{format(this.state.dateStarts, 'dd MMM yyyy')}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.containerInputDate}>
            {Platform.OS === 'ios' ? this.state.datepickerStarts &&
              (
                <DatePickerIOS
                  date={this.state.dateStarts}
                  onDateChange={this.setDateStarts}
                  mode='date'
                />
              ) :
              this.state.datepickerStarts &&
              (
                <Text>Wait</Text>
              )
            }
          </View>

          <TouchableOpacity onPress={() => this.showDatePickerEnds()}>
            <View style={styles.containerDate}>
              <View style={styles.containerTextDate}>
                <Text style={styles.dateInput}>Ends</Text>
              </View>
              <View style={styles.containerShowDate}>
                <Text style={styles.showDate}>{format(this.state.dateEnds, 'dd MMM yyyy')}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.containerInputDate}>

            {Platform.OS === 'ios' ? this.state.datepickerEnds &&
              (
                <DatePickerIOS
                  date={this.state.dateEnds}
                  onDateChange={this.setDateEnds}
                  mode='date'
                  minimumDate={this.state.dateStarts}
                />
              ) :
              this.state.datepickerEnds &&
              (
                <Text>Wait</Text>
              )
            }

          </View>
          <View style={styles.containerDurations}>
            <Text>Durations : {calDurationsDate(this.state.dateStarts, this.state.dateEnds)}</Text>
          </View>

        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Edit_SemesterScreen.navigationOptions = {
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
  containerDate: {
    fontSize: 18,
    backgroundColor: '#fff',
    height: 50,
    marginTop: 8,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'center'
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
  dateInput: {
    fontSize: 18,
  },
  containerInputDate: {
    flexWrap: 'wrap',
    backgroundColor: '#fff',
  },
  showDate: {
    fontSize: 18,
    color: 'gray',
  },
  containerTextDate: {
    flex: 2,
    justifyContent: 'center'
  },
  containerShowDate: {
    flex: 1,
    justifyContent: 'center'
  },
  containerDurations: {
    margin: 5
  },

});
const mapStateToProps = state => ({
  semester: state.semester
})

export default connect(mapStateToProps)(Edit_SemesterScreen)