import { ADD_COURSE, GET_COURSE, SET_COURSE, DELETE_COURSE } from './types'
import { get_erors } from './errors'
import api from '../modules/api'
// action Backend 
export const getCourse = data => {
    return {
        type: GET_COURSE,
        payload: data
    }
}
export const addCourse = data => {
    return {
        type: ADD_COURSE,
        payload: data
    }
}
export const delCourse = (id) => {
    return {
        type: DELETE_COURSE,
        id: id
    }
}
export const setCourse = (id,data) => {
    return {
        type:SET_COURSE,
        id:id,
        payload:data
    }
}
// action FrontEnd
export const get_course = (id, props) => {
    const { dispatch } = props
    api.get(`cour/${id}`).then(res => {
        dispatch(getCourse(res.data))
    }).catch(err => {
        dispatch(get_errors(err.response.data))
    })
}
export const set_course = async (id,data,props) => {
    const { dispatch } = props
    const res = await api.put(`cour/${id}`,data)
    await dispatch(setCourse(id,data))
}
export const add_course = (data, props) => {
    const { dispatch, navigation } = props
    data = {
        _id: data.semesterId,
        name: data.courseId,
    }
    api.post(`cour/`, data).then(res => {
        dispatch(addCourse(res.data))
    })
}
export const del_course = (id, props) => {
    const { dispatch } = props
    api.delete(`cour/${id}`).then(res => {
        dispatch(delCourse(id))
    }).catch(err => {
        dispatch(get_errors(err.response.data))
    })
}