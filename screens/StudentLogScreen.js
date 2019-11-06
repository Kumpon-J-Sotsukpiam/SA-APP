import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux'

class StudentLogScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentID:'',
      name:'',
      faculty:'',
      major:'',
      dataTest:[{id:'1',date:'6/11/2019',time:''}]
    };
  }
  
  render() {

    return (
      <View style={styles.container}>
        <Header
          leftComponent={(
            <View style={styles.containerLeftHeader}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('StudentList')}>
                <View style={styles.leftSection1}>
                  <Ionicons
                    name='ios-arrow-back'
                    size={35}
                    color='#fff'
                  />
                </View>
              </TouchableOpacity>
              <View style={styles.leftSection2}>
                <Text style={styles.textHeader}>{this.state.studentID}</Text>
                <Text style={styles.textHeader}>{this.state.name}</Text>
                <Text style={styles.textHeader}>{this.state.faculty}</Text>
                <Text style={styles.textHeader}>{this.major}</Text>
              </View>
            </View>

          )}
          leftContainerStyle={{ flex: 8 }}
          rightComponent={(<Text>89%</Text>)}
          containerStyle={styles.containerStyle}
        />

      </View>
    );
  }
}

ClassDetailsScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  containerStudentList: {
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: '#e8e8e8',
    height: 50,
    flexDirection: 'row'
  },
  containerLeftHeader: {
    flex: 1,
    flexDirection: 'row'
  },
  textHeader: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  leftSection1: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 10
  },
  leftSection2: {
    flex: 2,
    justifyContent: 'center'
  },
  textHead: {
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 20
  },
  headleftSection1: {
    flex: 1,
    justifyContent: 'center'
  },
  headleftSection2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 10
  },
  containerStyle:{
    backgroundColor: '#fd4176',
    height: 140,
    justifyContent: 'space-around',
    borderBottomColor: '#be5f7a',
    borderBottomWidth: 1,
  },
  containerCheckinList: {
    backgroundColor: '#fff',
    marginTop:5,
    marginRight:10,
    marginLeft:10,
    borderRadius:10,
  },
});

export default connect (StudentLogScreen)