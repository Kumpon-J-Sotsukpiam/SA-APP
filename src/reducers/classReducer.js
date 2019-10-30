import { ADD_CLASS,DELETE_CLASS,SET_CLASS, GET_CLASS} from '../actions/types'

const initialState = {}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_CLASS:
            return [
                ...state,
                actions.payload
            ]
        case GET_CLASS:
            return actions.payload
            
        case SET_CLASS:
            return {

            }
        case DELETE_CLASS:
            return {

            }
        default:
            return state
    }
}