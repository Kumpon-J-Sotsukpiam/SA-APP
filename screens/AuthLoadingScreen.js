import React, { Component } from 'react'
import * as SecureStore from 'expo-secure-store';
import { connect } from "react-redux"
import isEmpty from "../src/modules/is-empty"
import jwt_decode from 'jwt-decode'

import { setCurrentToken } from "../src/actions/authentication"
import { get_first } from "../src/actions/firstLoading"

import { StyleSheet, View, ActivityIndicator, ImageBackground, Dimensions } from 'react-native'

const { width, height } = Dimensions.get("screen");

class AuthLoadingScreen extends Component {
    componentWillMount() {
        const { dispatch, navigation } = this.props
        SecureStore.getItemAsync('tokenAuth').then(token => {
            // todo check token wiht server
            if (isEmpty(token)) {
                navigation.navigate("Auth")
            } else {
                const decoded = jwt_decode(token)
                dispatch(setCurrentToken(decoded))
                get_first(this.props).then(() => {
                    navigation.navigate("App")
                })
            }
        }).catch(err => {
            console.error(err)
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={require('../assets/imgs/registerbg.png')}
                    style={{ width, height, zIndex: 1}}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#aa73b7',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(AuthLoadingScreen)