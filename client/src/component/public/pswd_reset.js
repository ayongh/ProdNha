import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

import { Icon } from 'react-icons-kit'
import {close} from 'react-icons-kit/fa/close'

export default class pswd_reset extends Component 
{
    constructor(prop)
    {
        super(prop)

        this.state = {
            Newpassword:'',
            Varifypassword:'',

            handlederror:null,
            Servererrors: null,

            callUpdateRoute: true,
            modelopen:false,
            open: false,
            redirectLoginpage:false
        }
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

        this.verification();
        
        if(this.state.Varifypassword !== '' && this.state.Newpassword !== '' && this.state.Varifypassword === this.state.Newpassword)
        {
            this.updatePassword();
        }
    }

    updatePassword()
    {
        var data = 
        {
            "password":this.state.Newpassword
        }
        axios.post('/user/pswdReset/updatePswd', data,{validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{

            if(res.status === 200)
            {
               this.setState({
                 redirectLoginpage: true
               })
            }
            else if( res.status === 403)
            {
                this.setState({
                    Servererrors: res.data.errors
                })
            }
            else
            {
                this.setState({
                    handlederror: res.data.error
                })
            }
        }).catch(err =>{
            //we change the login state to false is we have an error
            this.setState({
                handlederror: "Internal Error occured"
            })
        })// catch error
    }

    verification()
    {
        if(this.state.Varifypassword === '' || this.state.Newpassword === '')
        {
            alert("password Sucessfully updated")
            this.setState({
                handlederror: "Make sure red higligted field is filled"     
            })
        }
        else
        {
            if(this.state.Varifypassword !== this.state.Newpassword)
            {
                document.getElementById('Varifypassword').style.borderColor = "red";
                document.getElementById('Varifypassword').style.borderWidth = "1px";
                this.setState({
                    handlederror: "Make sure verify password matches with new password"
                })
            }
            else
            {
                document.getElementById('Varifypassword').style.borderColor = "black"
                document.getElementById('Varifypassword').style.borderWidth = "1px";
                this.setState({
                    handlederror: null
                })
            }
        }

        if(this.state.Varifypassword === '')
        {
            document.getElementById('Varifypassword').style.borderColor = "red";
            document.getElementById('Varifypassword').style.borderWidth = "1px";
        }
        else
        {
            document.getElementById('Varifypassword').style.borderColor = "black"
            document.getElementById('Varifypassword').style.borderWidth = "1px";
        }

        if(this.state.Newpassword === '')
        {
            document.getElementById('Newpassword').style.borderColor = "red"
            document.getElementById('Newpassword').style.borderWidth = "1px";
        }
        else
        {
            document.getElementById('Newpassword').style.borderColor = "black"
            document.getElementById('Newpassword').style.borderWidth = "1px";
        }

    }


    render() 
    {
        const { open } = this.state;

        if(this.state.redirectLoginpage === true)
        {
            return <Redirect to="/"></Redirect>
        }

        const Notfounderr = this.state.handlederror ;
        let err;
        if( Notfounderr !== null)
        {
            err = <p style={{color:"red", display:"flex"}}><Icon icon={close}></Icon>{Notfounderr}</p>
        }
        else
        {
            err = ''
        }

        return (
            <div className="signup_body">
                <div className="login_left">
                    <div className="login_left_outer_container">
                        <h3>Login</h3>
                        <label>If you dont have a user name and password created please 
                            do so now by clicking the button below. Thank you!
                        </label>
                        <a href="/signup">
                            <button type="button" className="signup btn" href="/signup">Login</button>
                        </a>
                    </div>
                </div>

                <div className="signup_right">
                    <div className="signup_right_outer_container">
                        <div className="signup_right_inner_container">
                            <h2>Password Reset</h2>

                            <div className="signup_signup_right_inner_container_elem">
                                <label>New Password</label>
                                <input id="Newpassword" onChange={this.handleChange} className="txt" type="password" placeholder="password"></input>
                            </div>

                            <div className="signup_signup_right_inner_container_elem">
                                <label>Retype Password</label>
                                <input id="Varifypassword" onChange={this.handleChange} className="txt" type="password" placeholder="password"></input>
                            </div>
                            {err}
                            <button id="submit_btn" onClick={this.submit} className="btn" type="submit">Reset</button>

                            <p> Login now <a href="\">Login</a></p>
                        </div>
                    </div>
                    
                </div>

                {/* Pop up Modal */}
                <div id="myModal" class="modal">
                    <div class="modal-content">
                        <h2 style={{color:"green", width:"100%", textAlign:"center"}}>Password Updtaed</h2>
                        <p style={{color:"green", width:"100%", textAlign:"center"}}>your password was successfully updated. we now will redirect you to login page</p>
                    </div>
                </div>
                   
            </div>
        )
    }
}