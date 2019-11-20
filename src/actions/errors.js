import { GET_ERRORS,CLEAR_ERRORS } from './types'

export const get_errors = (errors) => {
    return ({
        type: GET_ERRORS,
        payload: errors
    })
}
export const clear_errors = () => {
    return ({
        type:CLEAR_ERRORS
    })
}
export const clearErrors = async (props) => {
    const {dispatch} = props
    await dispatch(clear_errors())
}