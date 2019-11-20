import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
} from "react-native";

import { Ionicons } from '@expo/vector-icons';
import { connect } from "react-redux"
import { registerUser } from "../src/actions/authentication"
import { Button } from 'react-native-elements';

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
    const { password, password_confirm, username, name } = this.props.errors
    return (

      <View style={styles.container}>

          <View>

          <View style={{alignItems:'center', marginBottom:20}}>
            <Text style={{fontSize:30,fontWeight:'bold',color:'#fff'}}>
              SIGN UP
            </Text>
          </View>
          
            <TextInput
              placeholderTextColor='gray'
              placeholder='Name'
              style={styles.textInput}
              onChange={e => this.handleChange('name', e)}
            />                    
            <Text style={styles.errorText}>{username}</Text>
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
              type='clear'
              style={styles.button} 
              onPress={e => this.handleRegister(e)}
              title='CREATE ACCOUNT'
              titleStyle={{fontSize:20,fontWeight:'bold',color:'#fff'}}
            />
            <Button
              type='clear'
              style={styles.button} 
              onPress={() => this.props.navigation.navigate('SignIn')}
              title='SIGN IN'
              titleStyle={{fontSize:18,fontWeight:'bold',color:'#fff'}}
            />
            
            </View>

            </View>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fd4176',
    justifyContent:'center',
  },
  button: {
    height: 45,
    marginVertical:5,
    marginHorizontal:10
  },
  textInput: {
    height:50,
    borderRadius:25,
    borderWidth:0.5,
    borderColor:'gray',
    fontSize:18,
    backgroundColor:'#fff',
    marginHorizontal:10,
    paddingLeft:15,
    shadowOffset:{width:2, height:2},
    shadowOpacity:0.2,
    shadowColor:'#000',
    
  },
  errorText: {
    fontSize:14,
    color:'#fff',
    paddingLeft:20,
    marginVertical:3
  },
});

const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(mapStateToProps)(Register)