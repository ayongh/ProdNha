import React, { Component } from 'react'
import axios from 'axios'
import { Icon } from 'react-icons-kit'
import {close} from 'react-icons-kit/fa/close'
import SignupEmailValidation from './signupEmailValidation'


import Recaptcha from 'react-google-invisible-recaptcha';
import {recaptchaValidation} from '../../redux/Action/RecaptchaVelidation' //'../Action/RecaptchaVelidation'

var validator = require("email-validator");

class signup extends Component 
{
    //Constructor
    constructor(prop)
    {
        super(prop)

        this.state = {
            firstName:'',              //User First Name
            lastName:'',               //User Last Name
            email:'',                  //User Email 
            password:'',               //User Password
            SecPassword:'',            //User password validation
            value: '',

            validationCode:'',

            error:null,                 //Server error
             
            redirectConfirmation: false,        //Page Redirected
            
        }
        this.onResolved = this.onResolved.bind( this )

    }
    
    //Stores the value
    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })

    }
    
    submit = (e)=>
    {
        e.preventDefault();

        this.formValidation()

        if(this.state.firstName !== "" && this.state.lastName !== "" && this.state.email !== "" && validator.validate(this.state.email) === true && this.state.password !== "" && this.state.SecPassword !== "" && this.state.password === this.state.SecPassword )
        {
            document.getElementById("error").style.display="none"
            this.recaptcha.execute();
        } 
        else
        {
            document.getElementById("error").style.display="flex"
            this.recaptcha.reset();
        }//if
    }

    formValidation()
    {
        //First Name validation
        if(this.state.firstName === "")
        {
            document.getElementById('firstName').style.borderColor = "red";
            document.getElementById('firstName').style.borderWidth = "1px";
        }
        else
        {
            document.getElementById('firstName').style.borderColor = "black";
            document.getElementById('firstName').style.borderWidth = "1px";
        }

        //Last Name Validation
        if(this.state.lastName === "")
        {
            document.getElementById('lastName').style.borderColor = "red";
            document.getElementById('lastName').style.borderWidth = "1px";
        }
        else
        {
            document.getElementById('lastName').style.borderColor = "black";
            document.getElementById('lastName').style.borderWidth = "1px";
        }

        //Email validation
        if(this.state.email === "" || validator.validate(this.state.email) === false)
        {
            document.getElementById('email').style.borderColor = "red";
            document.getElementById('email').style.borderWidth = "1px";
        }
        else
        {
            document.getElementById('email').style.borderColor = "black";
            document.getElementById('email').style.borderWidth = "1px"; 
        }

        //password validation
        if(this.state.password === "")
        {
            document.getElementById('password').style.borderColor = "red";
            document.getElementById('password').style.borderWidth = "1px";
        }
        else
        {
            document.getElementById('password').style.borderColor = "black";
            document.getElementById('password').style.borderWidth = "1px";
        }


        //Secound Password validation
        if(this.state.SecPassword === "" || this.state.password !== this.state.SecPassword)
        {
            document.getElementById('SecPassword').style.borderColor = "red";
            document.getElementById('SecPassword').style.borderWidth = "1px"; 
            if(this.state.password !== this.state.SecPassword && this.state.SecPassword !== "" && this.state.password !== "")
            {
                document.getElementById('secPass').style.display = "flex"
            }  
            else
            {
                document.getElementById('secPass').style.display = "none"
            }
           
        }
        else
        {
            document.getElementById('SecPassword').style.borderColor = "black";
            document.getElementById('SecPassword').style.borderWidth = "1px";
            document.getElementById('secPass').style.display = "none"
        }
    }

    onResolved()
    {
        var data  = {
            "fname": this.state.firstName,
            "lname": this.state.lastName,
            "email" : this.state.email,
            "password": this.state.password
        }
        
        if(recaptchaValidation(this.recaptcha.getResponse()))
        {
            axios.post('/user/signup/emailvarification', data).then( async res =>{

                if(res.status === 200)
                {
                    await this.setState({
                        password: res.data.password,
                        validationCode: res.data.secret,
                        redirectConfirmation : true
                    })
                }
                else if(res.status === 403)
                {
                    this.setState({
                        error: res.data.errors
                    })
                }
                else
                {
                    this.setState({error: [{"value": "","msg": "Error Occured when performing a http request","param": "request","location": "body"}]})
                }
    
            }).catch(err =>{
                this.setState({ error: [{"value": "","msg": "Internal Error occure","param": "request","location": "body"}]})
            })
        }
        else 
        {
            this.setState({error: [{"value": "","msg": "There is error with recaptcha","param": "request","location": "body"}]})
        }
        
    }

    render() 
    {
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

        if(this.state.redirectConfirmation === true)
        {
           
           return <SignupEmailValidation firstName={this.state.firstName} lastName={this.state.lastName} email={this.state.email} password={this.state.password} validationCode={this.state.validationCode} />
        }

        return (
            <div className="signup_body">
                <div className="signup_left">
                    <div className="signup_left_outer_container">
                        <h3>Sign In</h3>
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
                                    <label>First Name</label>
                                    <input id="firstName" onChange={this.handleChange}  className="txt" type="text" placeholder="First Name" required></input>
                                </div>

                                <div className="signup_signup_right_inner_container_elem">
                                    <label>Last Name</label>
                                    <input id="lastName" onChange={this.handleChange} className="txt" type="text" placeholder="Last Name" required></input>
                                </div>

                                <div className="signup_signup_right_inner_container_elem">
                                    <label>Email</label>
                                    <input id="email" onChange={this.handleChange} className="txt" type="email" placeholder="something@gmail.com" required></input>
                                </div>
                                
                                <div className="signup_signup_right_inner_container_elem">
                                    <label>Password</label>
                                    <input id="password" onChange={this.handleChange} className="txt" type="password" placeholder="password" required></input>
                                </div>

                                <div className="signup_signup_right_inner_container_elem">
                                    <label>Retype Password</label>
                                    <input id="SecPassword" onChange={this.handleChange} className="txt" type="password" placeholder="password" required></input>
                                </div>

                                <p id="secPass" style={{display:"none", color:"red"}}><Icon icon={close}></Icon>  password doesn't match</p>
                                <p id="error" style={{display:"none", color:"red"}}><Icon icon={close}></Icon>Make sure red higlighted filed must be filled with correct text</p>
                                <div>
                                {errorMessage}
                                </div>
                                <button id="submit_btn" onClick={this.submit} className="btn" type="submit">signup</button>

                            </form>
                        </div>
                    </div>
                    <Recaptcha
                    ref={ ref => this.recaptcha = ref }
                    //**************************************************DANGER remove site key to saftey *********************************************************************
                    sitekey="6LdhWNsUAAAAAKIeVaOGdY3HCKy5Siva9emmZDl6"
                    onResolved={ this.onResolved } />
                </div>
            </div>
        )
    }
}

export default signup