import { ADD_CHECKIN,DELETE_CHECKIN,GET_CHECKIN,PUSH_STUDENT_IN_CHECKIN } from '../actions/types'

const initialState = {
    checkIn: []
}

export default (state = initialState, actions) => {
    switch (actions.type) {
        case ADD_CHECKIN:
            return [
                ...state,
                actions.payload
            ]
        case GET_CHECKIN:
            return actions.payload
        
        case PUSH_STUDENT_IN_CHECKIN:
            stateFilter = state.filter(i => i._id != actions.id)
            stateCheckIn = state.filter(i => i._id == actions.id)[0]
            stateCheckIn.studentList = stateCheckIn.studentList.concat(actions.payload)
            return [...stateFilter,stateCheckIn]

        case DELETE_CHECKIN:
            return {

            }
        
        default:
            return state
    }
}