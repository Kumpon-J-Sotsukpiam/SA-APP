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
  DatePickerAndroid,
  Platform,
} from 'react-native';

import { Header } from 'react-native-elements';
import { calDurationsDate } from "../src/actions/durations"
import {add_semester} from '../src/actions/semester'
import {connect} from 'react-redux'
//Date
import { format, addDays } from 'date-fns'

var getDate = new Date();


class Add_SemesterScreen extends React.Component {
   constructor(props) {
    super(props);

    this.state = {
      semesterName:'Semester',
      dateStarts:getDate,
      dateEnds:addDays(getDate, 120),
      datepickerStarts:false,
      datepickerEnds:false,
      spinnerDate: new Date(2020, 4, 5),
   
    }

     this.setDateStarts = this.setDateStarts.bind(this);
     this.setDateEnds = this.setDateEnds.bind(this);
     this.handleOnSave = this.handleOnSave.bind(this);
     this.setSemesterName = this.setSemesterName.bind(this);

  }

  setSemesterName(name){
    this.setState({ semesterName:name });
  }

   setDateStarts(newDate) {
    this.setState({ dateStarts: newDate });
  }
   setDateEnds(newDate) {
    this.setState({ dateEnds: newDate });
  }



  showDatePickerStarts(){
    this.setState({
      datepickerStarts:!this.state.datepickerStarts
    })

    if(this.state.datepickerEnds===true){
       this.setState({
      datepickerEnds:false
    })
    }
  }

  showDatePickerEnds(){
    
    this.setState({
      datepickerEnds:!this.state.datepickerEnds
    })

    if(this.state.datepickerStarts===true){
       this.setState({
      datepickerStarts:false
    })
    }
  }

  hideDatePicker(){
    if(this.state.datepickerStarts===true){
       this.setState({
      datepickerStarts:false
    })
    }
    if(this.state.datepickerEnds===true){
       this.setState({
      datepickerEnds:false
    })
    }

  }

  
  showPicker = async (stateKey, options, state) => {
    try {
      
      const {action, year, month, day} = await DatePickerAndroid.open(options);
      if (action === DatePickerAndroid.dateSetAction) {
        var date = new Date(year, month, day);
        if (state === 'start'){
            this.setDateStarts(date)
        } else {
            this.setDateEnds(date)
        }
      }
      
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  };

  async handleOnSave(semester,props) {
    await add_semester(semester,props)
    await this.props.navigation.navigate('Semesters')
  }
  handleChange = (name, e) => {
    this.setState({
      [name]: e.nativeEvent.text
    })
  }
  render() {
    
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style = {styles.container}>
      <Header
        leftComponent={(<TouchableOpacity onPress={()=>{this.props.navigation.navigate('Semesters')}}>
                          <Text style={styles.textCancel}>Cancel</Text>
                        </TouchableOpacity>
                        )}
        centerComponent={({ text: 'New Semester', style:{color: '#fff', fontSize:24, fontWeight:'bold'} })}
        rightComponent={(<TouchableOpacity onPress={()=> this.handleOnSave(this.state,this.props)}>
                          <Text style={styles.textSave}>Save</Text>
                        </TouchableOpacity>
                        )}
        containerStyle={{
          backgroundColor: '#fd4176',
          height:80,
          justifyContent: 'space-around',
          borderBottomColor: '#be5f7a',
          borderBottomWidth: 1,
        }}
      />

      <View style={styles.containerTextInput}>
        <TextInput
        placeholder='Untitled Semester'
        style={styles.textInput}
        onFocus={()=>this.hideDatePicker()}
        onChangeText={this.setSemesterName}
        />
      
      </View>
        {Platform.OS === 'ios' ? 
        (<TouchableOpacity onPress={()=>this.showDatePickerStarts()}>
      <View style={styles.containerDate}>
          <View style={styles.containerTextDate}>
          <Text style={styles.dateInput}>Starts</Text>
          </View>
          <View style={styles.containerShowDate}>
          <Text style={styles.showDate}>{format(this.state.dateStarts,'dd MMM yyyy')}</Text>
        </View>
      </View>
      </TouchableOpacity>
      )
      :
      (<TouchableOpacity
        onPress={this.showPicker.bind(this, 'spinner',{date: this.state.dateStarts, mode: 'spinner'},'start')}>
              <View style={styles.containerDate}>
          <View style={styles.containerTextDate}>
          <Text style={styles.dateInput}>Starts</Text>
          
          </View>
          <View style={styles.containerShowDate}>
          <Text style={styles.showDate}>{format(this.state.dateStarts,'dd MMM yyyy')}</Text>
        </View>
      </View>
      </TouchableOpacity>
      )}
      
      {this.state.datepickerStarts &&
      <View style={styles.containerInputDate}>
        <DatePickerIOS
          date={this.state.dateStarts}
          onDateChange={this.setDateStarts}
          mode='date'
        />
      </View>
      }
      
      
      {Platform.OS === 'ios' ? (
      <TouchableOpacity onPress={()=>this.showDatePickerEnds()}>
      <View style={styles.containerDate}>
          <View style={styles.containerTextDate}>
          <Text style={styles.dateInput}>Ends</Text>
          </View>
          <View style={styles.containerShowDate}>
          <Text style={styles.showDate}>{format(this.state.dateEnds,'dd MMM yyyy')}</Text>
        </View>
      </View>
      </TouchableOpacity>
      )
      :
      (
        <TouchableOpacity
        onPress={this.showPicker.bind(this, 'spinner',
        {date: this.state.dateStarts, mode: 'spinner',minDate:this.state.dateStarts},'end')}>
        <View style={styles.containerDate}>
            <View style={styles.containerTextDate}>
            <Text style={styles.dateInput}>Ends</Text>
            </View>
            <View style={styles.containerShowDate}>
            <Text style={styles.showDate}>{format(this.state.dateEnds,'dd MMM yyyy')}</Text>
          </View>
        </View>
        </TouchableOpacity>

      )}

      {this.state.datepickerEnds &&
      <View style={styles.containerInputDate}>
        <DatePickerIOS
          date={this.state.dateEnds}
          onDateChange={this.setDateEnds}
          mode='date'
          minimumDate={this.state.dateStarts}
        />
      </View>
      }

      
      <View style={styles.containerDurations}>
      <Text>Durations : {calDurationsDate(this.state.dateStarts,this.state.dateEnds)}</Text>
      </View>

    </View>
    </TouchableWithoutFeedback>
  );
}
}

Add_SemesterScreen.navigationOptions = {
  header:null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  }, 
  textCancel: {
    fontSize:18,
    color:'#fff'
  },
  textSave: {
    fontSize:18,
    color:'#fff'
  },
  containerDate: {
    fontSize:18,
    backgroundColor:'#fff',
    height:50,
    marginTop: 8,
    padding:8,
    flexDirection:'row',
    justifyContent:'center'
  },
  textInput: {
    backgroundColor:'#fff',
    height:50,
    padding: 10,
    fontSize:18
  },
  containerTextInput: {
    marginTop:10,
  },
  dateInput: {
    fontSize:18,
  },
  containerInputDate:{
    flexWrap:'wrap',
    backgroundColor: '#fff',
  },
    showDate: {
    fontSize:18,
    color:'gray',
  },
  containerTextDate: {
    flex:2,
    justifyContent:'center' 
  },
  containerShowDate: {
    flex:1,
    justifyContent:'center'
  },
  containerDurations: {
    margin:5
  },

})
const mapStateToProps = state => ({
  errors : state.errors
})
export default connect(mapStateToProps)(Add_SemesterScreen)