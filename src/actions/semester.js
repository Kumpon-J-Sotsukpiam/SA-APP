import { ADD_SEMESTER,GET_SEMESTER,DELETE_SEMESTER,SET_SEMESTER} from './types'
import { get_erors } from './errors'
import api from '../modules/api'
// action Backend 
export const getSemester = semester => {
    return {
        type: GET_SEMESTER,
        payload: semester
    }
}
export const addSemester = semester => {
    return {
        type: ADD_SEMESTER,
        payload: semester
    }
}
export const delSemester= (id) => {
    return {
        type: DELETE_SEMESTER,
        id: id
    }
}
export const setSemester = (id,data) => {
    return {
        type:SET_SEMESTER,
        id:id,
        payload:data
    }
}
//action FrontEnd
export const get_semester = (props) => {
    const { dispatch } = props
    api.get('semester/').then(res => {
        dispatch(getSemester(res.data))
    }).catch(err => {
        dispatch(get_errors(err.response.data))
    })
}

export const del_semester = async (id,props) => {
    const { dispatch } = props
    try {
        let res = await api.delete(`semester/${id}`)
            await dispatch(delSemester(id))
    } catch (err) {
            await dispatch(get_errors(err.response.data))
    }
}

export const set_semester = async (id,data,props) => {
    const{dispatch} = props
    const res = await api.put(`semester/${id}`,data)
    await dispatch(setSemester(id,data))
}

export const add_semester = async (semester,props) => {
    const { dispatch } = props
    data = {
        name:semester.semesterName,
        startDate:semester.dateStarts,
        endDate:semester.dateEnds
    }
    try {
        let res = await api.post('semester/',data)
            await dispatch(addSemester(res.data))
    } catch (err) {
        console.error(err.response.data);
    }
        
}
