import { GET_ERRORS } from './types'

export const get_errors = (errors) => {
    return ({
        type: GET_ERRORS,
        payload: errors
    })
}