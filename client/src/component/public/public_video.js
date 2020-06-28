import React, { Component } from 'react'
import ReactPlayer from 'react-player'

import axios from 'axios'
import { Player,BigPlayButton,ControlBar, ReplayControl,ForwardControl } from 'video-react';

import { Icon } from 'react-icons-kit'
import {arrowLeft2} from 'react-icons-kit/icomoon/arrowLeft2'


class public_video extends Component
{
    
    constructor(props ,context)
    {
        super(props,context)
        this.state= {

            url:null,

            sectionContents:null,
            similarSection:null
        }

    }

    componentDidMount()
    {

        axios.get('/course/findSection/public/'+this.props.match.params.classID,{validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{ 

            if(res.status === 200)
            {
                if(res.data.data.length<=0)
                {
                    await this.setState({
                        sectionContents: res.data.data,
                        similarSection: res.data.similarSection,
                        url:false
                    })
                }
                else
                {
                    await this.setState({
                        sectionContents: res.data.data,
                        similarSection: res.data.similarSection,
                        url: res.data.data[0].videoUrl
                    })
                }
               

            }
            else
            {
                this.setState({
                    url:false
                })
            }
        })
        
    }

    playlist(val){
        this.setState({
            url: val.videoUrl
        })
        this.player.load();
    }

    getVideoList()
    {
        if(this.state.similarSection !== null)
        {
            var videoList = this.state.similarSection.map((val,index)=>{
                return(
                    <ReactPlayer key={val._id}  onClick={()=>this.playlist(val)} className="caresoleImage_episode" width = "100%" height = "auto" url={val.videoUrl}></ReactPlayer>
                )})
    
            return videoList
        }
       
    }

    getSimilarvideoList()
    {
        if(this.state.sectionContents !== null)
        {
            var videoList = this.state.sectionContents.map((val,index)=>{
                return(
                    <ReactPlayer key={val._id}  onClick={()=>this.playlist(val)} className="caresoleImage_episode" width = "100%" height = "auto" url={val.videoUrl}></ReactPlayer>
                )})
    
            return videoList
        }
       
    }


    render()
    {
        
        var Videoplayer = <h1>Loading</h1>

        if(this.state.url !== null)
        {
            if(this.url === false)
            {

            }
            else
            {
                Videoplayer = <Player
                width = {this.state.videowidth}
                height = {100}
                ref={player => {
                    this.player = player;
                }}
                >
                <source src={this.state.url} />
                <BigPlayButton position="center" />
                <ControlBar autoHide={true} className="my-class">         
                    <ReplayControl seconds={10} order={2.3} />
                    <ForwardControl seconds={10} order={3.3} />
                </ControlBar>
        
                </Player>
            }
           
    
        }

        return (
            <div className="Video_container" >
                <div className="video_warpper" >
                    <a href="/" className="videoBackButton"><Icon className="videobackbtn" size={40} icon={arrowLeft2}> </Icon> <span class="videobackHint">Back</span></a>
                   {Videoplayer}
                </div>

                <div className="video_next">
                    <div className="video_next_left">
                        <h3>Title</h3>
                        <p>Description of the video goes here </p>
                    </div>

                    <div className="video_next_right">
                        <h3>Next</h3>
                        <h3>playing next title</h3>
                        <p>Description of the video goes here </p>
                    </div>
                </div>
 
                
                <div className="NextVideo_container_wrapper">
                    <div className="NextVideo_container">
                        <div className="Next_video">                        
                            <h2>videos</h2>
                            {this.getVideoList()}
                            <h2>Similar Video</h2>
                            {this.getSimilarvideoList()}
                        </div>

                    </div>
                </div>

            </div>
            
        )
    }  
}

export default public_video;
