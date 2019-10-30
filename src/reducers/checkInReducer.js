import { ADD_CHECKIN,DELETE_CHECKIN,GET_CHECKIN } from '../actions/types'

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
            
        case DELETE_CHECKIN:
            return {

            }
        
        default:
            return state
    }
}