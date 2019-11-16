import React from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TextInput,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";

import { Ionicons } from '@expo/vector-icons';
import { connect } from "react-redux"
import { registerUser } from "../src/actions/authentication"
import { Button } from 'react-native-elements';
const { width, height } = Dimensions.get("screen");

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      username: '',
      password: '',
      password_confirm: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
  }
  handleChange = (name, e) => {
    this.setState({
      [name]: e.nativeEvent.text
    })
  }
  handleRegister = (e) => {
    registerUser(this.state, this.props)
  }
  render() {
    const { password, password_confirm, username } = this.props.errors
    return (
      <View style={styles.container}>
        
        <ImageBackground
          source={require('../assets/imgs/bg.png')}
          style={{ width, height, zIndex: 1 }}
        >
         <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior='padding'
            enabled    
         >
          <View style={{
            backgroundColor:'#fff',
            top: height/4,
            marginHorizontal: 20,
            shadowOffset:{width:2, height:2},
            shadowOpacity:0.2,
            shadowColor:'#000',}}>

          <View style={{justifyContent:'center',alignItems:'center',height:50}}>
          <Text style={{fontSize:24,fontWeight:'bold'}}>
            SIGN UP
          </Text>
          </View>
   
            <TextInput
              placeholderTextColor='gray'
              placeholder='Name'
              style={{...styles.textInput,marginVertical:20}}
              onChange={e => this.handleChange('name', e)}
            />                    
 
            <TextInput
              placeholderTextColor='gray'
              placeholder='Username'
              style={styles.textInput}
              onChange={e => this.handleChange('username', e)}
            />   
            <Text style={styles.errorText}>{username}</Text>
            <TextInput
              secureTextEntry={true}
              placeholderTextColor='gray'
              placeholder='Password'
              style={styles.textInput}
              onChange={e => this.handleChange('password', e)}
            />                      
            <Text style={styles.errorText}>{password}</Text>

            <TextInput
              secureTextEntry={true}
              placeholderTextColor='gray'
              placeholder='Password Confirm'
              style={styles.textInput}
              onChange={e => this.handleChange('password_confirm', e)}
            />  
            <Text style={styles.errorText}>{password_confirm}</Text>
            
            <Button
              style={styles.button} 
              onPress={e => this.handleRegister(e)}
              title='CREATE ACCOUNT'
              titleStyle={{fontSize:14,fontWeight:'bold',color:'#000'}}
            />
            <Button
              type='clear'
              style={styles.button} 
              onPress={() => this.props.navigation.navigate('SignIn')}
              title='SIGN IN'
              titleStyle={{fontSize:14,fontWeight:'bold',color:'#000'}}
            />
            </View>
            </KeyboardAvoidingView>

            </ImageBackground>
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems:'center'
  },
  button: {
    height: 40,
    marginHorizontal: 20,    
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowOffset:{width:2, height:2},
    shadowOpacity:0.2,
    shadowColor:'#000',
  },
  textInput: {
    height:50,
    borderRadius:25,
    borderWidth:0.5,
    borderColor:'gray',
    marginHorizontal:15,
    paddingLeft:10,
    marginVertical:5,
    fontSize:18
  },
  errorText: {
    fontSize:14,
    color:'red',
    paddingLeft:20
  },
});

const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(mapStateToProps)(Register)