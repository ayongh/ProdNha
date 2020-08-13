import React, { Component } from 'react'
import Recaptcha from 'react-google-invisible-recaptcha';
import axios from 'axios'

import { Icon } from 'react-icons-kit'
import {close} from 'react-icons-kit/fa/close'
import {spinner2} from 'react-icons-kit/icomoon/spinner2'
import {androidSearch} from 'react-icons-kit/ionicons/androidSearch'
import {basic_book} from 'react-icons-kit/linea/basic_book'
import {basic_keyboard} from 'react-icons-kit/linea/basic_keyboard'
import {basic_gear} from 'react-icons-kit/linea/basic_gear'
import {basic_hammer} from 'react-icons-kit/linea/basic_hammer'
import {basic_settings} from 'react-icons-kit/linea/basic_settings'


import {weatherCloudy} from 'react-icons-kit/typicons/weatherCloudy'
import {weatherShower} from 'react-icons-kit/typicons/weatherShower'
import {weatherPartlySunny} from 'react-icons-kit/typicons/weatherPartlySunny'

import {Link, Redirect} from 'react-router-dom'

import {connect} from 'react-redux'
import {Actionlogin, ActionLoading, ActionError} from '../../redux/Action/loginAction'
import {ActionUserIntialize} from '../../redux/Action/userinfoAction'

import ContactFooter from '../private/componentofBrowse/contactfooter'

const image = require('../img/nophoto.png')

const backgroundVideo = require('../img/mainbackground.mp4')

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

            typed:undefined,

            value: '',

            videoLoading:false,

            classes:[],

            activeOption: null,
            showOptions: false,
            redirect:false,
            userInput: ''
            
        }
        this.onResolved = this.onResolved.bind( this );
    }

    componentDidMount()
    {
        const MainVideo = document.getElementById('video')

        MainVideo.onloadeddata=()=>
        {
            document.getElementById('title1').innerHTML = "YOUR"
            document.getElementById('title1').className = " "

            document.getElementById('title2').innerHTML = "LEARNING"
            document.getElementById('title2').className = " "

            document.getElementById('title3').innerHTML = "STARTS HERE"
            document.getElementById('title3').className = " "

            document.getElementById('description1').innerHTML = 'Our organization promotes sharing'
            document.getElementById('description1').className = " "
            document.getElementById('description1').style.padding = "0px"
            document.getElementById('description1').style.margin = "0px"

            document.getElementById('description2').innerHTML = 'knowledge of any magnitude.';
            document.getElementById('description2').className = " ";
            document.getElementById('description2').style.padding = "0px";
            document.getElementById('description2').style.marginTop = "0px";
            document.getElementById('description2').style.marginBottom = "2rem";

        }
        
    }

    componentWillUnmount()
    {
        clearTimeout(this.clearTimeout)
    }

    hoverBrowseMenu()
    {
        document.getElementById('browseMenu').style.display = "flex"
    }

    hoverOutBrowseMenu()
    {
       
        document.getElementById('browseMenu').style.display = "none"
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

        this.setState({
            activeOption: null,
            showOptions: true,
            userInput: e.currentTarget.value
        });

    }

    onKeyDown=(e)=>
    {
        const { activeOption, classes } = this.state;


        if(classes !== null)
        {

            if(classes.length >= 1)
            {
                if (e.keyCode === 13) {
                    if(activeOption !== null)
                    {
                        document.getElementById('search').value = classes[activeOption].name
                        this.setState({
                            class:classes[activeOption],
                            redirect:true
                        })
                    }
                
                } else if (e.keyCode === 38) {
    
                    if(this.state.activeOption !== null)
                    {
    
                        if (activeOption === 0) {
                        return;
                        }
                        document.getElementById('search').value = classes[activeOption-1].name
                        this.setState({ activeOption: activeOption - 1});
                    }
    
    
    
                } else if (e.keyCode === 40) {
    
                    if(this.state.activeOption === null)
                    {
                        if (activeOption === classes.length - 1) {
                        return;
                        }
                        document.getElementById('search').value = classes[0].name
                        this.setState({ activeOption: 0 });
                    }
                    else
                    {
                        if (activeOption === classes.length - 1) {
                            return;
                        }
                        document.getElementById('search').value = classes[activeOption + 1].name
                        this.setState({ activeOption: activeOption + 1 });
                    }
    
                }
            }
        }

    }

    handlesearchSubmit=(e)=>
    {
        e.preventDefault()
        this.setState({
            class:this.state.classes[this.state.activeOption],
            redirect:true
        })
    }

    onClick(a)
    {
        document.getElementById('search').value = a.name
        this.setState({
            class:a,
            redirect:true
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

    handleBlur=(e)=>
    {
        setTimeout(() => {
            this.setState({
                classes: null
            })
        }, 300);
      
    }

    searchFocus = (e) =>
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
        }).catch((error)=>{
            console.log("error")
        })

        this.setState({
            activeOption: 0,
            showOptions: true,
            userInput: e.currentTarget.value
        });
    }

    getSearchOptionList()
    {
        var option = null
        if(this.state.classes !== null)
        {
            option = this.state.classes.map((val,index)  =>
            {
                return(
                    <li className="option" key={val._id} id="searchOption">
                        <img className="searchOptionImg" src={val.thumbnail} alt='searchoption' onError={image}></img>
                        <p className="searchOptiontxt" >{val.name}</p>
                    </li>
                )
            })
        }
        

        return option;

    }

    imageError=(e)=>
    {
        e.target.src={image}
    }


    render()
    {

        //Send to the about page if redirect is true
        if(this.state.redirect)
        {
            const search = "/course/search/class/"+document.getElementById('search').value
            return <Redirect to={{pathname:search}}></Redirect>
        }

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


        const {
            onClick,      
            state: { activeOption, classes, showOptions, userInput }
          } = this;
          let optionList;
          if(this.state.classes !== null)
          {

              if (showOptions && userInput) {
                if (classes.length) {
                  optionList = (
                    <ul className="searchoptionUL" id="searchlistOptions">
                      {classes.map((optionName, index) => {
                        let className;
                        if (index === activeOption) {
                          className = 'option_select';
                        }
                        return (
                          <li className={"searchoptionList "+className} key={optionName._id} onClick={()=>this.onClick(optionName)} value={optionName.name}>
                              <Icon icon={androidSearch} size={15} className="searchOptionIcon"/>
                            {optionName.name}
                          </li>
                        );
                      })}
                    </ul>
                  );
                } else {
                  optionList = (
                    <ul className="searchoptionUL" id="searchlistOptions">
                        <li className="li">
                            <Icon icon={androidSearch} size={15} className="searchOptionIcon"/>
                            No Result Found
                        </li>
                    </ul>
                  );
                }
            }
        }

        return (
            <div>
                <div className="login_nav">
                    <div className="login_nav_wrapper">
                        <div className="logo">
                            <Link to="/" className="Videolink">
                                <h2>NHA</h2>
                            </Link>
                        </div>

                        <div className="menuContent">
                            <a className="login_option browse" onMouseOver={()=>this.hoverBrowseMenu()}>Browse</a>
                            <a className="login_option loginBtn" onClick={this.loginModelOpen} onMouseOver={()=>this.hoverOutBrowseMenu()}>Login</a>
                            <a className="login_option" href="/signup" onMouseOver={()=>this.hoverOutBrowseMenu()}>Signup</a>
                        </div>

                        <div className="browseMenuWrapper" id="browseMenu" onMouseLeave={()=>this.hoverOutBrowseMenu()}>
                            <div className="browseMenu">
                                <div className="browseMainMenu">
                                    <Link to={"/course/categorieinfo/all"} className="removeHpyerLink sidemenu"><h4 className="mandatoryContent noMargin hover">All Classes</h4></Link>
                                    <Link to={"/course/categorieinfo/popular"} className="removeHpyerLink sidemenu"><h4 className="mandatoryContent noMargin hover">popular</h4></Link>
                                    <Link to={"/course/categorieinfo/newlyAdded"} className="removeHpyerLink sidemenu"><h4 className="mandatoryContent noMargin hover">Newly Added</h4></Link>

                                </div>
                                <div className="browseSubMenu">
                                    <Link to={"/course/categorieinfo/Education"} className="removeHpyerLink sidemenu"><p className="menuLabelContent noMargin hover">Education</p></Link>
                                    <Link to={"/course/categorieinfo/sport"} className="removeHpyerLink sidemenu"><p className="menuLabelContent noMargin hover">Sport</p></Link>
                                    <Link to={"/course/categorieinfo/language"} className="removeHpyerLink sidemenu"><p className="menuLabelContent noMargin hover">Language</p></Link>
                                    <Link to={"/course/categorieinfo/health"} className="removeHpyerLink sidemenu"><p className="menuLabelContent noMargin hover">Health</p></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* -- This is where the landing page will go -- */}
                <header className="v-header">
                    <div className="fullscreen-video-wrap">
                        <video id="video" loop={true} muted={true} autoPlay className="fullscreen-bg__video" src={backgroundVideo}/>
                    </div>

                    <div className="header-overlay"></div>
                    <div className="header-content" id="mainContainerTest">
                        <h1 id="title1" className="loading loginTitle1"></h1>
                        <h1 id="title2" className="loading loginTitle2"></h1>
                        <h1 id="title3" className="loading loginTitle3"></h1>

                        <p id="description1" className="loading descriptionTitle1"></p>
                        <p id="description2" className="loading descriptionTitle2"></p>
                        <form onSubmit={this.handlesearchSubmit}>
                            <div className="searchMenuHomePage">
                                <input className="publicSearch" placeholder="What do you want to learn?" id="search" onChange={this.handleSearchChange} onKeyDown={this.onKeyDown} onBlur={this.handleBlur} onFocus={this.searchFocus}  autoComplete="off" />
                                <Icon icon={androidSearch} size={25} className="searchIcon"/>
                            </div>
                        </form>
                        <div className="searchOptions">
                            {optionList}
                        </div>
                    </div>

                    <div style={{height: "150px", overflow: "hidden"}} className="HomepageWave">
                        <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{height: "100%", width: "100%"}}>
                            <path d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" style={{stroke: "none", fill: "#f4f4f4"}}></path>
                        </svg>
                    </div>
                </header>

                <div className="introductionHomepage">
                    {/* This is the Goal section of the page */}
                    <div className="innnerContainerHomepage">
                        <div className="HighSchoolContainer">
                            <div className="highSchoolImageWrapper">
                                <img className="imageHighschool" src="https://firebasestorage.googleapis.com/v0/b/nhadb-c07ce.appspot.com/o/stackskills-work-smarter.jpg?alt=media&token=97dc698b-371f-408b-9d5c-680b1edfdafc" alt='teamMember img' onError = {(e)=>{e.target.src= image}}></img>
                            </div>

                            <div className="highSchoolContent">
                                <h1 className="noMargin">Our Goal</h1>
                                <p className="noMargin">We are small group of teams who believes any information is useful in life wither its fixing simple fence or building a spaceship. We believe experience can teach lot in life and we want to provide this platform to share people experience so other can learn from them. This learning experience is applicable to old or young because we provide variety of content to help different demographic.</p>

                                <h1>Varity of Content</h1>
                                <p>We deliver varity of content that can help prek school with learning Nepali and English Ryhms, high school student with college application, collage student with various courses, and lastly adult with billing, application, technology etc</p>
                            
                                <div className="listOfIconContent">
                                    <Icon icon={basic_book} size={30} className="iconPadding"/>
                                    <Icon icon={basic_gear} size={30} className="iconPadding"/>
                                    <Icon icon={basic_hammer} size={30} className="iconPadding"/>
                                    <Icon icon={basic_keyboard} size={30} className="iconPadding"/>
                                    <Icon icon={basic_settings} size={30} className="iconPadding"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* This is the developer section of the page */}
                    <div className="TeamContainer">
                        <div className="firstDiv">
                            <img className="firstDivImg developerimgMargin" src="https://firebasestorage.googleapis.com/v0/b/nhadb-c07ce.appspot.com/o/1.jpg?alt=media&token=b980954e-50dc-4dd7-942e-48a613c5517f" alt='teamMember img' onError = {(e)=>{e.target.src= image}}></img>
                            <img className="secDivImg developerimgMargin" src="https://firebasestorage.googleapis.com/v0/b/nhadb-c07ce.appspot.com/o/1.jpg?alt=media&token=b980954e-50dc-4dd7-942e-48a613c5517f" alt='teamMember img' onError = {(e)=>{e.target.src= image}}></img>
                        </div>

                        <div className="secoundDivWrapper">
                            <div className="secoundDiv">
                                <div className="secDivfirstDivImg developerimgMargin" >
                                    <h2>Team Member</h2>
                                    <p>Our team consist of individual who are attending college, former graduates in multiple disiplines and High school Students</p>
                                    <button className="landingpageContatctButton">Contact</button>
                                </div>
                                <img className="secDivsecDivImg developerimgMargin" src="https://firebasestorage.googleapis.com/v0/b/nhadb-c07ce.appspot.com/o/1.jpg?alt=media&token=b980954e-50dc-4dd7-942e-48a613c5517f" alt='teamMember img' onError = {(e)=>{e.target.src= image}} ></img>
                                <img className="secDivsthirdDivImg developerimgMargin" src="https://firebasestorage.googleapis.com/v0/b/nhadb-c07ce.appspot.com/o/1.jpg?alt=media&token=b980954e-50dc-4dd7-942e-48a613c5517f" alt='teamMember img' onError = {(e)=>{e.target.src= image}}></img>
                            </div>

                            <div className="thirdDivWrapper">
                                <div className="thirdDiv">
                                    <img className="thirdDivThirdDivImg developerimgMargin" src="https://firebasestorage.googleapis.com/v0/b/nhadb-c07ce.appspot.com/o/1.jpg?alt=media&token=b980954e-50dc-4dd7-942e-48a613c5517f" alt='teamMember img' onError = {(e)=>{e.target.src= image}} ></img>
                                </div>

                                <div className="fourthDIv">
                                    <img className="fourthDivfirstDivImg developerimgMargin" src="https://firebasestorage.googleapis.com/v0/b/nhadb-c07ce.appspot.com/o/1.jpg?alt=media&token=b980954e-50dc-4dd7-942e-48a613c5517f" alt='teamMember img' onError = {(e)=>{e.target.src= image}}></img>
                                    <img className="fourthDivsecDivImg fourthDivfirstDivImg developerimgMargin" src="https://firebasestorage.googleapis.com/v0/b/nhadb-c07ce.appspot.com/o/1.jpg?alt=media&token=b980954e-50dc-4dd7-942e-48a613c5517f" alt='teamMember img' onError = {(e)=>{e.target.src= image}} ></img>
                                </div>

                                <div className="fithDiv">
                                    <img className="fifthDivfirstDivImg fourthDivfirstDivImg developerimgMargin" src="https://firebasestorage.googleapis.com/v0/b/nhadb-c07ce.appspot.com/o/1.jpg?alt=media&token=b980954e-50dc-4dd7-942e-48a613c5517f" alt='teamMember img' onError = {(e)=>{e.target.src= image}} ></img>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
              

                <ContactFooter></ContactFooter>


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

export default connect(mapToState,{Actionlogin,ActionLoading,ActionError,ActionUserIntialize}) (login);


