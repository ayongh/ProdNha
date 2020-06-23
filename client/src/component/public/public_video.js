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

            sectionContents:null
        }

    }

    componentDidMount()
    {
        axios.get('/course/findSection/public/'+this.props.match.params.classID,{validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{ 
            if(res.status === 200)
            {
                await this.setState({
                    sectionContents: res.data.data,
                    url: res.data.data[0].videoUrl
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
        if(this.state.sectionContents !== null)
        {
            var videoList = this.state.sectionContents.map((val,index)=>{
                return(
                    <ReactPlayer key={val._id}  onClick={()=>this.playlist(val)} className="caresoleImage_episode" width = "100%" height = "auto" url={val.videoUrl}></ReactPlayer>
                )})
    
            return videoList
        }
       
    }

    getNextPlaying()
    {

        if(this.state.section !== null)
        {
            return(
                <div className="contentWraper_episode_content">
                    <img className="caresoleImage_episode_video" src={this.state.section.thumbnail} alt={'apple'}/>
                    <div className="caresole_episode_desc">
                        <p className="noMargin">playing</p>
                        <p className="noMargin">{this.state.section.name}</p>
                        <p className="noMargin">Duration: {this.state.duration + " s"}</p>
                    </div>
                </div>
            )
        }
        
    }

    getpauseContent()
    {

        if(this.state.section !== null)
        {
            return(
                <div className="pauseContent">
                    <h1>{this.state.section.name}</h1>
                    <p>{this.state.section.description}</p>
                    <p> Duration: {this.state.duration}</p>
                </div>
            )
        }
        
    }

    render()
    {
        var player = <h1>Loading</h1>

        if(this.state.url !== null)
        {
            player = <Player
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

        return (
            <div className="Video_container" >
                <div className="video_warpper" onContextMenu={(e)=> e.preventDefault()}>
                    <a href="/" className="videoBackButton"><Icon className="videobackbtn" size={40} icon={arrowLeft2}> </Icon> <span class="videobackHint">Back</span></a>
                   {player}
                    
                </div>
                
                <div className="NextVideo_container_wrapper">
                    <div className="NextVideo_container">
                        <div className="Next_video">                        
                            <h2>videos</h2>

                            {this.getVideoList()}
                        </div>

                    </div>
                </div>

            </div>
            
        )
    }  
}

export default public_video;
