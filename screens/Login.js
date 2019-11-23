import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { connect } from "react-redux"
import { loginUser, changePassword,loginFacebook } from "../src/actions/authentication"
import Svg,{Image,Circle,ClipPath} from 'react-native-svg'
import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State, TouchableOpacity} from 'react-native-gesture-handler';
import { clearErrors } from '../src/actions/errors'
//import library for facebook login
import * as Facebook from 'expo-facebook';
import { Alert } from 'react-native';

const { width, height } = Dimensions.get('window');

const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
  concat
} = Animated;

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease)
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position
  ]);
}

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)

    this.buttonOpacity = new Value(1);
    this.onStateChange = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
            )
          ])
      }
    ]);
    this.onCloseState = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
            )
          ])
      }
    ]);

    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.bgY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 2, 0],
      extrapolate: Extrapolate.CLAMP
    });


    this.textInputZindex = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, -1],
      extrapolate: Extrapolate.CLAMP
    });

    this.textInputOpacity = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.textInputY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [0, 100],
      extrapolate: Extrapolate.CLAMP
    });

    this.rotateCross = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [180, 360],
      extrapolate: Extrapolate.CLAMP
    });
  }

  //login with facebook function
  async loginWithFacebook() {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync('445952655996280', { permissions: ['public_profile'], });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        //Alert.alert('login with facebook is successed')
        response.json().then(data => {
          //api.post('http://172.20.10.7:3001/auth/facebook',data)
          loginFacebook(data,this.props)
        })

      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }
  //

  async componentWillMount(){
    clearErrors(this.props)
  }
  async componentWillUnmount(){
    clearErrors(this.props)
  }
  
  handleChange = (name, e) => {
    this.setState({
      [name]: e.nativeEvent.text
    })
  }

  handleLogin = (e) => {
    loginUser(this.state, this.props)
  }

  render() {
    const { password, username } = this.props.errors
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Animated.View
            style={{
              ...StyleSheet.absoluteFill,
              transform: [{ translateY: this.bgY }]
            }}
          >
            <Svg height={height + 50} width={width}>
              <ClipPath id='clip'>
                <Circle r={height} cx={width / 2} />
              </ClipPath>
              <Image
                href={require('../assets/imgs/bg.png')}
                width={width}
                height={height}
                preserveAspectRatio='xMidYMid slice'
                clipPath='url(#clip)'
              />
            </Svg>
          </Animated.View>
          <View style={{ height: height / 3, justifyContent: 'center' }}>
            <TapGestureHandler onHandlerStateChange={this.onStateChange}>
              <Animated.View
                style={{
                  ...styles.button,
                  opacity: this.buttonOpacity,
                  transform: [{ translateY: this.buttonY }]
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>SIGN IN</Text>
              </Animated.View>
            </TapGestureHandler>

            <Animated.View
              style={{
                ...styles.button,
                backgroundColor: '#2E71DC',
                opacity: this.buttonOpacity,
                transform: [{ translateY: this.buttonY }]
              }}
            >
              <TouchableOpacity
                onPress={() => this.loginWithFacebook()}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                  SIGN IN WITH FACEBOOK
          </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>

          <Animated.View style={{
            zIndex: this.textInputZindex,
            opacity: this.textInputOpacity,
            transform: [{ translateY: this.textInputY }],
            height: height / 2,
            ...StyleSheet.absoluteFill,
            top: null,
            justifyContent: 'center'
          }}>

            <TapGestureHandler onHandlerStateChange={this.onCloseState}>
              <Animated.View style={styles.closeBtn}>
                <Animated.Text style={{ fontSize: 20, transform: [{ rotate: concat(this.rotateCross, 'deg') }] }}>X</Animated.Text>
              </Animated.View>
            </TapGestureHandler>

            <TextInput
              placeholderTextColor='gray'
              placeholder='Username'
              style={styles.textInput}
              onChange={e => this.handleChange('username', e)}
              onSubmitEditing={(event) => { this.refs.password.focus() }}
            />
            <Text style={styles.errorText}>{username}</Text>
            <TextInput
              ref='password'
              secureTextEntry={true}
              placeholderTextColor='gray'
              placeholder='Password'
              style={styles.textInput}
              onChange={e => this.handleChange('password', e)}
          />
          <Text style={styles.errorText}>{password}</Text>
          

          <TouchableOpacity onPress={e => this.handleLogin(e)} style={{...styles.button,backgroundColor:'#2E71DC'}}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>
            SIGN IN
          </Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => {
            clearErrors(this.props).then(() => {
              this.props.navigation.navigate('SignUp')
            })
          }} style={styles.button}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>
            SIGN UP
          </Text>
          </TouchableOpacity>


      </Animated.View>
    </View>
    </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end'
  },
  button: {
    backgroundColor: 'white',
    height: 50,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowOffset:{width:2, height:2},
    shadowOpacity:0.2,
    shadowColor:'#000',
    borderColor:'gray',
    borderWidth:1,
  },
  closeBtn: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -20,
    left: width / 2 - 20,
    shadowColor: '#000',
    shadowOpacity: 0.2
  },
  textInput: {
    height:50,
    borderRadius:25,
    borderWidth:0.5,
    borderColor:'gray',
    marginHorizontal:15,
    paddingLeft:10,
    marginVertical:3,
    fontSize:18,
    borderColor:'gray',
    borderWidth:1,
  },
  errorText: {
    marginHorizontal:15,
    paddingLeft:10,
    fontSize:14,
    color:'red'
  },
});

const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(mapStateToProps)(Login)