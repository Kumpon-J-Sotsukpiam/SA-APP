import React from 'react';
import { ScrollView, StyleSheet, View, Text,TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from 'react-native-elements';
import ContainerSemester from '../components/ContainerSemester';
import { calDurationsSemesterLeft } from "../src/actions/durations"
import Swipeout from 'react-native-swipeout';

var dateCurent = new Date();


export default class CourseListScreen extends React.Component {

  constructor(props) {
    super(props);

      this.state = {
        autoClose:true,
      semester:{
        semesterID:1,
        semesterName:'Semester 2019',
        startDate:'2019/12/1',
        endDate:'2019/12/31',
      },
      course:[{
        courseName:'SP326',
        id_:'1',
        semesterID:'SemesterID',
        students:'Total student SP326',
      },{
        courseName:'SP423',
        id_:'2',
        semesterID:'SemesterID',
        students:'Total student SP423',
        }
    ],
      
      
    };
  }

  ListViewItemSeparator = () => {
    return (
      <View style={{ backgroundColor: '#000'}} />
    );
  }; 


 render() {

  return (
    <View style = {styles.container}>
      <Header
        
        leftComponent={(
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Semesters')}>
        <Ionicons
          name='ios-arrow-back'
          size={35}
          color='#fff'
        />
        </TouchableOpacity>
        )}
        leftContainerStyle={{flex:2}}
        rightComponent={(<Ionicons name={'ios-add'}
        size={60}
        color={'#fff'}
        onPress={()=>{this.props.navigation.navigate('AddCourse')}}
      />)}
        rightContainerStyle={{flex:1}}
        centerComponent={(
        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('EditSemester',{semesterID:this.state.semester.semesterID})}}>
        <View style={styles.containerHeader}>
          <View style={styles.containerTextHeader}>
            <Text style={styles.textHeader}>{this.state.semester.semesterID}</Text>
          </View>
          <View style={styles.containerDurationsHeader}>
            <Text style={styles.durationsHeader}>Durations : {calDurationsSemesterLeft(this.state.semester.endDate)}</Text>
          </View>
        </View>
        </TouchableOpacity>
        )}
        centerContainerStyle={{flex:10}}
        containerStyle={styles.containerStyle}
      />
     
     <ScrollView>
      <View style={styles.containerSemester}>
      </View>

      <View style={{paddingBottom:5}}>
      <FlatList
        ItemSeparatorComponent={this.ListViewItemSeparator}
        data={this.state.course}
        refreshing={true}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.containerSemesterList}>  
          <Swipeout left={[{text: 'Delete',
                            backgroundColor: 'red',
                            onPress: () => {}
                          }]}
                    style={{borderBottomLeftRadius: 10,borderTopLeftRadius:10}}    
                    autoClose={this.state.autoClose}
                    backgroundColor= 'transparent'>
            <ContainerSemester
            semester={item.courseName}
            students={item.students}
            navigateCourseList={() => this.props.navigation.navigate('ClassList')}
           /> 
            </Swipeout>
          </View>      
             )}
      />
      
      
      </View>

      </ScrollView>
      
    </View>
  );
}
}

CourseListScreen.navigationOptions = {
  header:null
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
    justifyContent:'center',
    alignItems: 'center'
  },
  textHeader:{
      color: '#fff',
      fontSize:36,
      fontWeight:'bold'
  },
  containerDurationsHeader: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center'
  },
  durationsHeader:{
      color: '#fff',
      fontSize:14,
      fontWeight:'bold'
  },
  containerStyle:{
    backgroundColor: '#fd4176',
    height:120,
    justifyContent: 'space-around',
    borderBottomColor: '#be5f7a',
    borderBottomWidth: 1,
  },
  containerSemesterList: {
    backgroundColor: '#fff',
    marginTop:5,
    marginRight:10,
    marginLeft:10,
    borderRadius:10,
  },
});
