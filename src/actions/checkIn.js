import { ADD_CHECKIN,DELETE_CHECKIN,GET_CHECKIN} from './types'
import { get_errors } from './errors'
import api from '../modules/api'
// action Backend 
export const getCheckIn = data => {
    return {
        type: GET_CHECKIN,
        payload: data
    }
}
export const addCheckIn = data => {
    return {
        type: ADD_CHECKIN,
        payload: data
    }
}
export const delCheckIn = data => {
    return {
        type: DELETE_CHECKIN,
        payload: data
    }
}
// action FrontEnd
export const get_checkIn = (props) => {
    const { dispatch } = props
    api.get('stu/').then(res => {
        dispatch(getCheckIn(res.data))
    }).catch(err => {
        dispatch(get_errors(err.response.data))
    })
}
export const add_checkIn = (data,props) => {
    const { dispatch } = props
    console.log(data);
    api.post('stu/',data).then(res => {
        dispatch(addCheckIn(res.data))
    }).catch(err => {
        dispatch(get_errors(err.response.data))
    })
}
export const del_checkIn = (id,props) => {
    const { dispatch } = props
    api.get(`check/${id}`).then(res => {
        dispatch(getCheckIn(res.data))
    }).catch(err => {
        dispatch(get_errors(err.response.data))
    })
}