import {LOADING,LOGIN,ERROR,LOGOUT} from '../Action/ActionType'

const intLogin = {
    loginFlag:false,
    loading:true,
    error: null
}

const logedin = ( state = intLogin, action)=>
{
    switch(action.type)
    {
        case LOGIN: 
            return {
                ...state,
                loginFlag:true,
                loading:false
            }

        case LOGOUT: 
            return {
                ...state,
                loginFlag:false,
                loading:false
            }

        case LOADING:
            return {
                ...state,
                loading:true,                
                loginFlag:false,
                error: null
            }
        case ERROR:
            return {
                ...state,
                loginFlag:false,
                loading:false,
                error: action.payload
            }
        default:
            return {
                ...state
            }
    }
}



export default logedin;