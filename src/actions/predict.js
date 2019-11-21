import { PREDICT_FACE } from '../actions/types'
import { pushCheckIn } from '../actions/checkIn'
import { deep_server_url } from '../config'

export const predict_face = async (data, props) => {
    const { dispatch } = props
    let formData = new FormData()
    formData.append('classId', data.classId)
    formData.append('checkId', data.checkId)
    formData.append('_uid', data._uid)
    formData.append('file', data.file)
    try {
        let res = await fetch(`${deep_server_url}/predict`, {
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        });
        res.json().then(async (res) => {
            if (res.ok) {
                console.log(res.predicted);
                await dispatch(pushCheckIn(data.checkId, res.predicted))
            }
        })
    } catch (err) {
        console.error(err)
    }
}