import React from 'react';
import { ScrollView, StyleSheet, View, Text,Platform } from 'react-native';

import { Header, Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import ContainerSemester from '../components/ContainerSemester';


export default class SemestersScreen extends React.Component {
   constructor(props) {
    super(props);

    this.state = {
      semesterID:'Semester id',
      data:[
        {semester:'semester'},
        {course:'course'},
        {class:'class'}
      ]

    }
  }

  render() {
  return (
    <View style = {styles.container}>
      <Header
        centerComponent={({ text: 'Semester', style:{color: '#fff', fontSize:36, fontWeight:'bold'} })}
        rightComponent={(<View style={styles.containerRightHeader}>
                        <Ionicons name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
                          size={60}
                          color={'#fff'}
                          onPress={()=>{this.props.navigation.navigate('AddSemester')}}
                        />
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
      <View style={styles.containerSemester}>
      <Text style={styles.header}>CURRENT</Text>
      </View>

       <ContainerSemester
        Semester={'Semester'}
        Students={'Total course'}
        NavigateCourseList={() => this.props.navigation.navigate('CourseList',{semesterID:this.state.semesterID})}
        />

      <View style={styles.containerSemester}>
      <Text style={styles.header}>PAST</Text>
      </View>
      </ScrollView>

    </View>
  );
}
}

SemestersScreen.navigationOptions = {
  header:null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  containerSemester: {
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderColor: '#e8e8e8',

  },
  header: {
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10,
    marginBottom:5,
    fontSize: 20,
  },
  containerRightHeader: {
    flex:1,
    marginTop:22,
  },
});
