import React, { Component } from 'react'
import Recaptcha from 'react-google-invisible-recaptcha';
import { Icon } from 'react-icons-kit'
import {close} from 'react-icons-kit/fa/close'
import {Link, Redirect} from 'react-router-dom'

import {connect} from 'react-redux'
import {Actionlogin, ActionLoading, ActionError} from '../../redux/Action/loginAction'
import {ActionUserIntialize} from '../../redux/Action/userinfoAction'

import axios from 'axios'

class login extends Component
{
    
    constructor(props)
    {
        super(props)

        this.state = {
            username:null,
            password:null,
            userError: null,

            safaribrowser:false,

            value: '' 
            
        }
        this.onResolved = this.onResolved.bind( this );
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    
    componentDidMount()
    {
        var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 && navigator.userAgent && navigator.userAgent.indexOf('CriOS') === -1 &&navigator.userAgent.indexOf('FxiOS') === -1;
        if (isSafari) 
        {
            this.setState({
                safaribrowser:true
            })
        }
    }


    handleSubmit = (e)=>
    {
        e.preventDefault();
        
        if(this.state.username !== null && this.state.password !==null)
        {
            this.setState({
                userError:null
            })
            this.recaptcha.execute();
        }
        else
        {
            this.setState(
                {
                    userError:"please make sure USERNAME and PASSWORD is filled"
                }
            )
            this.recaptcha.reset();

        }

    }

    closealert(){
        document.getElementById("alert").style.display="none"
    }

    safariAlert()
    {
        var alert = null;
        if(this.state.safaribrowser === true)
        {alert =  <div class="alert warning" id="alert"> <span class="closebtn" onClick={()=>this.closealert()}>&times;</span> <strong>Warning!</strong> Please turn off the cookie blocker while using this application. to turn off the cookie blocker follow the instruction below 
            <br/><strong>Iphone</strong>
            <ol>
                <li>Setting > Safari > Prevent Cross-Site Tracking (Turn this setting off) </li>
            </ol>
            <br/><strong>Laptop</strong>
            <ol>
                <li>Safari > Preferences > Privacy > prevent cross-site tracking (uncheck this box) </li>
            </ol> 
      </div>}
        
        return alert
    }

    //When recaptcha is resolved
    onResolved() {

        const payload = {
            email:this.state.username,
            password:this.state.password,
            token:this.recaptcha.getResponse()
        }

        axios.post('/recaptcha', payload, {validateStatus: function (status) { return status >= 200 && status < 600; }}).then( res =>{     
            if(res.status === 200)
            {
                axios.post('/user/login', payload, {validateStatus: function (status) { return status >= 200 && status < 600; }}).then( res =>{
                    if(res.status === 200)
                    {   
                        localStorage.setItem("watchhistory", JSON.stringify( res.data.message.watchHistory))
                        this.props.Actionlogin()
                        this.props.ActionUserIntialize(res.data.message)

                    }
                    else
                    {
                        this.recaptcha.reset();
                        this.props.ActionError(res.data.errors)
                    }
                })
    
            }
            else
            {
                this.recaptcha.reset();
                this.props.ActionError(res.data.errors)
            }
        })
    }

    render()
    {
        //Checks error and display it errorElement
        let errorElement = this.state.userError
        
        if(this.state.userError !== null)
        {
            errorElement = <p style={{color:"red", display:"flex"}}><Icon icon={close}></Icon>{this.state.userError}</p>
        }

        if(this.props.state.login.error)
        {
            errorElement = <p style={{color:"red", display:"flex"}}><Icon icon={close}></Icon>{this.props.state.login.error}</p>
        }
            
        return (
            <div className="loginEntire">
                {this.safariAlert()}

                <div className="login_body">
                <div className="login_left">
                    <div className="login_left_outer_container">
                        <h3>Create New User</h3>
                        <label>
                            If you dont have a user name and password created please 
                            do so now by clicking the button below. Thank you!
                        </label>
                        <Link to={"/signup"}>
                            <button type="button" className="signup btn" href="/signup">Sign up</button>
                        </Link>
                    </div>
                </div>
                <div className="login_right">
                    <div className="login_right_outer_container">
                        <div className="login_right_inner_container">
                            <h2>Login</h2>
    
                            <form onSubmit={this.handleSubmit}>
                                <div className="login_login_right_inner_container_elem">
                                    <label className="login_label">User Name</label>
                                    <input id="username" onChange={this.handleChange}  className="txt" type="text" placeholder="User Name"></input>
                                </div>
                                
                                <div className="login_login_right_inner_container_elem">
                                    <label className="login_label">password</label>
                                    <input id="password" onChange={this.handleChange}  className="txt" type="password" placeholder="password"></input>
                                </div>
                                {errorElement}
                                <button id="submit_btn" className="btn" type="submit">Login</button>
                            </form>
                            
                            <p> I forgot my <Link to={"/pswdreset"}>password</Link></p>
                        </div>
                    </div>
                    
                </div>
                <Recaptcha
                ref={ ref => this.recaptcha = ref }
                //**************************************************DANGER remove site key to saftey *********************************************************************
                sitekey='6LdhWNsUAAAAAKIeVaOGdY3HCKy5Siva9emmZDl6'
                onResolved={ this.onResolved } />
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

export default connect(mapToState,{Actionlogin,ActionLoading,ActionError,ActionUserIntialize}) (login);
