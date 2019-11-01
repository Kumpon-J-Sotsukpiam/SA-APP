import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import semesterReducer from './semesterReducer'
import studentReducer from './studentReducer'
import courseReducer from './courseReducer'
import checkInReducer from './checkInReducer'
import classReducer from './classReducer'
import toDayReducer from './todayReducer'
export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    semester: semesterReducer,
    student: studentReducer,
    checkIn: checkInReducer,
    class: classReducer,
    coures: courseReducer,
    toDay: toDayReducer
})