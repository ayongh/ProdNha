import React, { Component } from 'react'
import axios from 'axios'
import Modal from 'react-responsive-modal';
import { Icon } from 'react-icons-kit'
import {close} from 'react-icons-kit/fa/close'
import {Actionlogin, ActionLoading, ActionError} from '../../redux/Action/loginAction' //'../Action/loginAction'
import {connect} from 'react-redux'
import PassworReset from './pswd_reset'


import Recaptcha from 'react-google-invisible-recaptcha';
import {recaptchaValidation} from '../../redux/Action/RecaptchaVelidation' //'../Action/RecaptchaVelidation'

class pswdConfirmation extends Component 
{
    // Avoids memory leaks when using the time interval async function
    _isMounted = false;

    //Constructor
    constructor(prop)
    {
        super(prop)

        this.state = {
            confirmationCode:'',               //Stores conformation Code inputed by user
            error:null,                        // Stores error retrived from api
            modelopen:false,                   // Open the model if the token expires
            redirectpreviousPage: false,       // if the validation or time expires the flage indicates if we should roll to previous page 

            open: false,                        //The flag value that opens and closes the POP UP 
             
            redirectNextPage: false,            // if everything validates flag indicates if we should move to resting password to next page

            minute:4,                           // Timer value until token expires 
            sec:60
        }
        this.onResolved = this.onResolved.bind( this );
    }

    //Function changes the STATE of open flage to true - which will open popup
    onOpenModal = () => {
        this.setState({ open: true });
    };

    //Function changes the STATE of open flage to false - which will close popup
    onCloseModal = () => {
        this.setState({ open: false, redirectpreviousPage:true});
    };

    //Stores the value on inpute change of value and stores it in inpute ID
    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })

    }
    
    //upon submit of the button following thing will occure
    submit = (e)=>
    {
        //prevents the submit from moving to next page
        e.preventDefault();

        //Validates the form inpute is null or not
        this.formValidation()
       
        //if the form inputes are not null we call the axios request
        if(this.state.userName !== "")
        {
            this.recaptcha.execute();

        }// if     
        else
        {
            this.recaptcha.reset();
        }
        
    } //submit

    onResolved()
    {
        if(recaptchaValidation(this.recaptcha.getResponse()))
        {
            var data = {
                "authCode": this.state.confirmationCode
            }

            //Calls the post method to validate if the confirmation matches or not
            axios.post('/user/pswdReset/confirmation').then( res =>{
                
                //if we get success the we move to next page
                if(res.status === 200)
                {
                   this.setState({
                     redirectNextPage: true
                   })
                }
                //if we get 404 the valudation doesnt match  
                else if(res.status === 404)
                {
                    this.setState({
                        error: res.data.error
                    })
                }
                //finally if something else hapens it will open the POP up box
                else
                {
                    this.onOpenModal()
                }

            }).catch(err =>{
                //if there is an error in AXIOS request we catch error 
                this.setState({
                    error: "Internal Error occured"
                })
            })// catch error
        }
        else
        {
           //if there is an error in AXIOS request we catch error 
           this.setState({
                error: "Internal Error occured"
            }) 
        }
    }

    formValidation()
    {
        if(this.state.userName === "")
        {
            document.getElementById('confirmationCode').style.borderColor = "red";
            document.getElementById('confirmationCode').style.borderWidth = "1px";
        }
        else
        {
            document.getElementById('confirmationCode').style.borderColor = "black";
            document.getElementById('confirmationCode').style.borderWidth = "1px";
        }
    }

    //clock that display when token will expire
    componentDidMount() {
        this.countdown()
    }

    countdown()
    {
        this._isMounted = true;

        if(this._isMounted)
        {

            // update every second     
            setInterval(() => {
                if(this.state.minute >= 1 || this.state.sec >= 1)
                {
                    if(this.state.sec <=0 )
                    {
                        if(this._isMounted)
                        {
                            this.setState({
                                sec:60,
                                minute: this.state.minute -1
                            })
                        }
                    }

                    if(this._isMounted)
                    {
                        this.setState({
                            sec: this.state.sec - 1
                        })
                    }
                    
                }
                else
                {
                    if(this._isMounted)
                    {
                        this.onOpenModal()
                    }
                }
            }, 1000);
        }//if
    }//countDown

    //prevents from memory leak
    componentWillUnmount()
    {
        this._isMounted = false;
    }

    render() 
    {
        //POP up flage that indicates weither it should open pop up or not
        const { open } = this.state;
        
        //Next page flage Redirection
        if(this.state.redirectNextPage === true)
        {
            return <PassworReset/>
        }


        if(this.state.redirectpreviousPage === true)
        {
            window.location.reload(false); 
        }

        //Error display 
        const Notfounderr = this.state.error ;
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
                <div className="login_left passwordReset">
                    <div className="login_left_outer_container">
                        <h3>Warning</h3>
                        <p>The code sent to your email will expire in </p>

                        <div className="Countdown">
                            <span className="Countdown-col">
                                <span className="Countdown-col-element">
                                    <h1>{this.state.minute}</h1>
                                    <span>Min</span>
                                </span>
                            </span>

                            <span className="Countdown-col">
                                <span className="Countdown-col-element">
                                    <h1>{this.state.sec}</h1>
                                    <span>Sec</span>
                                </span>
                            </span>

                        </div>
                    </div>
                </div>

                <div className="signup_right">
                    <div className="signup_right_outer_container">
                        <div className="signup_right_inner_container">
                            <h2>Authentication Confirmation</h2>

                            <div className="signup_signup_right_inner_container_elem">
                                <label>New Password</label>
                                <input id="confirmationCode"  onChange={this.handleChange} className="txt" type="text" placeholder="a1zk22"></input>
                            </div>

                            {err}
                            <button id="submit_btn" onClick={this.submit} className="btn" type="submit">Confirm</button>

                            <p> Login now <a href="\">Login</a></p>
                        </div>
                    </div>
                    
                </div>

                <Modal open={open} onClose={this.onCloseModal} center style={{color:"red", textAlign:"center"}}>
                    <h2 style={{color:"red", width:"100%", textAlign:"center"}}>Code Expired</h2>
                    <p style={{color:"red", width:"100%", textAlign:"center"}}>The code sent to your email has expired process will restart again</p>
                </Modal>

                <Recaptcha
                ref={ ref => this.recaptcha = ref }
                //**************************************************DANGER remove site key to saftey *********************************************************************
                sitekey="6LdhWNsUAAAAAKIeVaOGdY3HCKy5Siva9emmZDl6"
                onResolved={ this.onResolved } />
            </div>
        )
    }
}

//access all the state
const mapToState = (state) =>{
    return {
        state:state
    }
}

export default connect(mapToState,{Actionlogin,ActionLoading,ActionError}) (pswdConfirmation);