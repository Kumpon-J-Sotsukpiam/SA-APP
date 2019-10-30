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
export const delClass = data => {
    return {
        type: DELETE_CLASS,
        payload: data
    }
}
export const setClass = data => {
    return {
        type: SET_CLASS,
        payload: data
    }
}
// action FrontEnd
export const get_class = (props) => {
    const { dispatch } = props
    api.get('clas/').then(res => {
        dispatch(getClass(res.data))
    }).catch(err => {
        dispatch(get_errors(err.response.data))
    })
}
export const add_class = (Class,props) => {
    const { dispatch,navigation } = props
    // format data
    data = {
        // name:semester.semesterID,
        // startDate:semester.dateStarts,
        // endDate:semester.dateEnds
    }
    api.post('clas/',data).then(res => {
        dispatch(addClass(res.data))
        //navigation.navigate('Semesters')
    })
}
export const del_class = (id,props) => {
    const { dispatch } = props
    api.get(`class/${id}`).then(res => {
        dispatch(getClass(res.data))
    }).catch(err => {
        dispatch(get_errors(err.response.data))
    })
}