import { PREDICT_FACE } from '../actions/types'
import { pushCheckIn } from '../actions/checkIn'
import { server_url } from '../config'

export const predict_face = (data, socket) => {
    fetch(server_url + '/predict', {
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        body: data
    })
    //socket.emit('predict', data)
}
export const predicted_face = (props, socket, _id) => {
    const { dispatch } = props
    // socket.on('predicted', data => {
    //     dispatch(pushCheckIn(_id,data))
    // })
}