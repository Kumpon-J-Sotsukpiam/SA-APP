import { PREDICT_FACE } from '../actions/types'
import { pushCheckIn } from '../actions/checkIn'

export const predict_face = async (data, socket) => {
    let res = await fetch(`http://192.168.43.216:5000/predict`, {
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: data
    });
    // res.json().then(async (data) => {
    //     await dispatch(addStudent(data))
    // })
    //socket.emit('predict', data)
}
export const predicted_face = (props, socket, _id) => {
    const { dispatch } = props
    // socket.on('predicted', data => {
    //     dispatch(pushCheckIn(_id,data))
    // })
}