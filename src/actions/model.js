import { PUSH_MODEL, PULL_MODEL } from './types'
import { get_erors } from './errors'
import { addCheckIn } from '../actions/checkIn'
import api from '../modules/api'
// action Backend 
export const pushModel = data => {
    return {
        type: PUSH_MODEL,
        payload: data
    }
}

export const pullModel = () => {
    return {
        type: PULL_MODEL
    }
}
// action FrontEnd
export const push_model = async (id, props, cb) => {
    const { dispatch } = props
    try {
        const res = await api.get(`deep_server/model/${id}`)
        await dispatch(addCheckIn(res.data.checkIn))
        cb(res.data)
    } catch (err) {
        cb(err.response.data)
    }
}
export const pull_model = async (props, cb) => {
    const { dispatch } = props
    try {
        const res = await api.delete(`deep_server/model/${id}`)
        cb(res.data)
    } catch (err) {

    }
}
export const train_model = async (id, cb) => {
    data = { id: id }
    try {
        const res = await api.post(`deep_server/model`, data)
        cb(res.data)
    } catch (err) {

    }
}
export const check_status_model = async (_id, cb) => {
    try {
        const res = await api.get(`deep_server/model/check/${_id}`)
        cb(res.data)
    } catch (err) {

    }
}
export const popQueue = async (_id, cb) => {
    try {
        const res = await api.delete(`deep_server/model/pop/${_id}`)
        cb(res.data)
    } catch (err) {

    }
}