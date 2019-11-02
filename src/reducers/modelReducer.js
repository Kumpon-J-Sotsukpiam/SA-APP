import { LOAD_MODEL,DELETE_MODEL } from '../actions/types'
import isEmpty from '../modules/is-empty'

const initialState = {
    semester: {
        status:false,
        name:''
    }
}

export default (state = initialState, actions) => {
    switch (actions.type) {
        case LOAD_MODEL:
            return {
                status:true,
                name:actions.payload
            }

        case DELETE_MODEL:
            return initialState.semester

        default: return state
    }
};