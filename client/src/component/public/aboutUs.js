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

import noImage from '../img/nophoto.png'

class aboutUs extends Component
{
    
    constructor(props)
    {
        super(props)

        this.state = {
            username:null,
            password:null,
            userError: null,
            search:null,

            redirectSearch: false,
            class:null,

            searchValue:null,
            classes:null,
            popularClasses:null,

            activeOption: null,
            showOptions: false,
            redirect:false,
            userInput: ''

            
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

    handleSearchChange=(e)=>
    {
        this.setState({
            searchValue: e.target.value
        })

        axios.get('/course/search/public/'+this.state.searchValue).then( res =>{ 
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

    enterOption()
    {
        var searchVal = document.getElementById('search').value

        axios.get('/course/search/public/'+searchVal).then( res =>{ 
            if(res.status === 200)
            {
                this.setState({
                    classes:res.data.data
                })
            }
        })

        this.setState({
            activeOption: null,
            showOptions: false,
            userInput: searchVal
        });
    }

    onKeyDown=(e)=>
    {
        const { activeOption, classes } = this.state;


        if(classes.length >= 1)
        {
            if (e.keyCode === 13) {
                if(activeOption !== null)
                {
                   this.enterOption()
                }
               
            } else if (e.keyCode === 38) {
    
                if(this.state.activeOption !== null)
                {
    
                    if (activeOption === 0) {
                      return;
                    }
                    this.setState({ activeOption: activeOption - 1, searchValue:classes[activeOption-1].name});
                }
    
    
    
            } else if (e.keyCode === 40) {
    
                if(this.state.activeOption === null)
                {
                    if (activeOption === classes.length - 1) {
                      return;
                    }
                    this.setState({ activeOption: 0, searchValue:classes[0].name });
                }
                else
                {
                    if (activeOption === classes.length - 1) {
                        return;
                    }
                    this.setState({ activeOption: activeOption + 1,searchValue:classes[activeOption+1].name });
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

    handleBlur=(e)=>
    {
        setTimeout(() => {
            if(document.getElementById('searchOptions') !== null)
            {
                document.getElementById('searchOptions').style.display="none"
            }
        }, 300);
      
    }

    onClick(a)
    {

        var searchVal = a.name

        axios.get('/course/search/public/'+searchVal).then( res =>{ 
            if(res.status === 200)
            {
                this.setState({
                    classes:res.data.data
                })
            }
        })

        this.setState({
            activeOption: null,
            showOptions: false,
            searchValue:searchVal
        });
    }

    searchFocus = (e) =>
    {
        document.getElementById('searchOptions').style.display="block"

        this.setState({
            searchValue: e.target.value,
            showOptions: true

        })

        axios.get('/course/search/public/'+this.state.searchValue).then( res =>{ 
            if(res.status === 200)
            {
                this.setState({
                    classes:res.data.data
                })
            }
        })

        this.setState({
            activeOption: 0,
            showOptions: true,
            userInput: e.currentTarget.value
        });
    }

    getSearchOptionList()
    {

        if(this.state.classes !== null)
        {
            var option = this.state.classes.map((val,index)  =>
            {
                return(
                    <li className="option" key={val._id} id="searchOption">
                        <img className="searchOptionImg" src={val.thumbnail}></img>
                        <p className="searchOptiontxt" >{val.name}</p>
                    </li>
                )
            })
        }
        

        return option;

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
        if(this.props.match.params.searchtext !== undefined)
        {
            this.setState({
                searchValue:this.props.match.params.searchtext
            })

            axios.get('/course/search/public/'+this.props.match.params.searchtext).then( res =>{ 
                if(res.status === 200)
                {
                    this.setState({
                        classes:res.data.data
                    })
                }
            })
    
        }

        var popularpayload= {
            pagination: 5
        }
        axios.post('  /render/class/popular/public',popularpayload).then( res =>{ 
            if(res.status === 200)
            {
                this.setState({
                    popularClasses:res.data
                })
            }
        })
      

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
        var classesElement = <h1>Loading</h1>
        var Classes = this.state.popularClasses
       
        if (Classes !== null && Classes !== undefined)
        {
            if(Classes.length > 0)
            {
                classesElement = Classes.map( (val, index) => {
                    var newTag= this.tagFormate(val.tag)

                    return (
                            <div className="contentFirst">
                                <Link to={"/course/detail/"+val._id} className="linkNOwater" key={val._id}>

                                <div className="contentFirstImageTop">
                                    <img className="contentImageFirst" src={val.thumbnail}></img>
                                </div>
                                <div className="contentFirstImageBottom">
                                    <h3 className="contentTitle">{val.name}</h3>
                                    <div className="bottomSaveAndTimeContent">
                                        <p className="time">{val.director}</p>
                                        <Icon className="saveicon" icon={bookmark} size={15}></Icon>
                                    </div>
                                </div>
                                </Link>

                            </div>
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

    getSearchClasses()
    {
        var classesElement = <h1>Loading</h1>
        var Classes = this.state.classes
       
        if (Classes !== null && Classes !== undefined)
        {
            if(Classes.length > 0)
            {
                classesElement = Classes.map( (val, index) => {
                    var newTag= this.tagFormate(val.tag)

                    return (
                        <Link to={"/course/detail/"+val._id} className="linkNOwater" key={val._id}>
                            <div className="mainContent" key={val._id}>
                                <div className="mainClassleft">
                                    <img className="MainContentleftImg" src={val.thumbnail}></img>
                                </div>
                                <div className="mainClassRight">
                                    <div className="mainClassRightContainer">
                                        <h3 className="noMargin">{val.name}</h3>
                                        <p  className="directorName">{newTag}</p>
                                        <p className="noMargin">{val.description}</p>
                                        <p className="directorName">{val.director}</p>
                                    
                                    </div>
                                    <div className="bottomSaveAndTime">
                                        <p className="time">1 hrs 2 min</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
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

        const {
            onChange,
            onClick,
            onKeyDown,
      
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
                        <li className="li" onClick={onClick}>
                            <Icon icon={androidSearch} size={15} className="searchOptionIcon"/>
                            No Result Found
                        </li>
                    </ul>
                  );
                }
            }
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
                        <div className="searchLeftMenu">
                            <div className="mandatoryMenuContent">
                                <Link to={"/course/categorie/all"} className="removeHpyerLink sidemenu"><h4 className="mandatoryContent noMargin hover">All Classes</h4></Link>
                                <Link to={"/course/categorie/popular"} className="removeHpyerLink sidemenu"><h4 className="mandatoryContent noMargin hover">popular</h4></Link>
                                <Link to={"/course/categorie/newlyAdded"} className="removeHpyerLink sidemenu"><h4 className="mandatoryContent noMargin hover">Newly Added</h4></Link>

                            </div>

                            <div className="MenuContent">
                                <h4 className="label">Main Menu</h4>
                                <Link to={"/course/categorie/education"} className="removeHpyerLink sidemenu"><p className="menuLabelContent noMargin hover">Education</p></Link>
                                <Link to={"/course/categorie/sport"} className="removeHpyerLink sidemenu"><p className="menuLabelContent noMargin hover">Sport</p></Link>
                                <Link to={"/course/categorie/language"} className="removeHpyerLink sidemenu"><p className="menuLabelContent noMargin hover">Language</p></Link>
                                <Link to={"/course/categorie/health"} className="removeHpyerLink sidemenu"><p className="menuLabelContent noMargin hover">Health</p></Link>
                            </div>
                        </div>

                        <div className="searchrightContent">
                            <div className="SearchHeaderresult">
                                <div className="searchResultSearch label">
                                    <p className="noMargin">Searching For</p>
                                    <h3 className="noMargin">"{this.state.searchValue}"</h3>
                                    <form onSubmit={this.handlesearchSubmit}>
                                        <div className="searchMenuHomePage">
                                            <input className="publicSearch" placeholder="What do you want to learn?" id="search" onChange={this.handleSearchChange} onKeyDown={this.onKeyDown} onBlur={this.handleBlur} onFocus={this.searchFocus}  autoComplete="off" />
                                            <Icon icon={androidSearch} size={25} className="searchIcon"/>
                                        </div>
                                    </form>
                                    <div className="searchOptions" id="searchOptions">
                                        {optionList}
                                    </div>
                                </div>

                            </div>
                            <div className="DetailSearchMainContentWrapper">
                                <div className="mainContentWrapper">

                                    {/* Main Content for the movie */}
                                    { this.getSearchClasses()}

                                </div>
                                

                                <div className="otherContent">
                                    <div className="otherContentTitle">
                                        <h2>Featured Popular Classes</h2>
                                        <Link to={"/course/categorie/popular"} className="removeHpyerLink sidemenu">
                                            <button className="viewAllBtn">View All</button>
                                        </Link>
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

export default connect(mapToState,{Actionlogin,ActionLoading,ActionError,ActionUserIntialize}) (aboutUs);
