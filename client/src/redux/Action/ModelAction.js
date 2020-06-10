import {CLASS_INIT,UPDATE_CLOSE_MODEL} from './ActionType'

export function ActionInitModel(payload) {
    return{
        type:CLASS_INIT,
        payload:payload
    }
}


export function ActionCloseModel() {
    return{
        type:UPDATE_CLOSE_MODEL,
    }
}