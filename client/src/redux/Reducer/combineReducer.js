import loginReducer from './ReducerLogin'
import userinfoReducer from './ReducerUserInfo'
import classReducer from './ReducerClass'

import {combineReducers} from 'redux'


const allReducers = combineReducers({
    login: loginReducer,
    userInfo: userinfoReducer,
    Model: classReducer
})

export default allReducers;