import { GET_ERRORS,CLEAR_ERRORS } from '../actions/types'

const initialState = {}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ERRORS:
            return action.payload
        case CLEAR_ERRORS:
            console.log('this clear errors');
            
            return initialState
        default:
            return state
    }
}