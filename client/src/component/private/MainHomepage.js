import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'


import { Icon } from 'react-icons-kit'
import {ic_more_horiz} from 'react-icons-kit/md/ic_more_horiz'


import ReactPlayer from 'react-player'

import GetImageElement from './componentofBrowse/getImageElement'
import GetModel from './componentofBrowse/getmodel'

import Menu from '../../component/private/componentofBrowse/Menu'
import ContactFooter from './componentofBrowse/contactfooter'

import NoImageFound from '../img/nophoto.png'

import {connect} from 'react-redux'
import {ActionCloseModel} from '../../redux/Action/ModelAction'

class MainHomepage extends Component 
{
    constructor(prop)
    {
        super(prop)

        this.state = {
            maincontent:null,
            class:null,
            classes:null,

            sectionContent:null,
            recomendationSimilar:null,
            watchHistoryclasses:null,
            ratingList:null
        }
    }

   

    componentDidMount()
    {
        
        var data={
            classID:"aksdfjlks"
        }

        axios.post("/recomendation/collaborative",data, {validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{

            if(res.status === 200)
            {
                this.setState({
                    maincontent:res.data.mainContent
                })

                if(res.data.message.length>0)
                {
                    this.setState({
                        class:res.data.mainContent,
                        classes:res.data.message
                    })

                    axios.get('/course/findSection/'+res.data.mainContent._id, {validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{ 
                        if(res.status === 200)
                        {
                            if(res.data.data.length > 0)
                            {
                                console.log(res.data.data)
                                await this.setState({
                                    sectionContent: res.data.data
                                })
                            }
                           
            
                        }
                    })

                    var data={
                        classID:res.data.mainContent._id
                    }
                    
                    axios.post("/recomendation/content",data, {validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{
                        if(res.status === 200)
                        {
                            if(res.data.message.length>0)
                            {
                                this.setState({
                                    recomendationSimilar:res.data.message
                                })
                            }
                        }
                        
                    })
                }
            }
            
        })


        var watchHistorypayload= {
            pagination: 20
        }
        axios.post('/render/class/watchHistory',watchHistorypayload, {validateStatus: function (status) { return status >= 200 && status < 600; }}).then( res =>{ 
            if(res.status === 200)
            {
                this.setState({
                    watchHistoryclasses:res.data.classes
                })
            }
        })

        axios.get('/course/listrating', {validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{
            if(res.status === 200)
            {
                this.setState({
                    ratingList:res.data.message
                })
            }
            else
            {
                this.setState({
                    ratingList:[]
                })

            }

        }) 

    }

    NoSection()
    {
        alert("No Section to watch")
    }

    getMainpageContentDetail()
    {
        var content = <h2>loading...</h2>

        

        if(this.state.sectionContent !== null)
        {
            content =   <div className="header-content text-md-center">
                            <h1 className="header_type_text">{this.state.class.name}</h1>
                            <p>{this.state.class.description}</p>
                            {this.Link()}
                        </div>
        }

        return content
        
    }

    Link()
    {
        var WatchLink = <Link to="#" onClick={()=>this.NoSection()} className="homepage_link">
                            <button className="btn">watch</button>
                        </Link>

        if( this.state.sectionContent !== null && this.state.sectionContent !== undefined)
        {
            if(this.state.sectionContent.length > 0)
            {
                WatchLink = <Link to={{pathname:"/watch/" + this.state.class._id+"/"+this.state.sectionContent[0]._id, state:{classID: this.state.class._id, prevPath:"/Homepage"}}} className="homepage_link">
                                <button className="btn">watch</button>
                            </Link>
            }
          
        }

        return WatchLink
    }

    errorImag(e)
    {
        e.target.src  = NoImageFound
    }


    getMainContentBackgroundVideo()
    {
        var content = <h2>loading...</h2>


        if(this.state.sectionContent !== null && this.state.sectionContent !== undefined)
        {
            if(this.state.sectionContent.length>0)
            {
                content = <ReactPlayer className='react-player-background' playing={true} loop={true} width="100%" height="100%" muted url= {this.state.sectionContent[0].videoUrl}/>
            }
            else
            {
                if(this.state.class !== null)
                {
                    content = <img className='react-player-background' width="100%" onError={this.errorImag} src={this.state.class.thumbnail} />
                }
                else
                {
                    content = <img className='react-player-background' width="100%" onError={this.errorImag} src={this.state.class.thumbnail} />
                }
            }

        }

        return content
    }

    modelClose = () => {
        this.props.ActionCloseModel()
    }
       
    render() 
    {
        const modelflag = this.props.state.Model.modelState

        if(document.getElementById('myModal') !== null)
        {
            if(modelflag)
            {
                document.getElementById('myModal').style.display="block"
            }
            else
            {
                document.getElementById('myModal').style.display="none"
            }
    
        }

        var loadModelClass = <h1>Failed to load class</h1>
        if (this.props.state.Model.class !== null)
        {
            loadModelClass = <GetModel></GetModel>
        }
       

        return (

            <div className="Homepage_mainContainer">
                <Menu></Menu>
                <div className="homePage_content_container">
                    <header className="Homepage-v-header container">
                        <div className="halfscreen-video-wrap">
                            {this.getMainContentBackgroundVideo()}
                        </div>

                        <div className="Homepage-header-overlay"></div>

                        {this.getMainpageContentDetail()}
                    </header>
                    <div className="mainHomepage_more_recommended_movie_title">
                        <h1>More Content</h1>
                        <Icon icon={ic_more_horiz} size={40} style={{color:"gold"}}></Icon>
                    </div>
                </div>

                <div className="homePage_content_container_morecontent">
                    <div className="homePage_content_container_morecontent_wrapper movie_content">                       
                        <div className="caresoleWrapper-homepage">
                            <div className="Searchcaresole">
                                <GetImageElement classes = {this.state.classes}></GetImageElement>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pop up Modal */}
                <div id="myModal" className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={this.modelClose}>&times;</span>
                        {loadModelClass}

                    </div>
                </div>

                <ContactFooter></ContactFooter>
                
                {/* Notification */}
                <div className="addedlistAlert" id="notification">
                    <p id="message">Sucessfully added to watch Later list</p>
                </div>
                
            </div>

               
        )
    }
}


const mapToState = (state) =>{
    return {
        state:state
    }
}

export default connect(mapToState,{ActionCloseModel}) (MainHomepage);