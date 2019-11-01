import { ADD_CLASS,DELETE_CLASS,SET_CLASS, GET_CLASS,CLEAR_CLASS} from '../actions/types'

const initialState = {
    class:[]
}

export default (state = initialState, actions) => {
    switch (actions.type) {
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
            return state.filter((i) => i._id !== actions.id)

        case CLEAR_CLASS:
            return initialState

        default:
            return state    
    }
}