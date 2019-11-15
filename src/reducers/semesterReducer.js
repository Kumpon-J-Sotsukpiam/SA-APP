import { ADD_SEMESTER, GET_SEMESTER, DELETE_SEMESTER, SET_SEMESTER } from '../actions/types'
import isEmpty from '../modules/is-empty'

const initialState = {
    semester: []
}

export default (state = initialState, actions) => {
    switch (actions.type) {
        case ADD_SEMESTER:
            return [
                actions.payload,
                ...state
            ]
        case GET_SEMESTER:
            return actions.payload

        case DELETE_SEMESTER:
            return state.filter((i) => i._id !== actions.id)

        case SET_SEMESTER:
            stateFilter = state.filter(i => i._id == actions.id)[0]
            const { name, startDate, endDate } = actions.payload
            stateFilter.name = name
            stateFilter.startDate = startDate
            stateFilter.endDate = endDate
            return state
        default: return state
    }
};