import { ADD_STUDENT,DELETE_STUDENT,SET_STUDENT,GET_STUDENT } from '../actions/types'

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
            return {

            }
        case DELETE_STUDENT:
            return {

            }
        default:
            return state
    }
}