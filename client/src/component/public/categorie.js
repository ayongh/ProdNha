import React, { Component } from 'react'
import Recaptcha from 'react-google-invisible-recaptcha';
import axios from 'axios'
 
import { Icon } from 'react-icons-kit'
import {bookmark} from 'react-icons-kit/icomoon/bookmark'
import {close} from 'react-icons-kit/fa/close'
import {spinner2} from 'react-icons-kit/icomoon/spinner2'
import {androidSearch} from 'react-icons-kit/ionicons/androidSearch'


import {Link, Redirect} from 'react-router-dom'

import {connect} from 'react-redux'
import {Actionlogin, ActionLoading, ActionError} from '../../redux/Action/loginAction'
import {ActionUserIntialize} from '../../redux/Action/userinfoAction'

import ImageLoad from './component/imageload'
import LoadMainImage from './component/loadingMainImage'

import noImage from '../img/nophoto.png'
import '../CSS/loading.css';
import SideMenu from './component/sideMenu'
class categorie extends Component
{
    
    constructor(props)
    {
        super(props)

        this.state = {
            username:null,
            password:null,
            userError: null,
          
            classes:null,
            popular:null
            
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
  
      
        if(this.props.match.params !== null)
        {
            if(this.props.match.params.categorie === "popular")
            {
                var popularpayload= {
                    pagination: 100
                }
                axios.post('/render/class/popular/public',popularpayload).then( res =>{ 
                    if(res.status === 200)
                    {
                        this.setState({
                            popular: res.data.splice(0,1),
                            classes:res.data.splice(1,res.data.length)
                        })
                    }
                })
            }
            else if(this.props.match.params.categorie === "all")
            {
                var popularpayload= {
                    pagination: 100
                }
                
                axios.post('/render/class/all/public',popularpayload).then( res =>{ 
                    if(res.status === 200)
                    {
                        this.setState({
                            popular: res.data.splice(0,1),
                            classes:res.data.splice(1,res.data.length)
                        })
                    }
                })
            }
            else if(this.props.match.params.categorie === "newlyAdded")
            {
                var newlyaddedpayload= {
                    pagination: 100
                }
                axios.post('/render/class/newlyadded',newlyaddedpayload).then( res =>{ 
                    if(res.status === 200)
                    {
                        this.setState({
                            popular:res.data.splice(0,1),
                            classes:res.data.splice(1,res.data.length)
                        })
                    }
                })
            }
            else
            {
                var healthpayload= {
                    categorie: this.props.match.params.categorie,
                    pagination: 20
                }
                axios.post('/render/class/categorie',healthpayload).then( res =>{ 
                    if(res.status === 200)
                    {
                        this.setState({
                            classes:res.data.classes,
                            popular: res.data.popular
                        })
                    }
                })
            }
        }
      
    }

    tagFormate(tagString)
    {
        var MyArray = tagString.split(','); //splits the text up in chunks
        var newString = ""

        for(var i = 0; MyArray.length > i; i++)
        {
            newString = newString + "#"+MyArray[i].trim() + ' '
        }
        return newString
    }

    getPopularClass()
    {
        var classesElement
        var Classes = this.state.classes
       
        if (Classes !== null && Classes !== undefined)
        {
            if(Classes.length > 0)
            {
                
                classesElement = Classes.map( (val, index) => {
                    var newTag= this.tagFormate(val.tag)

                    return (
                        <ImageLoad val={val} tag={newTag}/>
                    )
                }) 

                document.getElementById('otherClassID').innerHTML="Other Classses"
            }
            else
            {
                classesElement = <div style={{width: "100%", textAlign:"center"}}><h1>No content Found "{this.state.searchValue}" </h1></div> 
            }
            
        }

        return classesElement;
    }

    getSearchClasses()
    {
        var classesElement
        var Classes = this.state.popular
       
        if (Classes !== null && Classes !== undefined)
        {
            if(Classes.length > 0)
            {
                classesElement = Classes.map( (val, index) => {
                    var newTag= this.tagFormate(val.tag)

                    return (
                        <LoadMainImage val={val} tag={newTag}/>
                    )
                }) 
            }
            else
            {
                classesElement = <div style={{width: "100%", textAlign:"center"}}><h1>No content Found "{this.state.searchValue}" </h1></div> 
            }
            
        }

        return classesElement;
    }


    render()
    {

        
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

        if(document.getElementById('search') !== null && this.state.searchValue !== null)
        {
            document.getElementById('search').value  = this.state.searchValue
        }

        return (
            <div className="aboutUsBody">
                <div className="login_nav">
                    <div className="login_nav_wrapper">
                        <div className="logo">
                            <Link to="/" className="removeHpyerLink">
                                <h2 >NHA</h2>
                            </Link>
                        </div>

                        <div className="aboutus_menuContent">
                            <a className="login_option" onClick={this.loginModelOpen}>Login</a>
                            <a className="login_option" href="/signup">Signup</a>
                            <a className="login_option" href="/">Home</a>
                        </div>
                    </div>
                </div>


              {/*   Section for the detail page for the section  */}
                <header className="searchResult">
                    <div className="searchResultWrapper">
                        <SideMenu></SideMenu>
                        <div className="searchrightContent">
                            <div className="CategorieDetailSearchMainContentWrapper">
                                <div className="mainContentWrapper">
                                    {/* Main Content for the movie */}
                                    { this.getSearchClasses()}
                                </div>
                                


                                <div className="otherContent">
                                    <div className="otherContentTitle">
                                        <h2 id="otherClassID">Other Class</h2>
                                    </div>
                                    <div className="content_wrapper">
                                        {this.getPopularClass()}
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                   
                </header>

                <div id="myModal" className="modal">
                    <div className="modal-content">
                        <div className="login_model_wrapper">
                            <div className="model_container left">
                                <h2>Notification</h2>
                                <p>welcome to the page new notification and other things will be here</p>
                            </div>

                            <div className="model_container right">
                                <span className="close" onClick={this.modelClose}>&times;</span>
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

export default connect(mapToState,{Actionlogin,ActionLoading,ActionError,ActionUserIntialize}) (categorie);
