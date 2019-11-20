import { SET_CURRENT_TOKEN, UNSET_CURRENT_TOKEN } from './types'
import { get_errors } from './errors'
import api from '../modules/api'
import * as SecureStore from 'expo-secure-store';

export const setCurrentToken = (decoded) => {
    return {
        type: SET_CURRENT_TOKEN,
        payload: decoded
    }
}
export const unSetCurrentToken = () => {
    return {
        type: UNSET_CURRENT_TOKEN
    }
}

// action FrontEnd
export const registerUser = async (user, props) => {
    const { navigation, dispatch } = props
    try {
        let res = await api.post('auth/register', user)
            if (res.data.success) {
                const { token } = res.data
                await SecureStore.setItemAsync('tokenAuth', token)
                await navigation.navigate('AuthLoading')
            }
    } catch (err) {
        dispatch(get_errors(err.response.data))
}
}

export const changePassword = (password) => dispatch => {
    // todo
}
export const loginUser = async (user, props) => {
    const { navigation, dispatch } = props
    try {
        let res = await api.post('auth/login', user)
        if (res.data.success) {
            const { token } = res.data
            await SecureStore.setItemAsync('tokenAuth', token)
            await navigation.navigate('AuthLoading')
        }
    } catch (err) {
        dispatch(get_errors(err.response.data))
    }
}
export const loginFacebook = async (user, props) => {
    const { navigation, dispatch } = props
    try {
        let res = await api.post('auth/facebook', user)
        if (res.data.success) {
            const { token } = res.data
            await SecureStore.setItemAsync('tokenAuth', token)
            await navigation.navigate('AuthLoading')
        }
    } catch (err) {
        dispatch(get_errors(err.response.data))
    }
}
export const logoutUser = (props) => {
    const { navigation } = props
    SecureStore.deleteItemAsync('tokenAuth').then(res => {
        navigation.navigate('AuthLoading')
    }).catch(err => {
        // todo dispatch errors
    })
}