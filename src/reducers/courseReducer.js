import { ADD_COURSE, DELETE_COURSE, SET_COURSE, GET_COURSE } from '../actions/types'

const initialState = {
    course: []
}

export default (state = initialState, actions) => {
    switch (actions.type) {
        case ADD_COURSE:
            return [
                ...state,
                actions.payload
            ]
        case GET_COURSE:
            return actions.payload

        case SET_COURSE:
            stateFilter = state.filter(i => i._id == actions.id)[0]
            const { name } = actions.payload
            stateFilter.name = name
            return state

        case DELETE_COURSE:
            return state.filter((i) => i._id !== actions.id)

        default:
            return state
    }
}