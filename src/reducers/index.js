import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import semesterReducer from './semesterReducer'
import studentReducer from './studentReducer'

export default combineReducers({
    auth:authReducer,
    errors:errorReducer,
    semester:semesterReducer,
    student:studentReducer

})