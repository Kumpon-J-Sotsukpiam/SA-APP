import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';

import { Header } from 'react-native-elements';
import ContainerClass from '../components/ContainerClass';

// Date
var getDate = new Date();
var date = getDate.getDate();
var year = getDate.getFullYear();
// Week
var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";
// GetWeek
var day = weekday[getDate.getDay()];
var namemonth = new Array(12);
namemonth[0] = "January";
namemonth[1] = "February";
namemonth[2] = "March";
namemonth[3] = "April";
namemonth[4] = "May";
namemonth[5] = "June";
namemonth[6] = "July";
namemonth[7] = "August";
namemonth[8] = "September";
namemonth[9] = "October";
namemonth[10] = "November";
namemonth[11] = "December";
var month = namemonth[getDate.getMonth()];
 
export default class TodayScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      test:'Class id / TodayScreen',
      date: date+' '+month+' '+year,
      day: day,
    }
  }

  render() {


  return (

    <View style={styles.container}>
      <Header
        centerComponent={(<View style={styles.containerHeader}>
                            <View style={styles.containerTextHeader}>
                              <Text style={styles.textHeader}>Today</Text>
                            </View>
                            <View style={styles.containerDateHeader}>
                              <Text style={styles.dayHeader}>{this.state.day}</Text>
                            </View>
                            <View style={styles.containerDateHeader}>
                              <Text style={styles.dateHeader}>{this.state.date}</Text>
                            </View>
                          </View>
        )}
        containerStyle={{
          backgroundColor: '#fd4176',
          height:120,
          justifyContent: 'space-around',
          borderBottomColor: '#be5f7a',
          borderBottomWidth: 1,
        }}
      />
      <ScrollView>
      <View style={styles.containerClass}>
      <Text style={styles.header}>NOW</Text>
      </View>

        <ContainerClass
        Course={'Course'}
        Group={'Group'}
        Location={'Location'}
        StartEndTime={'Start - End Time'}
        Students={'The Number Of Student'}
        NavigateCamera={() => this.props.navigation.navigate('Camera',{test:this.state.test})}
        NavigateClassDetails={() => this.props.navigation.navigate('Camera',{test:'Test ClassDetails / TodayScreen'})}
        />
    
    <View style={styles.containerClass}>
        <Text style={styles.header}>NEXT</Text>
    </View>
    </ScrollView>

      </View>
  );
}
}

TodayScreen.navigationOptions = {
  header:null
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  containerClass: {
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderColor: '#e8e8e8'

  },
  header: {
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10,
    marginBottom:5,
    fontSize: 20
  },
    containerHeader: {
    flexDirection: 'column',
  },
    containerTextHeader: {
    flex: 2,
    justifyContent:'center',
    alignItems: 'center'
  },
    textHeader:{
      color: '#fff',
      fontSize:36,
      fontWeight:'bold'
  },
    containerDateHeader: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center'
  },
    dateHeader:{
      color: '#fff',
      fontSize:14,
      fontWeight:'bold'
  },
      dayHeader:{
      color: '#fff',
      fontSize:20,
      fontWeight:'bold'
  }

});
