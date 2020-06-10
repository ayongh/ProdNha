import {USER_INITALIZED,USER_NAME,USER_EMAIL,USER_ERROR} from '../Action/ActionType'

const intialUserName = {
    loading:false,
    FirstName:'',
    LastName:'',
    Email: '',
    Error:''
}

const userInfo = ( state = intialUserName, action)=>
{
    switch(action.type)
    {
        case USER_INITALIZED: 
            return {
                ...state,
                FirstName:action.payload.firstName,
                LastName: action.payload.lastName,
                Email: action.payload.email,
                loading: false,
                Error:''
            }

        case USER_NAME: 
            return {
                ...state,
                FirstName:action.payload.firstName,
                LastName: action.payload.lastName,
                loading: false,
                Error:''
            }

        case USER_EMAIL:
            return {
                ...state,
                Email: action.payload,
                loading: false,
                Error:''
            }

        case USER_ERROR:
            return {
                ...state,
                loading: false,
                Error: action.payload
            }

        default:
            return {
                ...state
            }
    }
}



export default userInfo;