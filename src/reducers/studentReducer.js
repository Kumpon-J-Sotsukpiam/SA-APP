import { ADD_STUDENT, DELETE_STUDENT, SET_STUDENT, GET_STUDENT } from '../actions/types'

const initialState = {
    student: []
}

export default (state = initialState, actions) => {
    switch (actions.type) {
        case ADD_STUDENT:
            return [
                ...state,
                actions.payload
            ]
        case GET_STUDENT:
            return actions.payload

        case SET_STUDENT:
            stateFilter = state.filter(i => i._id == actions.id)[0]
            const { name, stuId, major, faculty } = actions.payload
            stateFilter.stuId = stuId
            stateFilter.name = name
            stateFilter.major = major
            stateFilter.faculty = faculty
            return state

        case DELETE_STUDENT:
            return state.filter((i) => i._id !== actions.id)
        default:
            return state
    }
}