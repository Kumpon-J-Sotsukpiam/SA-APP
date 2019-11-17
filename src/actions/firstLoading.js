import { GET_FIRST,RESET } from './types'
import { get_erors } from './errors'
import { getSemester } from './semester'
import { getCourse } from './course'
import { getClass } from './class'
import { getStudent } from './student'
import { getCheckIn } from './checkIn'
import api from '../modules/api'

// action FrontEnd
export const get_first = async (props) => {
    const { dispatch } = props
    await api.get('opt/').then(res => {
        dispatch(getSemester(res.data.semester))
        dispatch(getCourse(res.data.course))
        dispatch(getClass(res.data.class))
        dispatch(getStudent(res.data.student))
        dispatch(getCheckIn(res.data.checkIn))
    })
}
export const reset = async (props) => {
    const {dispatch} = props
    await api.delete('opt/').then(res => {
        console.log('====================================');
        console.log(res);
        console.log('====================================');
    })
}