import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Platform,
  FlatList
} from 'react-native';
import Swipeout from 'react-native-swipeout';


import { Header, Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import ContainerSemester from '../components/ContainerSemester';
import {get_semester} from '../src/actions/semester'
import { connect } from "react-redux"

class SemestersScreen extends React.Component {
   constructor(props) {
    super(props);

    this.state = {
      semester:'Semester',
      students:'Total student',
      current:[],
      past:[],
      
    }
  }
  componentWillMount(){
    get_semester(this.props)
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
        centerComponent={({ text: 'Semester', style:{color: '#fff', fontSize:36, fontWeight:'bold'} })}
        rightComponent={(<View style={styles.containerRightHeader}>
                        <Ionicons name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
                          size={60}
                          color={'#fff'}
                          onPress={()=>{this.props.navigation.navigate('AddSemester')}}
                        />
                        </View>
                        )}
            
               
        containerStyle={styles.containerStyle}
      />
      
      <View style={styles.containerSemester}>
      <Text style={styles.header}>CURRENT</Text>
      </View>

      <View style={{paddingBottom:5}}>
      <FlatList
        ItemSeparatorComponent={this.ListViewItemSeparator}
        data={this.props.semester}
        refreshing={true}
        renderItem={({item,index}) => (
            
          <Swipeout left={[{text: 'Delete',
          backgroundColor: 'red',
          underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
          onPress: () => {}
          }]}
                  autoClose='true'
                  backgroundColor= 'transparent'>
            <ContainerSemester
            semester={item.name}
            students={this.state.students}
            navigateCourseList={() => this.props.navigation.navigate('CourseList')}
            delete={item._id}/> 
            </Swipeout>       
             )}
      />
      
      </View>


        
      <View style={styles.containerSemester}>
      <Text style={styles.header}>PAST</Text>
      </View>
    

      

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
  containerStyle:{
    backgroundColor: '#fd4176',
    height:120,
    justifyContent: 'space-around',
    borderBottomColor: '#be5f7a',
    borderBottomWidth: 1,
  },
});

const mapStateToProps = state => ({
  semester: state.semester
})
export default connect(mapStateToProps)(SemestersScreen)