import {CLASS_INIT,UPDATE_CLOSE_MODEL} from '../Action/ActionType'

const intClass = {
   class:null,
   modelState: false
}

const Class = ( state = intClass, action)=>
{
    switch(action.type)
    {
        case CLASS_INIT: 
            return {
                ...state,
                class: action.payload,
                modelState: true
            }

        case UPDATE_CLOSE_MODEL: 
            return {
                ...state,
                class: null,
                modelState: false
            }

        default:
            return {
                ...state
            }
    }
}



export default Class;