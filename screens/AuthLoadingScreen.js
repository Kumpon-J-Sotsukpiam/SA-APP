import React, { Component } from 'react'
import * as SecureStore from 'expo-secure-store';
import { connect } from "react-redux"
import isEmpty from "../src/modules/is-empty"
import jwt_decode from 'jwt-decode'

import { setCurrentToken } from "../src/actions/authentication"

import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'

class AuthLoadingScreen extends Component {
    componentWillMount() {
        const { dispatch, navigation } = this.props
        SecureStore.getItemAsync('tokenAuth').then(token => {
            // todo check token wiht server
            if(isEmpty(token)){
                navigation.navigate("Auth")
            }else{
                const decoded = jwt_decode(token)
                dispatch(setCurrentToken(decoded))
                navigation.navigate("App")
            }
        }).catch(err => {
            console.error(err)
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#fff" />
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