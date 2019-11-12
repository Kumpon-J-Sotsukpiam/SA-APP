import { PREDICT_FACE } from '../actions/types'
import { pushCheckIn } from '../actions/checkIn'

export const predict_face = (data, socket) => {
    socket.emit('predict', data)
}
export const predicted_face = (props, socket, _id) => {
    const { dispatch } = props
    socket.on('predicted', data => {
        dispatch(pushCheckIn(_id,data))
    })
}