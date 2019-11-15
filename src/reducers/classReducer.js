import { ADD_CLASS, DELETE_CLASS, SET_CLASS, GET_CLASS, CLEAR_CLASS, PUSH_STUDENT_IN_CLASS, PULL_STUDENT_IN_CLASS } from '../actions/types'

const initialState = {
    class: []
}

export default (state = initialState, actions) => {
    switch (actions.type) {
        case ADD_CLASS:
            return [
                ...state,
                actions.payload
            ]
        case GET_CLASS:
            return actions.payload

        case SET_CLASS:
            stateFilter = state.filter(i => i._id == actions.id)[0]
            const { day, group, location, startTime, endTime } = actions.payload
            stateFilter.day = day
            stateFilter.group = group
            stateFilter.location = location
            stateFilter.startTime = startTime
            stateFilter.endTime = endTime
            return state

        case PUSH_STUDENT_IN_CLASS:
            stateFilter = state.filter(i => i._id != actions.payload.classId)
            stateClass = state.filter(i => i._id == actions.payload.classId)[0]
            stateClass.studentList = stateClass.studentList.concat(actions.payload.stuList)
            return [...stateFilter, stateClass]

        case PULL_STUDENT_IN_CLASS:
            stateFilter = state.filter(i => i._id != actions.payload.classId)
            stateClass = state.filter(i => i._id == actions.payload.classId)[0]
            stateClass.studentList = stateClass.studentList.filter(i => i != actions.payload.stuId)
            return [...stateFilter, stateClass]

        case DELETE_CLASS:
            return state.filter((i) => i._id !== actions.id)

        case CLEAR_CLASS:
            return initialState

        default:
            return state
    }
}