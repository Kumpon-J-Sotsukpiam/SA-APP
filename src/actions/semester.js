import { ADD_SEMESTER,GET_SEMESTER,DELETE_SEMESTER,SET_SEMESTER, GET_STUDENT} from './types'
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
// action FrontEnd
export const get_semester = (props) => {
    const { dispatch } = props
    api.get('semester/').then(res => {
        console.log(`Check Array in Action ${Array.isArray(res.data)}`);
        dispatch(getSemester(res.data))
    }).catch(err => {
        dispatch(get_errors(err.response.data))
    })
}
export const add_semester = (semester,props) => {
    const { dispatch,navigation } = props
    // format data
    data = {
        name:semester.semesterID,
        startDate:semester.dateStarts,
        endDate:semester.dateEnds
    }
    api.post('semester/',data).then(res => {
        dispatch(addSemester(res.data))
        navigation.navigate('Semesters')
    })
}