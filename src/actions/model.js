import { LOAD_MODEL, DELETE_MODEL } from './types'
import { get_erors } from './errors'
import api from '../modules/api'
// action Backend 
export const getModel = data => {
    return {
        type: LOAD_MODEL,
        payload: data
    }
}

export const delModel = () => {
    return {
        type: DELETE_MODEL
    }
}
// action FrontEnd
export const get_model = async (id, props) => {
    const { dispatch } = props
    await api.get(`deep_server/model/${id}`).then(res => {
        dispatch(getModel(res.data))
    })
    // .catch(err => {
    //     dispatch(get_errors(err.response.data))
    // })
}
export const del_model = async (id, props) => {
    const { dispatch } = props
    await api.delete(`deep_server/model/${id}`).then(res => {
        dispatch(delModel())
    })
    // .catch(err => {
    //     dispatch(get_errors(err.response.data))
    // })
}
export const train_model = async (id) => {
    data = { classId: id }
    await api.post(`deep_server/model`, data).then(res => {
        console.log(res);
    }).catch(err => {
        console.error(err);
    })
}