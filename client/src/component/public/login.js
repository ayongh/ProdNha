import React, { Component } from 'react'
import Recaptcha from 'react-google-invisible-recaptcha';
import axios from 'axios'

import ReactPlayer from 'react-player'

import { Icon } from 'react-icons-kit'
import {close} from 'react-icons-kit/fa/close'
import {spinner2} from 'react-icons-kit/icomoon/spinner2'
import {embed2} from 'react-icons-kit/icomoon/embed2'
import {u1F4BB} from 'react-icons-kit/noto_emoji_regular/u1F4BB'

import {Link, Redirect} from 'react-router-dom'

import {connect} from 'react-redux'
import {Actionlogin, ActionLoading, ActionError} from '../../redux/Action/loginAction'
import {ActionUserIntialize} from '../../redux/Action/userinfoAction'

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
                            <h2>NHA</h2>
                        </div>
                        <div className="menuContent">
                            <a className="login_option" onClick={this.loginModelOpen}>Login</a>
                            <a className="login_option" href="/signup">Signup</a>
                        </div>
                    </div>
                </div>

                <header className="v-header container">
                    <div className="fullscreen-video-wrap">
                        <ReactPlayer className='react-player-background' playing={true} loop={true} width="100%" height="100%" muted url="https://firebasestorage.googleapis.com/v0/b/nhadb-c07ce.appspot.com/o/video%2Fvideoplayback%20(1).mp4?alt=media&token=012d7e51-680a-4773-b9ae-1b483e4966ae" />
                    </div>
                    <div className="header-overlay"></div>
                    <div className="header-content text-md-center">
                    <h1 className="header_type_text">
                        <>
                        <span
                        style={{ whiteSpace: "pre" }}
                        ref={(el) => {
                            this.el = el;
                        }}
                        />
                        </>
                    </h1>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id temporibus perferendis necessitatibus numquam amet impedit explicabo? Debitis quasi ullam aperiam!</p>
                        <a className="btn" href="#about">Find Out More</a>
                    </div>
                </header>
        
                <section className="section section-a" id="about">
                    <div className="container_section_A A_left">
                        <img src={image} className="A_left_image"></img>
                    </div>

                    <div className="container_section_A A_right">
                        <div className="A_right_comp1">
                            <div className="A_right_comp1_warpper">
                                <div className="A_right_comp1_part one">
                                    <Icon icon={embed2} size={50} className="A_right_content_icon"></Icon>
                                    <div className="A_right_content">
                                        <h2> About Application</h2>
                                        <p>Bases of this application is to share knowledge wither it is small or big. 
                                            In the ongoing fight with COVID 19 we are in need of platform were we can share our ideas on protecting our love once,
                                            help our young once with School learning and college advice, provide advices to once that are in need of counsoling, and entertainment for once that needs to 
                                            relax. Our application provides this content to help you in the time of emergency. 
                                            We belive no infromation is too small you dont have to be educated college student to share knowledge you have learned from 
                                            expirence, your love once
                                            
                                            .Therefore we leave what content gets to be shared to you. you are the teacher, mentor, guide to once that need the help you might have already percevired in your life time.
                                        </p>
                                    </div>
                                </div>

                                <div className="A_right_comp1_part three">
                                <Icon icon={u1F4BB} size={50} className="A_right_content_icon"></Icon>
                                    <div className="A_right_content">
                                        <h2> Technical Detail</h2>
                                        <p>Goal of this application is to provide user with content that enrich their daily life. the intention of this project was to share and </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                    </div>
                </section>
        
                <section className="section section-b">
                    <div className="container">
                   
                    </div>
                </section>

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
