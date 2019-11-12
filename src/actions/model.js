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
    }).catch(err => {
        cb(err.response.data)
    })
}
export const pull_model = async (props,cb) => {
    const { dispatch } = props
    api.delete(`deep_server/model/${id}`).then(res => {
        cb(res.data)
    })
}
export const train_model = async (id,cb) => {
    data = { id: id }
    api.post(`deep_server/model`, data).then(res => {
        cb(res.data)
    }).catch(err => {
        console.error(err);
    })
}
export const check_status_model = async (_id,cb) => {
    api.get(`deep_server/model/check/${_id}`).then(res => {
        cb(res.data)
    })
    // .catch(err => {
        
    // })
}
export const popQueue = async (_id,cb) => {
    api.delete(`deep_server/model/pop/${_id}`).then(res => {
        console.log('====================================');
        console.log(res);
        console.log('====================================');
        cb(res.data)
    })
    // .catch(err => {
        
    // })
}