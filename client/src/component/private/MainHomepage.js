import React, { Component } from 'react'
import axios from 'axios'


import { Icon } from 'react-icons-kit'
import {ic_more_horiz} from 'react-icons-kit/md/ic_more_horiz'


import ReactPlayer from 'react-player'

import GetImageElement from './componentofBrowse/getImageElement'

import Menu from '../../component/private/componentofBrowse/Menu'
import ContactFooter from './componentofBrowse/contactfooter'

export default class MainHomepage extends Component 
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
                if(res.data.message.length>0)
                {
                    this.setState({
                        maincontent:res.data.mainContent,
                        class:res.data.mainContent,
                        classes:res.data.message
                    })

                    axios.get('/course/findSection/'+res.data.mainContent._id, {validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{ 
                        if(res.status === 200)
                        {
                            localStorage.setItem("video", JSON.stringify( res.data.data));
                            localStorage.setItem(this.state.class._id, JSON.stringify( res.data.data));
                            await this.setState({
                                sectionContent: res.data
                            })
            
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

    getMainpageContentDetail()
    {
        var content = <h2>loading...</h2>

        if(this.state.sectionContent !== null)
        {
            content =   <div className="header-content text-md-center">
                            <h1 className="header_type_text">{this.state.class.name}</h1>
                            <p>{this.state.class.description}</p>
                            <a className="btn" href="#about">watch</a>
                        </div>
        }

        return content
        
    }

    getMainContentBackgroundVideo()
    {
        var content = <h2>loading...</h2>

        if(this.state.sectionContent !== null)
        {
            if(this.state.sectionContent.data.length>0)
            {
                content = <ReactPlayer className='react-player-background' playing={true} loop={true} width="100%" height="100%" muted url="https://firebasestorage.googleapis.com/v0/b/nhadb-c07ce.appspot.com/o/video%2FReactJS-%20Upload%20Image%20to%20Firebase%20storage%20and%20Display%20on%20web..mp4?alt=media&token=93ac2909-d81c-4a5f-842f-e002660842fe" />
            }
            else
            {
                content = <ReactPlayer className='react-player-background' playing={true} loop={true} width="100%" height="100%" muted url="https://firebasestorage.googleapis.com/v0/b/nhadb-c07ce.appspot.com/o/video%2FReactJS-%20Upload%20Image%20to%20Firebase%20storage%20and%20Display%20on%20web..mp4?alt=media&token=93ac2909-d81c-4a5f-842f-e002660842fe" /> // <img src={this.state.class.thumbnail}></img>
            }

        }

        return content
    }

    render() 
    {
        if(this.state.sectionContent !== null)
        {
            console.log(this.state.class)
        }

        return (

            <div className="Homepage_mainContainer">
                <div className="login_nav">
                    <div className="login_nav_wrapper">
                        <a className="login_option" href="/Homepage" >Home</a>
                        <a className="login_option" href="/browse/movie">Browse</a>
                        <a className="login_option" href="/search/movie">Search</a>
                        <a className="login_option" href="/profile">profile</a>

                    </div>
                </div>

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
                                <GetImageElement classes = {this.state.classes}></GetImageElement>
                                <GetImageElement classes = {this.state.classes}></GetImageElement>
                                <GetImageElement classes = {this.state.classes}></GetImageElement>

                            </div>
                        </div>
                    </div>
                </div>

                <ContactFooter></ContactFooter>
                
                
            </div>

               
        )
    }
}
