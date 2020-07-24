import React, { Component } from 'react'
import ReactPlayer from 'react-player'

import { Icon } from 'react-icons-kit'
import {arrowLeft2} from 'react-icons-kit/icomoon/arrowLeft2'
import {ic_play_arrow} from 'react-icons-kit/md/ic_play_arrow'
import {ic_pause} from 'react-icons-kit/md/ic_pause'

import {ic_forward_10} from 'react-icons-kit/md/ic_forward_10'
import {ic_replay_10} from 'react-icons-kit/md/ic_replay_10'

import {ic_volume_down} from 'react-icons-kit/md/ic_volume_down'
import {ic_volume_mute} from 'react-icons-kit/md/ic_volume_mute'
import {ic_volume_off} from 'react-icons-kit/md/ic_volume_off'
import {ic_volume_up} from 'react-icons-kit/md/ic_volume_up'
import {ic_fullscreen} from 'react-icons-kit/md/ic_fullscreen'
import {ic_subject} from 'react-icons-kit/md/ic_subject'
import {ic_skip_next} from 'react-icons-kit/md/ic_skip_next'
import {arrows_keyboard_right} from 'react-icons-kit/linea/arrows_keyboard_right'

import Duration from '../private/componentofBrowse/duration'
import {Link} from 'react-router-dom'

import axios from 'axios'




class public_video extends Component
{
    
    constructor(props ,context)
    {
        super(props,context)
        this.state= {

            url:null,

            sectionContents:null,
            similarSection:null,
            section:null,
            recomendationSimilar:null,

            ratingList:null,

            playing: true,
            duration: 0,

            hasNext:false,

            volume: 1,
            muted:false,
            countLike:0,

            onplayedProgress: 0,

            played:0,
            pausePlayIcon: ic_pause,

            volumeIcon: ic_volume_up,
            previousVolumeIcon:ic_volume_up

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

                    var sections = res.data.data
                    var foundaMatch = false
                    var indexouter = 0
                    sections.forEach(async (value,index)=>{
                        if(value._id === this.props.match.params.videoID)
                        {
                            indexouter =index
                            foundaMatch=true
                        }
                    })
                    
                    await this.setState({
                        section:res.data.data[indexouter]
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


        axios.get('/course/maylike/public/'+this.props.match.params.classID,{withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{ 
            if(res.status === 200)
            {
                this.setState({
                    recomendationSimilar:res.data.message
                })

            }
        })

        axios.get('/course/likeCount/'+this.props.match.params.classID,{withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{ 
            if(res.status === 200)
            {
                this.setState({
                    countLike:res.data.message
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

    getSimilarVideoList()
    {
        var videoList = null
        if(this.state.recomendationSimilar !== null)
        {
            videoList = this.state.recomendationSimilar.map((val,index)=>{
                return(
                    <a href={"/watch/"+val._id+"/none"} className="videoHref">
                        <div className="video_similar_ClassList">
                            <img key={val._id} src={val.thumbnail} className="caresoleImageClass"></img>
                            <div className="similarClassContent">
                                <h3>{val.name}</h3>
                                <p>{val.description}</p>
                            </div>
                        </div>

                    </a>
                )})
    
        }

        return videoList
       
    }

    getSectionList()
    {
        var videoList = null
        if(this.state.sectionContents !== null)
        {
            videoList = this.state.sectionContents.map((val,index)=>{
                return(
                    <Link className="Videolink" to={"/video/"+this.props.match.params.classID+"/"+val._id} onClick={()=>this.playlist(val)}>
                       <div className="sectonContent">
                            <Icon icon={arrows_keyboard_right} size={30}></Icon>
                            <p className="noMargin sectioncontentTitle">{val.name}</p>
                        </div>
                    </Link>
                )})
    
        }

        return videoList
       
    }


    handlePlayPause = () => {

        this.setState({
            playing: !this.state.playing
        })

        if(this.state.pausePlayIcon === ic_pause)
        {
            this.setState({
                pausePlayIcon: ic_play_arrow
            })
        }
        else
        {
            this.setState({
                pausePlayIcon: ic_pause
            })
        }
       
    }

    handlePlay = () => {
        console.log('onPlay')
        this.setState({ playing: true })
    }

    handlePause = () => {
        console.log('onPause')
        this.setState({ playing: false })
    }

    playlist(val)
    {
        this.setState({
            section: val,
            playing: true
        })
    }

    handleDuration = (duration) => {
        this.setState({ duration })
    }

    handleVolumeChange = e => {
        this.setState({ 
            volume: parseFloat(e.target.value),
            muted:false
        })

        if(e.target.value >= 0.50)
        {
            this.setState({
                volumeIcon:ic_volume_up
            })
        }
        else if(e.target.value < 0.20)
        {
            this.setState({
                volumeIcon:ic_volume_mute
            })
        }
        else if(e.target.value <= 0.50)
        {
            this.setState({
                volumeIcon:ic_volume_down
            })
        }
       
    }

    MuteVolume=()=>
    {
        if(this.state.muted === false)
        {
            this.setState({
                muted:true,
                previousVolumeIcon:this.state.volumeIcon,
                volumeIcon:ic_volume_off
            })
        }
        else
        {
            this.setState({
                muted:false,
                volumeIcon:this.state.previousVolumeIcon
            })
        }
       
    }

    handleProgress = state => {
        if (!this.state.seeking) {
          this.setState(state)
        }
    }

    handleSeekMouseDown = e => {
        this.setState({ seeking: true })
    }

    handleSeekChange = (e)=>
    {
        this.setState({ played: parseFloat(e.target.value), playing:true })
    }

    handleSeekMouseUp = e => {
        this.setState({ seeking: false })
        this.player.seekTo(parseFloat(e.target.value))
    }

    backward10Sec =()=>
    {
        if(parseFloat(this.state.played - 0.010) > 0.009)
        {
            this.setState({ seeking: true })
            this.setState({ played: parseFloat(this.state.played - 0.010), playing:true })
            this.setState({ seeking: false })
            this.player.seekTo(parseFloat(this.state.played - 0.01))
        }
        else
        {
            this.setState({ seeking: true })
            this.setState({ played: parseFloat(0), playing:true })
            this.setState({ seeking: false })
            this.player.seekTo(parseFloat(0))
        }
       
    }

    forward10Sec =()=>
    {
        if(parseFloat(this.state.played + 0.010) < 0.999)
        {
            this.setState({ seeking: true })
            this.setState({ played: parseFloat(this.state.played + 0.010), playing:true })
            this.setState({ seeking: false })
            this.player.seekTo(parseFloat(this.state.played + 0.01))
        }
        else
        {
            this.setState({ seeking: true })
            this.setState({ played: parseFloat(0.9999), playing:true })
            this.setState({ seeking: false })
            this.player.seekTo(parseFloat(0.9999))
        }
       
    }

    handleClickFullscreen = () => {

        var fullVideoPlayer = document.getElementById('videoPlayerall')

        if(fullVideoPlayer.clientWidth === window.innerWidth && fullVideoPlayer.clientHeight === window.innerHeight )
        {
            document.exitFullscreen()
        }
        else
        {
            fullVideoPlayer.requestFullscreen()
        }

    }

    ref = player => {
        this.player = player
    }

    hasNext(videoID)
    {
        if(this.state.sectionContents.length >1)
        {
            var hasNext = false

            this.state.sectionContents.forEach((val,index)=>
            {
                console.log(val)
            })
        }
        
    }

    render()
    {
        const {volume, muted, duration, played} = this.state

        var volumeinhundreds = volume*100
        volumeinhundreds = Math.trunc(volumeinhundreds)

        var url = false;
        var title = "Loading"
        var description = "loading"

        if(this.state.section !== null)
        {
            url = this.state.section.videoUrl
            title = this.state.section.name
            description = this.state.section.description
        }

        var nextIcon= null
        if(this.state.sectionContents !== null)
        {
            if(this.state.sectionContents.length>1)
            {
                nextIcon = <Icon className="nextSection" icon={ic_skip_next} size={25}></Icon>

            }
        }

        var count = this.state.countLike.length
      
        return (
            <div className="Video_container" id="videoContainer">

                <div className="videowarpper">
                    
                    <div className="videoTop">
                        <div className="video_warpper" id="videoPlayerall">
                            <a href="/" className="videoBackButton" id="backbutton"><Icon className="videobackbtn" size={40} icon={arrowLeft2}> </Icon> <span className="videobackHint">Back</span></a>
                            <ReactPlayer
                                ref={this.ref}
                                className='react-player'
                                url={url}
                                playing={this.state.playing}

                                volume={this.state.volume}
                                muted={muted}
                                
                                controls = {false}
                                pip={true}

                                config={{ file: { 
                                    attributes: {
                                    controlsList: 'nodownload'
                                    }
                                }}}
                                width='100%'
                                height='100%'

                                webkit-playsinline="true" 
                                playsinline="true"
                                onDuration={this.handleDuration}
                                onProgress={this.handleProgress}
                                onPlay={this.handlePlay}
                                onPause={this.handlePause}
                            />

                            <div className="Player_controller">
                                <div className="topVideoControllerWrapper progress">
                                    <p className="playDuration" id="progressbarDuration"><Duration seconds={duration} /></p>
                                    <input id="progressbar" className="slider" type="range" max={1} step='any' value={played}  
                                        onMouseDown={this.handleSeekMouseDown}
                                        onChange={this.handleSeekChange}
                                        onMouseUp={this.handleSeekMouseUp}/>

                                    <p className="playDuration" id="progressbarDuration"><Duration seconds={duration * (1 - played)} /></p>

                                </div>
                                <div className="buttomVideoControllerWrapper">
                                    <div className="pause_play">
                                        <Icon className="pausePlayIcon scale" icon={this.state.pausePlayIcon} onClick={this.handlePlayPause}  size={30} ></Icon>
                                    </div>
                                    <div className="backwardWrapper">
                                        <Icon className="backward scale" icon={ic_replay_10}  size={25} onClick={this.backward10Sec}></Icon>
                                    </div>

                                    <div className="forwardWrapper">
                                        <Icon className="forward scale" icon={ic_forward_10} onClick={this.forward10Sec}  size={25} ></Icon>
                                    </div>

                                    <div className="volumewrapper">
                                        <div className="videovolumeLogowrapper">
                                            <div className="volumesliderWrapper">
                                                <p className="volumeAmount">{volumeinhundreds}</p>
                                                <input id="volumeprogressbar" className="volumeSlider" step='any' type="range" min="0" max="1" onChange={this.handleVolumeChange} />
                                            </div>
                                            <Icon className="volumelogo" icon={this.state.volumeIcon} size={25} onClick={this.MuteVolume}></Icon>
                                        </div>
                                    
                                    </div>

                                    <div className="videoTitle">
                                        <p>{title}</p>
                                    </div>

                                    <div className="listofVideo">

                                        <div className="sectionwrapper" id="sectionwrapper">
                                            <div className="listofVideoContentWrapper">
                                                
                                                <h4 className="sectionTitle">Section</h4>
                                                {this.getSectionList()}
            
                                            </div>
                                        </div>
                                        
                                        <Icon className="listofVideoLogo" icon={ic_subject} size={25} onClick={this.openSectionList}></Icon>
                                    </div>

                                    <div className="hasNext scale">
                                        {nextIcon}
                                    </div>

                                    <div className="fullscreen">
                                        <Icon className="fullscreenlogo scale" onClick={()=>this.handleClickFullscreen()} icon={ic_fullscreen} size={25}></Icon>
                                    </div>

                                </div>
                                
                            </div>

                        
                        </div>
                    </div>

                    <div className="videoBottom">
                        <div className="about_videoPlaying_Section">
                            <h3>{title}</h3>
                            <p>Likes {count}</p>
                            <p className="noMargin">{description}</p>
                            
                        </div>
                    </div>
                </div>
                <div className="NextVideo_container_wrapper">
                    <div className="videoWrappercontainer">
                        <nav className="videoNavBar">
                            <button id="btnSection" onClick={()=>this.changeNav("btnSection")} href="#section">Section <span id="spanSection"></span></button>
                            <button id="btnSimilar" onClick={()=>this.changeNav("btnSimilar")} href="#similar">Commments<span id="spanSimilar"></span></button>
                        </nav>

                        <div className="popupSectionContent">
                            <section id="section" className="smilarclass">
                                { this.getSimilarVideoList()}
                            </section>

                            <section id="similar" className="commmentSection">
                                <div className="chatWrapper">
                                    <div className="chatcomp">
                                        <div className="Userchat">
                                            <div className="userInfo">
                                                <p>Abhishek</p>
                                                <p>04:20 pm</p>
                                            </div>
                                            <p>Welcome To the chat section of the application</p>
                                        </div>
                                    </div>
                                    <div className="chatSubmit">
                                        <form>
                                            <input type="text" className="chatinpute"></input>
                                            <button type="submit" className="submitbutton">send</button>
                                        </form>
                                    </div>
                                </div>
                               
                            </section>
                        </div>
                    
                    </div>
                </div>

            </div>
            
        )
    }  
}

export default public_video;
