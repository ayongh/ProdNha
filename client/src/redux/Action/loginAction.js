import {LOGIN,LOADING,ERROR} from './ActionType'

export function Actionlogin() {
    return{
        type:LOGIN,
    }
}

export function ActionLoading() {
    return{
        type:LOADING,
    }
}

export function ActionError(payload) {
    return{
        type:ERROR,
        payload:payload
    }
}

