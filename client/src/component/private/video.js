import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { Icon } from 'react-icons-kit'
import {arrowLeft2} from 'react-icons-kit/icomoon/arrowLeft2'


class video extends Component
{
    
    constructor(props)
    {
        super(props)
        this.state= {
            classID: this.props.location.state.classID,

            sectionID:this.props.match.params.videoID,
            section:null,
        
            sectionData: JSON.parse( localStorage.getItem('video')),
            duration:null,
            progressValue:null,
            index:0,

            playing: true,
            url: null,
            control:true,
            videowidth: '80%'
        }
    }

    componentDidMount()
    {
        this.state.sectionData.forEach(element => {
            if(element._id === this.state.sectionID)
            {
                this.setState({
                    section:element,           
                    url: element.videoUrl
                })
            }
        });

        if(window.innerWidth<=640)
        {
            this.setState({
                videowidth:"100%"
            })
        }
        
    }

    handleminimize=()=>
    {
        this.setState({
            control:false
        })
    }

    handleMaximize=()=>
    {
        this.setState({
            control:true
        })
    }

    onEnded=()=>
    {
        
    }

    handleProgress =(a)=>
    {
        this.setState({
            progressValue: a
        })
    }

    handleDuration = (duration) => {
        this.setState({
            duration: duration
        })
    }

    playlist(data)
    {
        this.setState({
            url: data.videoUrl,
            section:data          
        })
    }

    getVideoList()
    {
        var videoList = this.state.sectionData.map((val,index)=>{
        return(
            <ReactPlayer key={val._id}  onClick={()=>this.playlist(val)} className="caresoleImage_episode" width = "100%" height = "auto" url={val.videoUrl+"#t=0,10"}></ReactPlayer>
        )})

        return videoList
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

    async getImageBlobURL()
    {
        var file = new Blob([this.state.url], {type: "text/javascript"})
        var url = URL.createObjectURL(file)

        console.log(url)        
    }

    pauseContentPlay()
    {
        this.setState({
            playing:false
        })

    }

    render()
    {
        var returback="/Homepage"
        if(this.props.location.state.prevPath !== undefined)
        {
            returback = this.props.location.state.prevPath
        }

        return (
            <div className="Video_container" >
                <div className="video_warpper" onContextMenu={(e)=> e.preventDefault()}>
                    <a href={returback} className="videoBackButton"><Icon className="videobackbtn" size={40} icon={arrowLeft2}> </Icon> <span class="videobackHint">Back</span></a>
                    <ReactPlayer 
                        id="reactplayyer"
                        url= {this.state.url}
                        className='react-player'
                        pip={false}
                        playing={this.state.playing}
                        controls={this.state.control}
                        onEnablePIP	={this.handleminimize}
                        onDisablePIP = {this.handleMaximize}
                        onProgress={this.handleProgress}
                        onDuration={this.handleDuration}
                        onPause ={this.handlePause}
                        onPlay= {this.handleonplay}
                        onEnded={this.onEnded}
                        width = {this.state.videowidth}
                        height = "100%"
                        config={{ file: {
                            attributes: {
                                controlsList: 'nodownload'
                            }
                        }}}
                    />

                    
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

export default video;
