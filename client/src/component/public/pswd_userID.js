import React, { Component } from 'react'
import axios from 'axios'
import { Icon } from 'react-icons-kit'
import {close} from 'react-icons-kit/fa/close'
import PaswdConfirmation from './pswdConfirmation'

import Recaptcha from 'react-google-invisible-recaptcha';
import {recaptchaValidation} from '../../redux/Action/RecaptchaVelidation' //'../Action/RecaptchaVelidation'

export default class pswd_userID extends Component 
{
    constructor(prop)
    {
        super(prop)

        this.state = {
            userName:'',
            error:null,
            NotFoundError:null,
                         
            redirectNextPage: false
        }
        this.onResolved = this.onResolved.bind( this );
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

        if(this.state.userName === "")
        {
            document.getElementById('userName').style.borderColor = "red";
            document.getElementById('userName').style.borderWidth = "1px";
            document.getElementById('error').style.display = "flex";
        }
        else
        {
            document.getElementById('userName').style.borderColor = "black";
            document.getElementById('userName').style.borderWidth = "1px";
            document.getElementById('error').style.display = "none";
        }

        if(this.state.userName !== "")
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
            
            var data = {
                email: this.state.userName
            }

            //Calls the post method to retrive the token and validate username and password
            axios.post('/user/pswdReset', data ,{validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{

                if(res.status === 200)
                {
                    this.setState({
                        redirectNextPage: true,
                    })
                }
                else if(res.status === 403)
                {
                    this.setState({
                        error: res.data.errors,
                        NotFoundError:null

                    })
                }
                else if(res.status === 404)
                {
                    this.setState({
                        NotFoundError: res.data.error,
                        error: null

                    })
                }
                else
                {
                    this.setState({
                        error: null,
                        NotFoundError:null
                    })
                }

            }).catch(err =>{
                //we change the login state to false is we have an error
                this.setState({
                    NotFoundError: "Internal Error occured"
                })
            })// catch error
        }
        else
        {
            //we change the login state to false is we have an error
            this.setState({
                NotFoundError: "Recaptcha error occured"
            })
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


        const Notfounderr = this.state.NotFoundError ;
        let err;
        if( Notfounderr !== null)
        {
            err = <p style={{color:"red", display:"flex"}}><Icon icon={close}></Icon>{Notfounderr}</p>
        }
        else
        {
            err = ''
        }
       
        if(this.state.redirectNextPage === true)
        {
           return  <PaswdConfirmation/>
        }

        return (
            <div className="signup_body">
                <div className="signup_left pswd_overflow">
                    
                    <h4>Password Security</h4>
                    <p>You are responsible for protecting your own password. Set your password upon your own disgressio</p>
                        
                </div>

                <div className="signup_right">
                    <div className="signup_right_outer_container">
                        <div className="signup_right_inner_container">
                            <h2>Password Reset</h2>

                            <div className="signup_signup_right_inner_container_elem">
                                <label>User Name</label>
                                <input id="userName" onChange={this.handleChange} className="txt" type="text" placeholder="ayongh1@gmail.com"></input>
                            </div>

                            <p id="error" style={{display:"none", color:"red"}}><Icon icon={close}></Icon>Make sure red higlighted filed must be filled with correct text</p>
                            <div>
                                {errorMessage}
                            </div>
                            {err}
                            <button id="submit_btn" onClick={this.submit} className="btn" type="submit">Next</button>
                           
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