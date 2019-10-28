import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import semesterReducer from './semesterReducer'

export default combineReducers({
    auth:authReducer,
    errors:errorReducer,
    semester:semesterReducer
})