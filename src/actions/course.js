import { ADD_COURSE,GET_COURSE,SET_COURSE,DELETE_COURSE} from './types'
import { get_erors } from './errors'
import api from '../modules/api'
// action Backend 
export const getCourse = data => {
    return {
        type: GET_COURSE,
        payload: data
    }
}
export const addCourse = data => {
    return {
        type: ADD_COURSE,
        payload: data
    }
}

// action FrontEnd
export const get_course = (props) => {
    const { dispatch } = props
    api.get('cour/').then(res => {
        console.log(`Check Array in Action ${Array.isArray(res.data)}`);
        dispatch(getCourse(res.data))
    }).catch(err => {
        dispatch(get_errors(err.response.data))
    })
}
export const add_course = (course,props) => {
    const { dispatch,navigation } = props
    // format data
    data = {
      //  name:semester.semesterID,
       // startDate:semester.dateStarts,
       // endDate:semester.dateEnds
    }
    api.post('cour/',data).then(res => {
        dispatch(addCourse(res.data))
       // navigation.navigate('Semesters')
    })
}