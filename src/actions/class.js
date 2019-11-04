import { ADD_CLASS,DELETE_CLASS,SET_CLASS,GET_CLASS,CLEAR_CLASS,GET_TODAY,PUSH_STUDENT_IN_CLASS} from './types'
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
export const clearClass = () => {
    return {
        type: CLEAR_CLASS
    }
}
export const getToday = data => {
    return{
        type: GET_TODAY,
        payload:data
    }
}
export const pushStudentInClass = data => {
    return {
        type:PUSH_STUDENT_IN_CLASS,
        payload:data
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
export const add_class = (data,props) => {
    const { dispatch,navigation } = props
    api.post('clas/',data).then(res => {
        dispatch(addClass(res.data))
    }).catch(err => {
        dispatch(get_errors(err.response.data))
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
export const clear_class = (props) => {
    const {dispatch} = props
    dispatch(clearClass())
}
export const get_toDay = (props) => {
    const {dispatch} = props
    api.get('clas/all').then(res => {
      dispatch(getToday(res.data))
    })
}
export const push_student_in_class = (data,props) => {
    const {dispatch} = props
    api.put(`clas/stu/${data.classId}`,{stuList:data.stuList}).then(res => {
        dispatch(pushStudentInClass(data))
    }).catch(err => {
        console.log(err);   
    })
}