import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Icon } from 'react-icons-kit'
import {close} from 'react-icons-kit/fa/close'

import Recaptcha from 'react-google-invisible-recaptcha';
import {recaptchaValidation} from '../../redux/Action/RecaptchaVelidation' //'../Action/RecaptchaVelidation'

export default class signupEmailValidation extends Component 
{
    constructor(prop)
    {
        super(prop)

        this.state = {
            userVerificationCode:'',              //User inpute validation code
        
            error:null,                         //Server error

            singleServererror:'',

            Internalerror:'',
             
            redirectlogin: false                //Page Redirected
        }
        this.onResolved = this.onResolved.bind( this );
    }

    //Stores the value
    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    //Validates the user name and passowrd and provides with token to login
    submit= (e) =>
    {
        e.preventDefault();
        this.formValidation();

        if(this.state.userVerificationCode !== '')
        {
            this.recaptcha.execute();
        }
        else
        {
            this.recaptcha.reset();
        }
        
    }

    onResolved()
    {
        if(recaptchaValidation(this.recaptcha.getResponse()))
        {
            var data  = {
                "fname": this.props.firstName,
                "lname": this.props.lastName,
                "email" : this.props.email,
                "password": this.props.password,
                "hasedVerifedCode": this.props.validationCode,
                "userInputedCode":this.state.userVerificationCode
            }
    
            axios.post('/user/signup', data).then( async res =>{
                
                if(res.status === 200)
                {
                    await this.setState({
                        redirectlogin:true
                    })
    
                }
                else if( res.status === 403)
                {
                    await this.setState({
                        error: res.data.errors
                    })
                }
                else
                {
                    await this.setState({
                        singleServererror: res.data.error
                    })
                }
               
    
           
            }).catch(err =>{
                this.setState({Internalerror:"There is Internal error that occured"})
            })
        }
        else
        {
            this.setState({Internalerror:"Recaptcha error login as human"})
        }
        
    }

    formValidation()
    {
        if(this.state.userVerificationCode === '')
        {
            document.getElementById('userVerificationCode').style.borderColor = "red";
            document.getElementById('userVerificationCode').style.borderWidth = "1px";
            this.setState({
                internallerror: "Validation Code field cannot be empty"
            })
        }
        else
        {
            document.getElementById('userVerificationCode').style.borderColor = "black";
            document.getElementById('userVerificationCode').style.borderWidth = "1px";
        }
    }
    
    render() 
    {    
        if(this.state.redirectlogin === true)
        {
            return <Redirect to="/Homepage"/>
        }

        //multiple errors from server
        const errorMSG = this.state.error
        let errorMessage;
        if (errorMSG !== null)
        {
            errorMessage = errorMSG.map((ErrMSG, i)=>
                <p key={i} style={{color:"red", display:"flex"}}><Icon icon={close}></Icon>{ErrMSG.msg}</p>
            )
        }
        else
        {
            errorMessage = ''
        }

        //single error from server
        const singleErrMsg = this.state.singleServererror
        let singleServerMessage;
        if(singleErrMsg !== '')
        {
            singleServerMessage = <p style={{color:"red", display:"flex"}}><Icon icon={close}></Icon>{singleErrMsg}</p>
        }

        //Single error internal 
        const singleInternalErrMsg = this.state.Internalerror
        let singleInternalErrorMessage;
        if(singleInternalErrMsg !== '')
        {
            singleInternalErrorMessage = <p style={{color:"red", display:"flex"}}><Icon icon={close}></Icon>{singleInternalErrMsg}</p>
        }

        return (
            <div className="signup_body">
                <div className="signup_left">
                    <div className="signup_left_outer_container">
                        <h3>Sign up Email validation</h3>
                        <label>
                            If you already have a login credential please click login button to login
                        </label>

                        <a href="/">
                            <button type="button" className="signup btn">Login</button>
                        </a>
                    </div>
                </div>

                <div className="signup_right">
                    <div className="signup_right_outer_container">
                        <div className="signup_right_inner_container">
                            <h2>Sign Up</h2>
                            <form onSubmit={this.handleSubmit}>
                                <div className="signup_signup_right_inner_container_elem">
                                    <label>Validation Code</label>
                                    <input id="userVerificationCode" onChange={this.handleChange}  className="txt" type="text" placeholder="AXCHE12V"></input>
                                </div>
                                {errorMessage}
                                {singleServerMessage}
                                {singleInternalErrorMessage}
                                <button id="submit_btn" onClick={this.submit} className="btn" type="submit">signup</button>

                            </form>
                        </div>
                    </div>
                    
                </div>
                <Recaptcha
                ref={ ref => this.recaptcha = ref }
                //**************************************************DANGER remove site key to saftey *********************************************************************
                sitekey="6LdhWNsUAAAAAKIeVaOGdY3HCKy5Siva9emmZDl6"
                onResolved={ this.onResolved } />
            </div>
        )
    }
}