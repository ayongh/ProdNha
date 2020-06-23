import {LOGIN,LOADING,ERROR,LOGOUT} from './ActionType'

export function Actionlogin() {
    return{
        type:LOGIN
    }
}

export function Actionlogout() {
    return{
        type:LOGOUT
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

