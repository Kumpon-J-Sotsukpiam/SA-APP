import { ADD_STUDENT, DELETE_STUDENT, SET_STUDENT, GET_STUDENT } from './types'
import { get_errors } from './errors'
import axios from 'axios'
import { ip_server, port, server_url } from '../config'


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
export const add_student = async (data, props) => {
    let formData = new FormData();
    const { dispatch } = props
    const { stuId, name, major, faculty } = data
    formData.append("stuId", stuId)
    formData.append("name", name)
    formData.append("major", major)
    formData.append("faculty", faculty)
    formData.append("file", {
        name: "testsendvideo.mp4",
        uri: data.image.uri,
        type: 'video/mp4' //rotation = 90
    })
    let res = await fetch('http://192.168.43.216:3001/stu', {
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYWVlMjQ1YjJjNTdhM2Y2MGUwYjEwZSIsImlhdCI6MTU3Mzg5MzY0Mn0.968ScbblYaOueWH8_L64WciQiCRk3OMTZLrQoOtecU8',
        },
        body: formData
    });
    resData = await res.json()
    await dispatch(addStudent(resData))
}
export const del_student = (id, props) => {
    const { dispatch } = props
    api.delete(`stu/${id}`).then(res => {
        dispatch(delStudnet(id))
    }).catch(err => {
        dispatch(get_errors(err.response.data))
    })
}