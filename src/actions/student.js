import { ADD_STUDENT, DELETE_STUDENT, SET_STUDENT, GET_STUDENT } from './types'
import { get_errors } from './errors'
import axios from 'axios'
import { ip_server, port, server_url } from '../config'
import * as SecureStore from 'expo-secure-store';

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
export const setStudent = (id, data) => {
    return {
        type: SET_STUDENT,
        id: id,
        payload: data
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
    const { stuId, name, major, faculty, image } = data
    formData.append("stuId", stuId)
    formData.append("name", name)
    formData.append("major", major)
    formData.append("faculty", faculty)
    console.log('====================================');
    console.log(image);
    console.log('====================================');
    if (image != null) {
        formData.append("file", {
            name: "testsendvideo.mp4",
            uri: data.image.uri,
            type: 'video/mp4' //rotation = 90
        })
    }
    const jwtToken = await SecureStore.getItemAsync("tokenAuth")
    try {
        let res = await fetch(`${server_url}/stu`, {
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${jwtToken}`,
            },
            body: formData
        });
        res.json().then(async (data) => {
            await dispatch(addStudent(data))
        })
    } catch (err) {
        console.error(err)
    }
}
export const set_student = async (id, data, props) => {
    let formData = new FormData();
    const { dispatch } = props
    const { stuId, name, major, faculty, image } = data
    formData.append("stuId", stuId)
    formData.append("name", name)
    formData.append("major", major)
    formData.append("faculty", faculty)
    if (image != null)
        formData.append("file", {
            name: "testsendvideo.mp4",
            uri: data.image.uri,
            type: 'video/mp4' //rotation = 90
        })
    const jwtToken = await SecureStore.getItemAsync("tokenAuth")
    let res = await fetch(`${server_url}/stu/${id}`, {
        method: 'put',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${jwtToken}`,
        },
        body: formData
    });
    resData = await res.json()
    await dispatch(setStudent(id, data))
}
export const del_student = (id, props) => {
    const { dispatch } = props
    api.delete(`stu/${id}`).then(res => {
        dispatch(delStudnet(id))
    }).catch(err => {
        dispatch(get_errors(err.response.data))
    })
}