import { ADD_STUDENT,DELETE_STUDENT,SET_STUDENT,GET_STUDENT} from './types'
import { get_errors } from './errors'
import api from '../modules/api'
// action Backend 
export const getStudent = data => {
    return {
        type: GET_STUDENT,
        payload: data
    }
}
export const addStudent = data => {
    return {
        type: ADD_STUDENT,
        payload: data
    }
}
// action FrontEnd
export const get_student = (props) => {
    const { dispatch } = props
    api.get('stu/').then(res => {
        dispatch(getStudent(res.data))
    }).catch(err => {
        dispatch(get_errors(err.response.data))
    })
}
export const add_student = (student,props) => {
    const { dispatch,navigation } = props
    // format data
    data = {
        // name:semester.semesterID,
        // startDate:semester.dateStarts,
        // endDate:semester.dateEnds
    }
    api.post('stu/',data).then(res => {
        dispatch(addStudent(res.data))
        //navigation.navigate('Semesters')
    })
}