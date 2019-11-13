import { ADD_CHECKIN,DELETE_CHECKIN,GET_CHECKIN,PUSH_STUDENT_IN_CHECKIN} from './types'
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
export const pushCheckIn = (id,data) => {
    return {
        type:PUSH_STUDENT_IN_CHECKIN,
        id:id, // Object Id of CheckIn (_id)
        payload:data
    }
}
// action FrontEnd
export const get_checkIn = (props) => {
    const { dispatch } = props
    api.get('checkIn/').then(res => {
        dispatch(getCheckIn(res.data))
    }).catch(err => {
        dispatch(get_errors(err.response.data))
    })
}
export const add_checkIn = (data,props) => {
    const { dispatch } = props
    api.post('checkIn/',data).then(res => {
        dispatch(addCheckIn(res.data))
    }).catch(err => {
        dispatch(get_errors(err.response.data))
    })
}
export const push_student_in_checkIn = (data,props) => {
    const { dispatch } = props
    api.put(`checkIn/stu/${data.checkInId}`,{stuList:data.stuList}).then(res => {
        res.data.data.map(v => {
            dispatch(pushCheckIn(data.checkInId,v))
        })
    })
}
export const del_checkIn = (id,props) => {
    const { dispatch } = props
    api.get(`checkIn/${id}`).then(res => {
        dispatch(getCheckIn(res.data))
    }).catch(err => {
        dispatch(get_errors(err.response.data))
    })
}