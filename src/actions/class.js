import { ADD_CLASS,DELETE_CLASS,SET_CLASS,GET_CLASS} from './types'
import { get_errors } from './errors'
import api from '../modules/api'
// action Backend 
export const getClass = data => {
    return {
        type: GET_CLASS,
        payload: data
    }
}
export const addClass = data => {
    return {
        type: ADD_CLASS,
        payload: data
    }
}
export const delClass = id => {
    return {
        type: DELETE_CLASS,
        id: id
    }
}
export const setClass = data => {
    return {
        type: SET_CLASS,
        payload: data
    }
}
// action FrontEnd
export const get_class = (id,props) => {
    const { dispatch } = props
    api.get(`clas/${id}`).then(res => {
        dispatch(getClass(res.data))
    }).catch(err => {
        dispatch(get_errors(err.response.data))
    })
}
export const add_class = (data,props,cb) => {
    const { dispatch,navigation } = props
    api.post('clas/',data).then(res => {
        dispatch(addClass(res.data))
    }).catch(err => {
        dispatch(get_errors(err.response.data))
        cb(err.response.data)
    })
}
export const del_class = (id,props) => {
    const { dispatch } = props
    api.delete(`clas/${id}`).then(res => {
        dispatch(delClass(id))
    }).catch(err => {
        dispatch(get_errors(err.response.data))
    })
}