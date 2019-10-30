import { ADD_COURSE,DELETE_COURSE,SET_COURSE, GET_COURSE} from '../actions/types'

const initialState = {}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_COURSE:
            return [
                ...state,
                actions.payload
            ]
        case GET_COURSE:
            return actions.payload
            
        case SET_COURSE:
            return {

            }
        case DELETE_COURSE:
            return {

            }
        default:
            return state
    }
}