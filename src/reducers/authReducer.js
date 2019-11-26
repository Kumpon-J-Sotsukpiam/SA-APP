import { SET_CURRENT_TOKEN, UNSET_CURRENT_TOKEN } from '../actions/types'
import isEmpty from '../modules/is-empty'

const initialState = {
    isAuthenticated: false,
    user: {}
}

export default (state = initialState, actions) => {
    switch (actions.type) {
        case SET_CURRENT_TOKEN:
            return {
                //...state,
                isAuthenticated: !isEmpty(actions.payload),
                user: actions.payload
            }
        case UNSET_CURRENT_TOKEN:
            return initialState
        default:
            return state
    }
}