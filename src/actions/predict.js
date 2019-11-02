import { PREDICT_FACE } from '../actions/types'

export const predict_face = (data,socket) => {
    socket.emit('predict',data)
}
export const predicted_face = (props,socket) => {
    socket.on('predicted',data => {
        console.log(data)
    })
}