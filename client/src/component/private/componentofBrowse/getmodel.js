import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

import ReactPlayer from 'react-player'

import {buttonCheck} from 'react-icons-kit/metrize/buttonCheck'
import {buttonAdd} from 'react-icons-kit/metrize/buttonAdd'
import {heartOutline} from 'react-icons-kit/typicons/heartOutline'
import {heart} from 'react-icons-kit/typicons/heart'

import {cross} from 'react-icons-kit/metrize/cross'
import { Icon } from 'react-icons-kit'

import NoImageFound from '../../img/nophoto.png'

import {connect} from 'react-redux'
import {ActionInitModel} from '../../../redux/Action/ModelAction'

class getmodel extends Component 
{

    constructor(props)
    {
        super(props)
        this.state= {
            class: this.props.state.Model.class,

            ratingList:null,
            watchHistoryclasses:null,

            recomendationSimilar:null,
            sectionContent:null
        }
    }

    componentDidMount()
    {
        axios.get('/course/findSection/'+this.props.state.Model.class._id,{withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{ 
            if(res.status === 200)
            {
                localStorage.setItem("video", JSON.stringify( res.data.data));
                //localStorage.setItem(this.state.class._id, JSON.stringify( res.data.data));
                await this.setState({
                    sectionContent: res.data
                })

            }
        })

        var data={
            classID:this.props.state.Model.class._id
        }
        axios.post("/recomendation/content",data,{withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{
            if(res.data.message.length>0)
            {
                this.setState({
                    recomendationSimilar:res.data.message
                })
            }
        })

        axios.get('/course/listrating', {withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{
            if(res.status === 200)
            {
                this.setState({
                    ratingList:res.data.message
                })
            }

        }) 

        var watchHistorypayload= {
            pagination: 20
        }
        axios.post('/render/class/watchHistory',watchHistorypayload,{withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( res =>{ 
            if(res.status === 200)
            {
                this.setState({
                    watchHistoryclasses:res.data.classes
                })
            }
        })
    }

    changeNav(id)
    {
        if(id === "btnSection")
        {
            document.getElementById("btnSection").style.borderBottom="solid"
            document.getElementById("btnSimilar").style.borderBottom="none"

            document.getElementById("section").style.display = "block"
            document.getElementById("similar").style.display = "none"
        }

        if(id==="btnSimilar")
        {
            document.getElementById("btnSection").style.borderBottom="none"
            document.getElementById("btnSimilar").style.borderBottom="solid"
            document.getElementById("section").style.display = "none"
            document.getElementById("similar").style.display = "inline-flex"
        }
    }

    getModelImage()
    {
        if(this.state.sectionContent !== null && this.state.sectionContent.data.length > 0)
        {
            return(
                <div className="caresole_image_wrapper_container">
                    <img className="popup_image" onError={this.errorImag} src={this.state.class.thumbnail} alt={'apple'}/>
                    <Link to={{ pathname: "/watch/" + this.state.sectionContent.data[0]._id, state:{classID: this.state.class._id, prevPath:"/browse/movie"}}}>
                        <div className="popup_image_description">
                            <Icon className="popup_movie_btn" size={150} icon={buttonCheck}></Icon>
                        </div>
                    </Link>
                    
                </div>
            )
        }
        else
        {
            return(
                <div className="caresole_image_wrapper_container">
                    <img className="popup_image" onError={this.errorImag} src={this.state.class.thumbnail} alt={'apple'}/>
                    <div className="popup_image_description">
                        <Icon className="popup_movie_btn" size={150} icon={buttonCheck}></Icon>
                    </div>
                </div>
            )
        }
    }

    RenderLikeButton(val)
    {
        var liked = "liked"+val._id
        var like = "like"+val._id      
          
        if(this.state.ratingList !== null)
        {
            var found =false;   
            this.state.ratingList.map(element=>{
                if(element.classID === val._id)
                {
                   found = true

                }
            })

        

            if(found=== true)
            {
                if(document.getElementById(liked) != null)
                {
                    document.getElementById(liked).style.display="flex"
                    document.getElementById(like).style.display="none"

                }
            }
            else
            {
                if(document.getElementById(like) != null)
                {
                    document.getElementById(like).style.display="flex"
                    document.getElementById(liked).style.display="none"

                }
            }
        }  
        else
        {
            if(document.getElementById(like) != null)
            {
                document.getElementById(like).style.display="none"
                document.getElementById(liked).style.display="flex"

            }
        }      
    }



    Renderwatchlistbutton(val)
    {
        if(this.state.watchHistoryclasses !== null)
        {
            var add = "add"+val._id
            var remove = "remove"+val._id

            var found =false;
            this.state.watchHistoryclasses.map(element=>{
                if(element._id === val._id)
                {
                   found = true
                }
                return found
            })

            if(found=== true)
            {
                if(document.getElementById(remove) != null)
                {
                    document.getElementById(add).style.display="none"
                    document.getElementById(remove).style.display="flex"

                }
            }
            else
            {
                if(document.getElementById(add) != null)
                {
                    document.getElementById(add).style.display="flex"
                    document.getElementById(remove).style.display="none"

                }
            }
            
        }  
    }
   
    errorImag(e)
    {
        e.target.src  = NoImageFound
    }

    getSimilarclass()
    {
        var similarContentElement

        if(this.state.recomendationSimilar !== null)
        {
            similarContentElement = this.state.recomendationSimilar.map((val,index) =>
            {
                return(
                    <div className="contentWraperSimilar" key={index} onClick={() =>this.similarMovieBotton(val)}>
                        <img className="caresoleImage_similar_class" onError={this.errorImag} src={val.thumbnail} alt={'apple'}/>
                        <h3>{val.name}</h3>
                    </div>
                )

            })
            
        }
        
        return similarContentElement
        
    }

    getModelEpisodes()
    {
        const episodes = this.state.sectionContent
        var episodeElement

        if (episodes !== null && episodes.data.length > 0)
        {
            episodeElement = episodes.data.map( (val, index) => {
                return (
                    <div key= {val._id} className="contentWraper_episode_content">
                        <Link to={{pathname:"/watch/" + this.state.class._id+"/"+val._id, state:{classID: this.state.class._id, prevPath:"/browse/movie"}}} className="episode_link">
                            <ReactPlayer playing={false} className="caresoleImage_episode" width = {this.state.videowidth} height = "auto" url={val.videoUrl} light={true} ></ReactPlayer>
                        </Link>

                        <div className="caresole_episode_desc">
                            <h2 className="noMargin nohref">{val.name}</h2>
                            <p className="noMargin nohref">Episode {index+1}</p>
                        </div>
                    </div>
                )
            }) 
        }
        else
        {
            return(
                <div className="noepisode">
                    <p>No video found for this class</p>
                </div>
            )
        }

        return episodeElement;
    }

    removeLikeAction(classID)
    {
        var payload= {
            classID: classID
        }

        var liked = "liked"+classID._id
        var like = "like"+classID._id

        axios.post('/course/like/remove', payload, {withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{
            if(res.status === 200)
            {  
                
                document.getElementById(like).style.display="flex"
                document.getElementById(liked).style.display="none"             
                document.getElementById("message").innerHTML = "Class sucessfully disliked"
                document.getElementById('notification').style.background="brown"

                document.getElementById('notification').style.display="flex"
                setTimeout(function(){ 
                    document.getElementById('notification').style.display="none"
        
                }, 1000);

                axios.get('/course/listrating', {withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{
                    if(res.status === 200)
                    {
                        this.setState({
                            ratingList:res.data.message
                        })
                    }
        
                }) 
            }
    
        }) 
    }

    LikeAction( classID)
    {
        var payload= {
            classID: classID
        }

        var liked = "liked"+classID._id
        var like = "like"+classID._id
        
        axios.post('/course/like', payload, {withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{
            if(res.status === 200)
            {  
                
                document.getElementById(liked).style.display="flex"
                document.getElementById(like).style.display="none"
                document.getElementById('notification').style.background="green"

                document.getElementById("message").innerHTML = "Sucessfully liked a class"
                document.getElementById('notification').style.display="flex"
                setTimeout(function(){ 
                    document.getElementById('notification').style.display="none"
                }, 1000);

                axios.get('/course/listrating', {withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{
                    if(res.status === 200)
                    {
                        this.setState({
                            ratingList:res.data.message
                        })
                    }
        
                }) 
            }
    
        }) 
    }

    addlist(val)
    {
        
        var data={
            classID:val._id
        }

        var add = "add"+val._id
        var remove = "remove"+val._id

        axios.post("/user/info/update/watchLater",data,{withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{
            if(res.status === 200)
            {
                if(document.getElementById(remove) != null)
                {
                    document.getElementById(add).style.display="none"
                    document.getElementById(remove).style.display="flex"

                }
                document.getElementById("message").innerHTML = "Class sucessfully add to the Watch List"
                document.getElementById('notification').style.display="flex"
                document.getElementById('notification').style.background="green"

                setTimeout(function(){ 
                    document.getElementById('notification').style.display="none"
                }, 1000);

                var watchHistorypayload= {
                    pagination: 20
                }
                axios.post('/render/class/watchHistory',watchHistorypayload,{withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( res =>{ 
                    if(res.status === 200)
                    {
                        this.setState({
                            watchHistoryclasses:res.data.classes
                        })
                    }
                })
            }
        })
    }

    removeList(val)
    {
        var data={
            classID:val._id
        }

        var add = "add"+val._id
        var remove = "remove"+val._id

        axios.post("/user/info/update/watchLater/remove",data,{withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{
            if(res.status === 200)
            {
                if(document.getElementById(add) != null)
                {
                    document.getElementById(add).style.display="flex"
                    document.getElementById(remove).style.display="none"

                }
                document.getElementById("message").innerHTML = "Class sucessfully removed from the Watch List"
                document.getElementById('notification').style.display="flex"
                document.getElementById('notification').style.background="brown"

                setTimeout(function(){ 
                    document.getElementById('notification').style.display="none"
                }, 1000);

                var watchHistorypayload= {
                    pagination: 20
                }
                axios.post('/render/class/watchHistory',watchHistorypayload,{withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( res =>{ 
                    if(res.status === 200)
                    {
                        this.setState({
                            watchHistoryclasses:res.data.classes
                        })
                    }
                })
            }
        })
    }

    similarMovieBotton(value)
    {
        this.setState
        ({
            class:value
        })
        
        axios.get('/course/findSection/'+value._id,{withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{ 
            if(res.status === 200)
            {
                localStorage.setItem("video", JSON.stringify( res.data.data));
                // localStorage.setItem(this.state.class._id, JSON.stringify( res.data.data));
                await this.setState({
                    sectionContent: res.data
                })

            }
        })

        var data={
            classID:value._id
        }
        axios.post("/recomendation/content",data,{withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{
            if(res.data.message.length>0)
            {
                this.setState({
                    recomendationSimilar:res.data.message
                })
            }
        })

        axios.get('/course/listrating', {withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{
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

        var watchHistorypayload= {
            pagination: 20
        }
        axios.post('/render/class/watchHistory',watchHistorypayload,{withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( res =>{ 
            if(res.status === 200)
            {
                this.setState({
                    watchHistoryclasses:res.data.classes
                })
            }
        })
    }

    render()
    {
        if(this.props.state.Model.modelState)
        {
            return(
                <div className="popUp_img_container">
                    <div className="popup_title">
                        <h4>{this.state.class.name}</h4>
                    </div>

                    <div className="caresole_popup_img">
                        <div className="caresole_wrapper">
                            <div className="caresole_image_wrapper">
                                {this.getModelImage()}
                            </div>

                            <div className="caresole_popup_container">
                                <h1>{this.state.class.name}</h1>
                                <p className="popup_description">
                                    {this.state.class.description}
                                </p>
                                <div className="popup_action">
                                    <Icon className="popup_movie_btn liked" style={{display:"none"}} id={"liked"+this.state.class._id} size={40} icon={heartOutline} onClick={() =>this.removeLikeAction(this.state.class)}></Icon>
                                    <Icon className="popup_movie_btn" id={"like"+this.state.class._id} style={{display:"none", color:"pink"}} size={40} icon={heart} onClick={() =>this.LikeAction(this.state.class)}></Icon>
                                    {this.RenderLikeButton(this.state.class)}

                                    <Icon className="popup_movie_btn" id={"add"+this.state.class._id} size={40} icon={buttonAdd} onClick={() =>this.addlist(this.state.class)}></Icon>
                                    <Icon className="popup_movie_btn" id={"remove"+this.state.class._id}  size={40} icon={cross} onClick={() =>this.removeList(this.state.class)}></Icon>
                                    {this.Renderwatchlistbutton(this.state.class)}

                                </div>
                                <div className="popup_content_wraper">
                                    <nav>
                                        <button id="btnSection" onClick={()=>this.changeNav("btnSection")} href="#section">Section <span id="spanSection"></span></button>
                                        <button id="btnSimilar" onClick={()=>this.changeNav("btnSimilar")} href="#similar">Similar Classes <span id="spanSimilar"></span></button>
                                    </nav>

                                    <div className="popupSectionContent">
                                        <section id="section" className="Episodes">
                                            { this.getModelEpisodes()}
                                        </section>

                                        <section id="similar">
                                            {this.getSimilarclass()}
                                        </section>
                                    </div>
                                
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            )
        }
        else
        {
            return(
                <div>
                    <h3>closing</h3>
                </div>
            )
        }
    }


    
}

const mapToState = (state) =>{
    return {
        state:state
    }
}

export default connect(mapToState,{ActionInitModel}) (getmodel);