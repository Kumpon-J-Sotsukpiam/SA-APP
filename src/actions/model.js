import { PUSH_MODEL,PULL_MODEL } from './types'
import { get_erors } from './errors'
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
export const push_model = async (id, props,cb) => {
    //const { dispatch,navigation } = props
    api.get(`deep_server/model/${id}`).then(res => {
        cb(res.data)
        //dispatch(getModel(res.data))
    }).catch(err => {
        // console.log("this errors")
        // console.log(err.response.data);
        cb(err.response.data)
    })
}
export const pull_model = async (id, props) => {
    const { dispatch } = props
    await api.delete(`deep_server/model/${id}`).then(res => {
        dispatch(delModel())
    })
}
export const train_model = async (id) => {
    data = { classId: id }
    await api.post(`deep_server/model`, data).then(res => {
        console.log(res);
    }).catch(err => {
        console.error(err);
    })
}