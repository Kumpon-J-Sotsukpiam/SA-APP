import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput, DatePickerIOS, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { Header } from 'react-native-elements';

var getDate = new Date();
var date = getDate.getDate();
var month = getDate.getMonth();
var year = getDate.getFullYear();

export default class Add_SemesterScreen extends React.Component {
   constructor(props) {
    super(props);

    this.state = {
      test:'Semester id / SemestersScreen',
      dateStarts:getDate,
      dateEnds:getDate,
      datepickerStarts:false,
      datepickerEnds:false,
    }

     this.setDateStarts = this.setDateStarts.bind(this);
     this.setDateEnds = this.setDateEnds.bind(this);
  }

   setDateStarts(newDate) {
    this.setState({ dateStarts: newDate });
    alert(this.state.dateStarts)
    
  }
   setDateEnds(newDate) {
    this.setState({ dateEnds: newDate });
    alert(this.state.dateEnds)
    
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
      datepickerEnds:!this.state.datepickerEnds,
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
        rightComponent={(<TouchableOpacity onPress={()=>{this.props.navigation.navigate('Semesters')}}>
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
        />
      
      </View>

      <View style={styles.containerDate}>
        <View style={styles.containerInputDate}> 
          <TouchableOpacity onPress={()=>this.showDatePickerStarts()}> 
          <Text style={styles.dateInput}>Starts</Text>
          
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flexWrap: 'wrap',backgroundColor:'#fff'}}>
        {this.state.datepickerStarts &&
        (
        <DatePickerIOS
          date={this.state.dateStarts}
          onDateChange={this.setDateStarts}
          mode='date'
          format='YYYY/MM/DD'
        />
        )}
      </View>

      <View style={styles.containerDate}>
        <View style={styles.containerInputDate}> 
          <TouchableOpacity onPress={()=>this.showDatePickerEnds()}> 
          <Text style={styles.dateInput}>Ends</Text>
          
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flexWrap: 'wrap',backgroundColor:'#fff'}}>
        {this.state.datepickerEnds &&
        (
        <DatePickerIOS
          date={this.state.dateEnds}
          onDateChange={this.setDateEnds}
          mode='date'
          format='YYYY/MM/DD'
        />
        )}
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
    marginTop: 15,
    padding:10,
    flexDirection: 'row',
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
    alignItems: 'flex-start',
  },
  containerInputDate:{
    flex:1,
    justifyContent:'center'
  },

});