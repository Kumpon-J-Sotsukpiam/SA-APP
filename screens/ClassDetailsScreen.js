import React from 'react';
import { ScrollView, StyleSheet, View, Text, Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from 'react-native-elements';
import { calDurationsTime } from "../src/actions/durations"

var getDate = new Date();
var getTimeStarts = new Date(getDate.getFullYear(), getDate.getMonth(), getDate.getDate(), 8, 0, 0);
var getTimeEnds = new Date(getDate.getFullYear(), getDate.getMonth(), getDate.getDate(), 11, 0, 0);

export default class ClassDetailsScreen extends React.Component {
  constructor(props) {
    super(props);

      this.state = {
        courseID:'Course ID',
        group:'Group',
        location:'Location',
        day:'Day',
        startTime:'Start ',
        endTime:'End Time',
        totalStudent:'Total student',
        setTimeStarts:getTimeStarts,
        setTimeEnds:getTimeEnds,
        dateCheckin:'Date',
        percentage:'Percentage'
    };
  }


 render() {

  return (
    <View style = {styles.container}>
      <Header
        
        leftComponent={(

        <View style={styles.containerLeftHeader}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('ClassList')}>
        <View style={styles.leftSection1}>
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
            size={35}
            color='#fff'
          />
        </View>
        </TouchableOpacity>    
        
        <View style={styles.leftSection2}>
          <Text style={styles.textHeader}>{this.state.group}</Text>
          <Text style={styles.textHeader}>{this.state.location}</Text>
          <Text style={styles.textHeader}>{this.state.day} , {this.state.startTime} - {this.state.endTime}</Text>
          <Text style={styles.textHeader}>{this.state.totalStudent}</Text>
          <Text style={styles.textHeader}>Durations : {calDurationsTime(this.state.setTimeStarts,this.state.setTimeEnds)}</Text>
        </View>

        </View>
        
        )}
        leftContainerStyle={{flex:8}}
        rightComponent={(<Ionicons name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'}
        size={30}
        color={'#fff'}
        onPress={()=>{this.props.navigation.navigate('Semesters')}}
      />)}
        containerStyle={styles.containerStyle}
      />

      <TouchableOpacity onPress={() => this.props.navigation.navigate('StudentList')}>
      <View style={styles.containerStudentList}>
        <View style={styles.headleftSection1}>
          <Text style={styles.textHead}>Student List</Text>
        </View>
        <View style={styles.headleftSection2}>
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-arrow-forward' : 'md-arrow-forward'}
            size={35}
            color='#979797'
          />
        </View>
      </View>
      </TouchableOpacity>

      <View style={styles.containerClasses}>
        <Text style={styles.textClasses}>CLASSES</Text>  
      </View>
        
      <View style={styles.containerClassList}>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('Semesters')}>
          <View style={styles.containerClass}>
            <View style={styles.classSection1}>
              <Text style={{fontSize:18}}>{this.state.dateCheckin}</Text>
            </View>
            <View style={styles.classSection2}>
            <Text style={{fontSize:18}}>{this.state.percentage}</Text>
            </View>
            <View style={styles.classSection3}>
            <Ionicons
            name={Platform.OS === 'ios' ? 'ios-arrow-forward' : 'md-arrow-forward'}
            size={35}
            color='#979797'
            />
            </View>
          </View>
          </TouchableOpacity>

      </View>


    </View>
  );
}
}

ClassDetailsScreen.navigationOptions = {
  header:null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  containerStudentList: {
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderTopWidth:2,
    borderColor: '#e8e8e8',
    height:50,
    marginTop:5,
    flexDirection:'row'
  },
  containerLeftHeader: {
    flex: 1,
    flexDirection:'row'
  },
  textHeader: {
    color: '#fff',
    fontSize:18,
    fontWeight:'bold'
  },
  leftSection1: {
    flex:1,
    justifyContent:'center',
    marginRight:10
  },
  leftSection2: {
    flex:2,
    justifyContent:'center'
  },
  textHead: {
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 20
  },
  headleftSection1: {
    flex:1,
    justifyContent:'center'
  },
  headleftSection2: {
    flex:1,
    justifyContent:'center',
    alignItems:'flex-end',
    marginRight:10
  },
  textClasses: {
    fontSize:20,
    color:'gray'
  },
  containerClasses: {
    marginTop:10,
    marginLeft:35
  },
  containerClassList: {
    marginTop:5,
    flexWrap:'wrap',
    backgroundColor:'#fff',
    paddingLeft:15,
    paddingTop:10,
    paddingBottom:10
  },
  containerClass: {
    borderBottomWidth:1,
    borderColor:'#fd4176',
    marginTop:10,
    flexDirection:'row'
  },
  classSection1: {
    flex:2,
    justifyContent:'center',
  },
  classSection2: {
    flex:2,
    alignItems:'flex-end',
    justifyContent:'center',
    marginRight:10
  },
  classSection3: {
    flex:1,
    alignItems:'flex-end',
    justifyContent:'center',
    marginRight:10
  },
  containerStyle:{
    backgroundColor: '#fd4176',
    height:130,
    justifyContent: 'space-around',
    borderBottomColor: '#be5f7a',
    borderBottomWidth: 1,
  },
});