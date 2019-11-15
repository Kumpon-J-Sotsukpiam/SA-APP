import { ADD_STUDENT, DELETE_STUDENT, SET_STUDENT, GET_STUDENT } from './types'
import { get_errors } from './errors'
import axios from 'axios'
import {ip_server,port, server_url} from '../config'


import api from '../modules/api'
// action Backend 
export const getStudent = data => {
    return {
        type: GET_STUDENT,
        payload: data
    }
}
export const addStudent = data => {
    return {
        type: ADD_STUDENT,
        payload: data
    }
}
export const delStudnet = (id) => {
    return {
        type: DELETE_STUDENT,
        id: id
    }
}
// action FrontEnd
export const get_student = (props) => {
    const { dispatch } = props
    api.get('stu/').then(res => {
        dispatch(getStudent(res.data))
    }).catch(err => {
        dispatch(get_errors(err.response.data))
    })
}
export const add_student = (data, props) => {
    const { dispatch } = props
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    let formdata = new FormData()
    formdata.append("stuId","5905100006")
    formdata.append("name","5905100006")
    formdata.append("major","5905100006")
    formdata.append("faculty","5905100006")
    formdata.append("image",{"uri":data.image.uri,"type":data.image.type})
    console.log('====================================');
    console.log(formdata);
    console.log('====================================');
    api.post('stu/',formdata,{headers:{'Content-Type':'application/x-www-form-urlencoded',}}).then(res => {
        dispatch(addStudent(res.data))
    }).catch(err => {
        console.error(err);
    })
}
export const del_student = (id, props) => {
    const { dispatch } = props
    api.delete(`stu/${id}`).then(res => {
        dispatch(delStudnet(id))
    }).catch(err => {
        dispatch(get_errors(err.response.data))
    })
}