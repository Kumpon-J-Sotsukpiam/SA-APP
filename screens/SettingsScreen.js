import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header } from 'react-native-elements';
import ContainerMenu from '../components/ContainerMenu';
import { logoutUser } from "../src/actions/authentication"
class SettingsScreen extends React.Component{
  constructor(props){
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
  }
  handleLogout = () => {
    logoutUser(this.props)
  }
  render(){
    return (
      <View style = {styles.container}>
        <Header
          centerComponent={({ text: 'Settings', style:{color: '#fff', fontSize:36, fontWeight:'bold'} })}
          containerStyle={{
            backgroundColor: '#fd4176',
            height:120,
            justifyContent: 'space-around',
            borderBottomColor: '#be5f7a',
            borderBottomWidth: 1,
          }}
        />   
        <ScrollView>
          <ContainerMenu
            Name={"Logout"}
            onPress = {e => this.handleLogout()}
          />
        </ScrollView>
      </View>
    );
  }  
}

SettingsScreen.navigationOptions = {
  header:null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default SettingsScreen