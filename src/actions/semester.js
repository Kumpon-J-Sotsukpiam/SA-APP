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
// action FrontEnd
export const get_semester = (props) => {
    const { dispatch } = props
    api.get('semester/').then(res => {
        dispatch(getSemester(res.data))
    }).catch(err => {
        dispatch(get_errors(err.response.data))
    })
}
export const del_semester = (id,props) => {
    const { dispatch } = props
    api.delete(`semester/${id}`).then(res => {
        dispatch(delSemester(id))
    }).catch(err => {
        dispatch(get_errors(err.response.data))
    })
}
export const add_semester = (semester,props) => {
    const { dispatch } = props
    data = {
        name:semester.semesterName,
        startDate:semester.dateStarts,
        endDate:semester.dateEnds
    }
    api.post('semester/',data).then(res => {
        dispatch(addSemester(res.data))
    }).catch(err => {
        console.error(err.response.data);
    })
        
}