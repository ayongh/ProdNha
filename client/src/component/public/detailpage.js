import React, { Component } from 'react'
import Recaptcha from 'react-google-invisible-recaptcha';
import axios from 'axios'

import '../CSS/detailpage.css'
import { Icon } from 'react-icons-kit'
import {heartOutline} from 'react-icons-kit/typicons/heartOutline'
import {close} from 'react-icons-kit/fa/close'
import {spinner2} from 'react-icons-kit/icomoon/spinner2'
import {arrows_keyboard_right} from 'react-icons-kit/linea/arrows_keyboard_right'

import {Link, Redirect} from 'react-router-dom'

import {connect} from 'react-redux'
import {Actionlogin, ActionLoading, ActionError} from '../../redux/Action/loginAction'
import {ActionUserIntialize} from '../../redux/Action/userinfoAction'

import ImageLoad from './component/imageload'

class detailpage extends Component
{
    
    constructor(props)
    {
        super(props)

        this.state = {
            username:null,
            password:null,
            userError: null,

            sectionContent:null,
            similarClass:null,
            countLike:null,
            Loading:false,

            class:null
            
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
        axios.get('/course/findSection/public/'+this.props.match.params.courseID,{withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{ 
            if(res.status === 200)
            {
                await this.setState({
                    sectionContent: res.data.data
                })

            }
        })

        axios.get('/course/likeCount/'+this.props.match.params.courseID,{withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{ 
            if(res.status === 200)
            {
                this.setState({
                    countLike:res.data.message
                })

            }
        })

        axios.get('/course/findCourse/'+this.props.match.params.courseID,{withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{ 
            if(res.status === 200)
            {
<<<<<<< HEAD
             
                const image = new Image();
                image.onload = async () =>
                {
                    await this.setState({
                        class: res.data.data,
                        lodingFinish:true
                    })
                }
                image.src = res.data.data.thumbnail
=======
                const image = new Image();
                image.onload = () =>
                {
                    var titleID = "detailTitle"+res.data.data._id
                    var description = "detailDescription"+res.data.data._id
                    var stylelikeCount = "detailLikeCount"+res.data.data._id
                    var directorName = "detailDirectorName"+res.data.data._id
                    var lastUpdate = "detailLastUpdate"+res.data.data._id
                    var tag = "detailTag"+res.data.data._id
                    var image = "detailImage"+res.data.data._id

                    var newTag= this.tagFormate(res.data.data.tag)
                    var Date = res.data.data.date.split("T");


                    var likeCount = 0
                    if(this.state.countLike !== null)
                    {
                        likeCount = this.state.countLike.length
                    }

                    document.getElementById(titleID).innerHTML = res.data.data.name
                    document.getElementById(titleID).className = " "

                    document.getElementById(description).innerHTML = res.data.data.description
                    document.getElementById(description).className = "deatialDescription"
                                   
                    document.getElementById(directorName).innerHTML = res.data.data.director
                    document.getElementById(directorName).className = "directorName"
                               
                    document.getElementById(tag).innerHTML = newTag
                    document.getElementById(tag).className = "directorName"

                    document.getElementById(image).src = res.data.data.thumbnail

                    document.getElementById(lastUpdate).innerHTML = "Last Update "+ Date[0]
                    document.getElementById(lastUpdate).className = "lastUpdated"
                               
                }
                image.src = res.data.data.thumbnail

                await this.setState({
                    class: res.data.data
                })

>>>>>>> Abhishek
            }
        })

        axios.get('/course/maylike/public/'+this.props.match.params.courseID,{withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{ 
            if(res.status === 200)
            {
                await this.setState({
                    similarClass: res.data.message
                })

            }
        })
<<<<<<< HEAD

   
=======
        
        
>>>>>>> Abhishek
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

    getSimilarClass()
    {
        var classesElement
        var Classes = this.state.similarClass
       
        if (Classes !== null && Classes !== undefined)
        {
            if(Classes.length > 0)
            {
                classesElement = Classes.map( (val, index) => {
                    var newTag= this.tagFormate(val.tag)

                    return (
                        <ImageLoad val={val} key={val._id} tag={newTag}></ImageLoad>
                    )
                }) 

            }
            else
            {
                classesElement = <div style={{width: "100%", textAlign:"center"}}><h1>No Similar class Available </h1></div> 
            }

            document.getElementById('SimilarClass').innerHTML="Similar Classes"
            
        }

        return classesElement;
    }

    getClassElement()
    {
        var classElement 
        var Class = this.state.class

        if (Class !== null && Class !== undefined)
        {
            var Date = Class.date.split("T");

            classElement = 
            <div className="detail_container_top">
                <div className="detail_content">
                    <h1 id={"detailTitle"+Class._id} className="loading titleh1"> </h1>
                    <p id={"detailTag"+Class._id} className="directorName loading direcertorNameloadingWidth"></p>

                    <p id={"detailDescription"+Class._id} className="deatialDescription loadingDesc">
                        <span className="fakeLoadingParagraph loading"></span>
                        <span className="fakeLoadingParagraph loading"></span>
                        <span className="fakeLoadingParagraph loading"></span>
                    </p>
                    
                    <div id={"detailLikeCount"+Class._id} className="detailAction loading iconlike">
                        <Icon icon={heartOutline} size={35}></Icon>
<<<<<<< HEAD
                        <p className="noMargin classLikeCount">{likeCount}</p>
=======
                        <p className="noMargin classLikeCount"></p>
>>>>>>> Abhishek
                    </div>

                    <p id={"detailDirectorName"+Class._id} className="directorName loading direcertorNameloadingWidth"></p>
                    <p id={"detailLastUpdate"+Class._id} className="lastUpdated loading lastUpdatedloading"></p>
                </div>
                <div className="detail_image">
                    <div className="detail_image_wrapper">
                        <img id={"detailImage"+Class._id} className="detail_class_img loading imagedetailPage"></img>
                    </div>

                </div>
            </div>
        
        }

        return classElement;
    }

    getUserlikedList()
    {
        var userLike = <p>None</p>
        if(this.state.countLike !== null)
        {
            userLike = this.state.countLike.map((val,index)=>{
                return(
                    <p>{val.userID}</p>
                )
            })
        }
        return userLike
    }



    getSectionElement()
    {
        var sectionElement
        var section = this.state.sectionContent
       
        if (section !== null && section !== undefined)
        {
            if(section.length > 0)
            {
                sectionElement = section.map( (val, index) => {
                    return (
                        <Link to={"/video/"+this.props.match.params.courseID+"/"+val._id} className="linkNOwater" key={val._id}>
                            <div className="sectonContent">
                                <Icon icon={arrows_keyboard_right} size={30}></Icon>
                                <p className="noMargin sectioncontentTitle">{val.name}</p>
                            </div>
                        </Link>
                    )
                }) 
            }
            else
            {
                sectionElement = <div style={{width: "100%", textAlign:"center"}}><h1>Section Not Available </h1></div> 
            }

            document.getElementById('section').innerHTML = "Section"
        }

        return sectionElement;
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
                <header className="aboutBody">
                    {this.getClassElement()}


                    <div className="detail_container_bottom">
                        <h4 id="section"></h4>
                        {this.getSectionElement()}
                     

                        <div class="otherContent">
                            <div className="otherContentTitle">
                                <h4 id="SimilarClass"></h4>
                            </div>

                            <div className="content_wrapper">
                                {this.getSimilarClass()}        
                            </div>
                        </div>
                    </div>
                </header>

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
                onResolved={ this.onResolved }/>

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

export default connect(mapToState,{Actionlogin,ActionLoading,ActionError,ActionUserIntialize}) (detailpage);
