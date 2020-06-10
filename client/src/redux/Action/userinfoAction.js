import {USER_INITALIZED, USER_NAME,USER_EMAIL,USER_ERROR} from './ActionType'

export function ActionUserIntialize(payload) {
    return{
        type:USER_INITALIZED,
        payload:payload
    }
}

export function ActionUserUpdateName(payload) {
    return{
        type:USER_NAME,
        payload:payload
    }
}

export function ActionUserUpdateEmail(payload) {
    return{
        type:USER_EMAIL,
        payload:payload
    }
}

export function ActionUserError(payload) {
    return{
        type:USER_ERROR,
        payload:payload
    }
}

