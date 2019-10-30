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
        name:semester.semesterName,
        startDate:semester.dateStarts,
        endDate:semester.dateEnds
    }
        
    api.post('semester/',data).then(res => {
        dispatch(addSemester(res.data))
        console.log('this is then after send to server !!! ');
    }).catch(err => {
        console.error(err.response.data);
    })
    //navigation.navigate('Semesters')
    console.log('Semester Name : '+semester.semesterName+'\n'+'Date Start : '+semester.dateStarts+'\n'+'Date End : '+semester.dateEnds)    
}