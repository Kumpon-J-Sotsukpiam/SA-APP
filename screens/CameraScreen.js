import React from 'react';
import { StyleSheet, View, Text, Button, Platform, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class CameraScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test:this.props.navigation.state.params.test,
    };
  }

  render() {

  return (
    <View style = {styles.container}>
        <View style = {styles.containerCamera}>
        </View>

        <View style = {styles.containerMessage}>
            <Text>{this.state.test}</Text>
        </View>
    </View>
  );
}
}

 CameraScreen.navigationOptions = ({ navigation }) => {
  return {
  title: 'Camera',
  headerLeft: (<TouchableOpacity style={styles.tabBar}  onPress={()=>{navigation.navigate('Check')}}>
                <Ionicons name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
                size={30}
                style={styles.tabBarIcon} 
               />
                <Text style={styles.tabBarText}>Check</Text>
               </TouchableOpacity>),
  headerRight: (<Button  onPress={()=>{navigation.navigate('Add_Checkin',{testAdd:navigation.state.params.test});}} title="Add" color="#000000"/>),
  headerTintColor: '#000000',
  headerTitleStyle: {fontWeight: 'bold'},
   };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column'
  },
  containerCamera: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#000000',
  },
  containerMessage: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  tabBar: {
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
    
  },
  tabBarText: {
    fontSize:18,
    flex:1,
    marginLeft:6
  },
  tabBarIcon: {
    marginLeft: 10 ,
    flex:1
  },
});