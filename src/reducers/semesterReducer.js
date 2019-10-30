import { ADD_SEMESTER,GET_SEMESTER,DELETE_SEMESTER,SET_SEMESTER } from '../actions/types'
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
            return  state.filter((data, i) => i !== action.id)
            
        case SET_SEMESTER:
            return {

            }
        default: return state
    }
};