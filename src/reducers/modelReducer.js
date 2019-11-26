import { PUSH_MODEL,PULL_MODEL } from '../actions/types'
import isEmpty from '../modules/is-empty'

const initialState = {
    semester: {
        status:false,
        _id:null
    }
}

export default (state = initialState, actions) => {
    switch (actions.type) {
        case PUSH_MODEL:
            return {
                status:true,
                _id:actions.payload
            }

        case PULL_MODEL:
            return initialState.semester

        default: return state
    }
};