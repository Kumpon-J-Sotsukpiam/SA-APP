import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from 'react-native-elements';
import ContainerMenu from '../components/ContainerMenu';
import DialogBox from '../components/DialogBox';
import { logoutUser } from "../src/actions/authentication"

class SettingsScreen extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      resetToggle:false
    }

    this.handleLogout = this.handleLogout.bind(this)
  }
  handleLogout = () => {
    logoutUser(this.props)
  }


  render(){
    return (
      <View style = {styles.container}>
        <View>
        <Header
          centerComponent={({ text: 'Settings', style:{color: '#fff', fontSize:36, fontWeight:'bold'} })}
          containerStyle={styles.containerStyle}
        />
        </View>

          <ContainerMenu
            Name={"Logout"}
            onPress = {e => this.handleLogout()}
          />

          <ContainerMenu
            Name={"Reset"}
            onPress = {() => this.setState({ resetToggle: true })}
          />

          <DialogBox
          visible={this.state.resetToggle}
          onTouchOutside = {() => this.setState({ resetToggle: false })}
          cancelBtn = {() => this.setState({ resetToggle: false })}
          confirmBtn ={()=>{}}
          />

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
  containerStyle: {
    backgroundColor: '#fd4176',
    height:120,
    justifyContent: 'space-around',
    borderBottomColor: '#be5f7a',
    borderBottomWidth: 1,
  }
});

export default SettingsScreen