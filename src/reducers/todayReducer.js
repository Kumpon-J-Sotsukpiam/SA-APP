import { ADD_TODAY,DELETE_TODAY,SET_TODAY, GET_TODAY} from '../actions/types'

const initialState = {
    today: []
}

export default (state = initialState, actions) => {
    switch (actions.type) {
        case ADD_TODAY:
            return [
                ...state,
                actions.payload
            ]
        case GET_TODAY:
            return actions.payload
            
        case SET_TODAY:
            return {

            }
        case DELETE_TODAY:
            return  state.filter((i) => i._id !== actions.id)
        
        default:
            return state
    }
}