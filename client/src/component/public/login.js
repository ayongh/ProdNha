import React, { Component } from 'react'
import Recaptcha from 'react-google-invisible-recaptcha';
import axios from 'axios'

import ReactPlayer from 'react-player'

import { Icon } from 'react-icons-kit'
import {close} from 'react-icons-kit/fa/close'
import {spinner2} from 'react-icons-kit/icomoon/spinner2'


import {Link, Redirect} from 'react-router-dom'

import {connect} from 'react-redux'
import {Actionlogin, ActionLoading, ActionError} from '../../redux/Action/loginAction'
import {ActionUserIntialize} from '../../redux/Action/userinfoAction'

import GetImageElement from '../public/component/public_getImageElement'

import Typed from 'typed.js';

import ContactFooter from '../private/componentofBrowse/contactfooter'

const image = require('../img/coding.jpg')

class login extends Component
{
    
    constructor(props)
    {
        super(props)

        this.state = {
            username:null,
            password:null,
            userError: null,
            search:null,

            classes:null,


            safaribrowser:false,

            typed:undefined,

            value: '' 
            
        }
        this.onResolved = this.onResolved.bind( this );
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })

    }

    handleSearchChange=(e)=>
    {
        this.setState({
            [e.target.id]: e.target.value
        })

        axios.get('/course/search/public/'+this.state.search).then( res =>{ 
            if(res.status === 200)
            {
                this.setState({
                    classes:res.data.data
                })
            }
        })

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


    //When recaptcha is resolved
    onResolved() {

        document.getElementById('loginLoad').style.display = "block"
        document.getElementById('loginText').style.display= "none"

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
                        document.getElementById('loginLoad').style.display = "none"
                        document.getElementById('loginText').style.display= "block"
                        this.props.Actionlogin()
                        this.props.ActionUserIntialize(res.data.message)

                    }
                    else
                    {
                        document.getElementById('loginLoad').style.display = "none"
                        document.getElementById('loginText').style.display= "block"
                        this.recaptcha.reset();
                        this.props.ActionError(res.data.errors)
                    }
                })
    
            }
            else
            {
                document.getElementById('loginLoad').style.display = "none"
                document.getElementById('loginText').style.display= "block"
                this.recaptcha.reset();
                this.props.ActionError(res.data.errors)
            }
        })
    }

    //Model Close
    modelClose()
    {
        document.getElementById('myModal').style.display="none"
    }

    loginModelOpen()
    {
        document.getElementById('myModal').style.display="block"
    }

    componentDidMount()
    {
        var popularpayload= {
            pagination: 20
        }

        axios.post('/render/class/popular/public',popularpayload, {validateStatus: function (status) { return status >= 200 && status < 600; }}).then( res =>{ 
            if(res.status === 200)
            {
                this.setState({
                    classes:res.data
                })
            }
        })

        if(this.props.location.pathname ==='/')
        {
            try
            {
                const options = {
                    strings: ['Welcome^3000', 'स्वागतम्^3000','أهلا بك','어서 오십시오'],
                    typeSpeed: 100,
                    backSpeed: 100,
                    loop: true,
                    cursorChar: "|",
                };
    
    
                // this.el refers to the <span> in the render() method
                this.typed = new Typed(this.el, options);
            }catch(e)
            {
                console.log(e)
            }
            

        }
        
    }

    render()
    {
        //Checks error and display it errorElement
        let errorElement = null
        
        if(this.state.userError !== null)
        {
            errorElement = <p style={{color:"red", display:"flex"}}><Icon icon={close}></Icon>{this.state.userError}</p>
        }

        if(this.props.state.login.error)
        {
            errorElement = <p style={{color:"red", display:"flex"}}><Icon icon={close}></Icon>{this.props.state.login.error}</p>
        }

        const route = this.props.location.state
       
        if(this.props.state.login.loginFlag)
        {
            if(route !== undefined)
            {
                if(route.prevLocation === '/browse/:genre' || route.prevLocation === '/watch/:videoID')
                {
                    return <Redirect to= "/Homepage"/>
                }
                else
                {
                    return <Redirect to= {route.prevLocation}/>
                }
            }
            else
            {
                return <Redirect to= "/Homepage"/>
            }   
        }

        return (
            <div>
                <div className="login_nav">
                    <div className="login_nav_wrapper">
                        <div className="logo">
                        <Link to="/">
                            <h2>NHA</h2>
                        </Link>
                        </div>

                        <div className="login_search">
                            <input className="login_search_input" id="search" onChange={this.handleSearchChange} type="text" placeholder="Search"/>
                        </div>

                        <div className="menuContent">
                            <a className="login_option" onClick={this.loginModelOpen}>Login</a>
                            <a className="login_option" href="/signup">Signup</a>
                            <a className="login_option" href="/aboutus">About us</a>

                        </div>
                    </div>
                </div>

                <div className="search_caresoleWrapper login_searchWrapper">
                    <div className="login_Searchcaresole">
                        <GetImageElement classes = {this.state.classes}></GetImageElement>
                    </div>
                </div>

                <ContactFooter></ContactFooter>


                <div id="myModal" class="modal">
                    <div class="modal-content">
                        <div className="login_model_wrapper">
                            <div className="model_container left">
                                <h2>Notification</h2>
                                <p>welcome to the page new notification and other things will be here</p>
                            </div>

                            <div className="model_container right">
                                <span class="close" onClick={this.modelClose}>&times;</span>
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
                                        <button id="submit_btn" className="btn" type="submit">
                                            <span id="loginLoad"><Icon className="loginIcon" id="loginicon" icon={spinner2}></Icon></span>
                                            <span id="loginText">Login</span>
                                        </button>
                                    </form>
                                    <p> I forgot my <Link to={"/pswdreset"}>password</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Recaptcha
                ref={ ref => this.recaptcha = ref }
                //**************************************************DANGER remove site key to saftey *********************************************************************
                sitekey='6LdhWNsUAAAAAKIeVaOGdY3HCKy5Siva9emmZDl6'
                onResolved={ this.onResolved } />
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
