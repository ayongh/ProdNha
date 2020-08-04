import React, { Component } from 'react'
import {Link,Redirect} from 'react-router-dom'

import axios from 'axios'
import Recaptcha from 'react-google-invisible-recaptcha';

import { Icon } from 'react-icons-kit'
import {close} from 'react-icons-kit/fa/close'
import {spinner2} from 'react-icons-kit/icomoon/spinner2'


import {connect} from 'react-redux'
import {Actionlogin, ActionLoading, ActionError} from '../../../redux/Action/loginAction' //'../../redux/Action/loginAction'
import {ActionUserIntialize} from '../../../redux/Action/userinfoAction'

class loginModel extends Component
{
    
   

    render()
    {
    
        return (
            <div className="login_model_container">
                <div className="login_model_left_container">
                    <h1>login</h1>
                </div>
                <div className="login_model_right_container">

                </div>
            </div>
        )//return
    }  
}

//access all the state
const mapToState = (state) =>{
    return {
        state:state
    }
}

export default connect(mapToState,{Actionlogin,ActionLoading,ActionError,ActionUserIntialize}) (loginModel);
