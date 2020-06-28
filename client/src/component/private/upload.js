import React, { Component, useState } from 'react'
import axios from 'axios'

import {storage} from './firebaseStorage'

import firebase from "firebase"
import '../CSS/upload.css' //'./CSS/upload.css'

import Menu from './componentofBrowse/Menu'

class upload extends Component 
{
    //Constructor
    constructor(prop)
    {
        super(prop)

        this.state = {

            className:null,
            classDescription: null,
            classTag:null,
            classCategorie:null,
            classDirector:null,

            image: null,
            classCoverImg:null,

            video: null,
            videoUrl: null,

            poster:null,
            posterUrl:null,

            listOfSection: [],

            categories:null,

            title:null,
            discription:null,

            uploadClassImagepercent: 0,
            uploadSectionPosterPercent:0,
            uploadSectionVideoPercent:0,
            sectionUploading: null

        }

        this.handleUpload = this.handleUpload.bind(this)
    }
    
    componentDidMount()
    {
        axios.get('/course/getCategorie',{validateStatus: function (status) { return status >= 200 && status < 600; }}).then(async res =>{ 
            console.log(res.data.data)
            if(res.status === 200)
            {
                await this.setState({
                    categories:res.data.data
                })
            }
        })
    }

    handleChangeCoverImage = (e) =>{

        if(e.target.files.length > 0)
        {
            this.setState({
                image: e.target.files[0],
                classCoverImg:URL.createObjectURL(e.target.files[0])
            })
        }
        else
        {
            this.setState({
                image:null,
                classCoverImg:null
            })

        }
    }

    videoPlayerChange = (e)=>
    {
        if(e.target.files.length > 0)
        {
            this.setState(
                {
                    video : e.target.files[0],
                    videoUrl: URL.createObjectURL(e.target.files[0])
                }
            )
        }
        else
        {
            this.setState(
                {
                    video : null,
                    videoUrl: null
                }
            )
        }
    }

    handlePosterImage=(e)=>
    {
        if(e.target.files.length > 0)
        {
            this.setState({
                poster: e.target.files[0],
                posterUrl:URL.createObjectURL(e.target.files[0])
            })
        }
        else
        {
            this.setState({
                poster:null,
                posterUrl:null
            })

        }
    }

    checkEmptyInpute(){

        var className = document.getElementById('className').value
        var classDescription = document.getElementById('classDescription').value
        var classTag = document.getElementById('classTag').value
        var classCategorie = document.getElementById('classCategorie').value
        var classDirector = document.getElementById('classDirector').value

        console.log("classCategorie")

        console.log(classCategorie)

        var emptyFieldfound = false;

        if(className === '')
        {
            document.getElementById('className').style.borderColor = 'red'
            emptyFieldfound = true
        }
        else
        {
            document.getElementById('className').style.borderColor = 'black'

        }

        if(classDescription === '')
        {
            document.getElementById('classDescription').style.borderColor = 'red'
            emptyFieldfound = true

        }
        else
        {
            document.getElementById('classDescription').style.borderColor = 'black'

        }

        if(classTag === '')
        {
            document.getElementById('classTag').style.borderColor = 'red'
            emptyFieldfound = true

        }
        else
        {
            document.getElementById('classTag').style.borderColor = 'black'
        }

        if(classCategorie === '')
        {
            document.getElementById('classCategorie').style.borderColor = 'red'
            emptyFieldfound = true

        }
        else
        {
            document.getElementById('classCategorie').style.borderColor = 'black'

        }

        if(classDirector === '')
        {
            document.getElementById('classDirector').style.borderColor = 'red'
            emptyFieldfound = true
        }
        else
        {
            document.getElementById('classDirector').style.borderColor = 'black'
        }

        if(this.state.image === null)
        {
            document.getElementById('createclassImage').style.border = 'solid'
            document.getElementById('createclassImage').style.borderColor = 'red'
            emptyFieldfound = true
        }
        else
        {
            document.getElementById('createclassImage').style.border = 'none'

        }

        return emptyFieldfound

    }

    submitSection=(e)=>
    {

        var sectionTitle =document.getElementById('section_name').value 
        var sectionDescription = document.getElementById('section_description').value 

        if(sectionTitle !== '' && sectionDescription !== '' && this.state.video !== null && this.state.poster !== null)
        {
            var listofSection = this.state.listOfSection

            var data = {
                video: this.state.video,
                videoUrl: this.state.videoUrl,
    
                poster:this.state.poster,
                posterUrl: this.state.posterUrl,
    
                title: sectionTitle,
                description: sectionDescription
            }
    
            listofSection.push(data)
    
            this.setState({
    
                listOfSection:listofSection,
    
                video: null,
                videoUrl:null,
    
                poster:null,
                posterUrl:null
            })
    
            document.getElementById('SectionuploadVideo').value = null
            document.getElementById('SectionuploadPoster').value = null
            document.getElementById('section_name').value = null
            document.getElementById('section_description').value = null

        }
        else
        {
            alert("There is empty stuff there")
        }
       
    }

    deleteFromList(deleteindex)
    {

        var newSectionList = this.state.listOfSection.filter((value,index, arr)=>
        {
            return index !== deleteindex
        })



        this.setState({
            listOfSection: newSectionList
        })
    }

    getlistofSection()
    {
        var listSection = this.state.listOfSection
        var listSectionElement = null

       
       
        if(listSection.length > 0)
        {
            listSectionElement = listSection.map( (val, index) => {
                return (
                    <div className="listofSection_holder" key={index}>
                        <div className="section_video">
                            <video className="completeSectionVideo" poster={val.posterUrl} src={val.videoUrl} controls/>
                        </div>

                        <div className="section_text">
                            <h4>{val.title}</h4>
                            <p>{val.description}</p>
                            <button onClick={() => this.deleteFromList(index)}>Delete</button>
                        </div>
                    </div>
                )
            })
        }

        return listSectionElement
                        
    }


    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })

    }


    createClassNext()
    {
        if( !this.checkEmptyInpute())
        {
            document.getElementById('createClassContainer').style.display="none"
            var classMenu =  document.getElementById("classCreate")
            classMenu.classList.remove('submenuActive')

            document.getElementById('addSection').classList.add('submenuActive')
            document.getElementById('createSectionContainer').style.display="contents"
        }
    }

    createSectionPrev()
    {
        document.getElementById('createClassContainer').style.display="block"
        var classMenu =  document.getElementById("classCreate")
        classMenu.classList.add('submenuActive')

        document.getElementById('addSection').classList.remove('submenuActive')
        document.getElementById('createSectionContainer').style.display="none"
    }

    createSectionNext(){

        if(this.state.listOfSection.length >= 1 )
        {
            document.getElementById('addSection').classList.remove('submenuActive')
            document.getElementById('createSectionContainer').style.display="none"

            document.getElementById('completeUpload').classList.add('submenuActive')
            document.getElementById('uploadSubmitContent').style.display="block"

        }
        else
        {
            alert("you need at least one Section")
        }
    }

    handleUpload()
    {
        document.getElementById('uploadingProgress').style.display = "block"
        document.getElementById('uploadSubmitContent').style.display = "none"

        var privacyCheckBox = document.getElementById('privacyCheckBox').checked
        
        if(privacyCheckBox)
        {
           
            var storageRef = storage.ref()
            
            var imageRef = storageRef.child('image')

            var fileName = Date.now + this.state.image.name
            var spaceRef = imageRef.child(fileName)

            var uploadTask = spaceRef.put(this.state.image);

            uploadTask.on('state_changed',
            function(snapshot)
            {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                this.setState({
                    uploadClassImagepercent: progress
                })

            }.bind(this), 
            function(error){
                alert("error")
            },
            function (){
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    var data = 
                    {
                        name: this.state.className,
                        description: this.state.classDescription,
                        tag: this.state.classTag,
                        thumbnail: downloadURL,
                        categorie: document.getElementById('classCategorie').value,
                        director: this.state.classDirector
                    }
        
                    axios.post('/course/create',data, {validateStatus: function (status) { return status >= 200 && status < 600; }}).then( res =>{ 
                        if(res.status === 200)
                        {
                            console.log(res.data)
                           this.uploadSection(storageRef, res.data.data._id)
                        }
                    })
                }.bind(this));
            }.bind(this))
        }
    }


    uploadSection(storageRef, classID)
    {
        this.state.listOfSection.forEach((value,index)=>{

            var imageRef = storageRef.child('video')

            var fileName = Date.now() + value.video.name
            var spaceRef = imageRef.child(fileName)

            var uploadTask = spaceRef.put(value.video);

            uploadTask.on('state_changed',
            function(snapshot)
            {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                this.setState({
                    sectionUploadingFile: value.title,
                    uploadSectionVideoPercent: progress
                })

            }.bind(this), 
            function(error){
                alert("error")
            },
            function (){
                uploadTask.snapshot.ref.getDownloadURL().then(function(VideodownloadURL) {
                    var imageRef = storageRef.child('videoPoster')

                    var fileName = Date.now() + value.poster.name
                    var spaceRef = imageRef.child(fileName)

                    var uploadTask = spaceRef.put(value.poster);

                    uploadTask.on('state_changed',
                    function(snapshot)
                    {
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        this.setState({
                            sectionUploadingFile: value.title,
                            uploadSectionVideoPercent: progress
                        })

                    }.bind(this), 
                    function(error){
                        alert("error")
                    },
                    function (){
                        uploadTask.snapshot.ref.getDownloadURL().then(function(posterdownloadURL) {
                            var data = 
                            {
                                classID: classID,
                                name: value.title,
                                description: value.description,
                                poster: posterdownloadURL,
                                videoUrl: VideodownloadURL
                            }
                
                            axios.post('/section/create',data, {validateStatus: function (status) { return status >= 200 && status < 600; }}).then( res =>{ 
                                if(res.status === 200)
                                {
                                   alert("sucessfully uploaded")
                                }
                            })


                        }.bind(this));
                    }.bind(this))


                }.bind(this));
            }.bind(this))
        })
    }

    render() 
    {
        var completeVideo = null

        if(this.state.posterUrl !== null && this.state.videoUrl !== null)
        {
            completeVideo = <video className="completeSectionVideo" poster={this.state.posterUrl} src={this.state.videoUrl} controls/>
        }

        var uploadedSectionVideo = null

        if(this.state.videoUrl !== null)
        {
            uploadedSectionVideo = <video className="SectionVideo" src={this.state.videoUrl} controls/>

        }

        var option = <option value="none">None</option>

        if(this.state.categories !== null)
        {
            option = this.state.categories.map((val,index)=>{
                return(
                    <option value={val.categorie} key={val._id}>{val.categorie}</option>
                )
            })
        }

        console.log(this.state.className)


        return (
            <div className="body">
                <Menu></Menu>
                <div className="upload_container">
                    <div className="classinfo_container">
                        
                        <div className="classinfo">
                            <div className="uploadSubMenu">
                                <h4 className="uploadSubMenu_option submenuActive" id="classCreate">Create Class</h4>
                                <h4 className="uploadSubMenu_option" id="addSection">Add Section</h4>
                                <h4 className="uploadSubMenu_option" id="completeUpload">Complete Uploading</h4>

                            </div>

                            <div className="main_subclass_content">
                                {/* Create class */}
                                <div className="creat_class_content_wrapper" id="createClassContainer">
                                    <div className="create_class_inpute_wrapper">
                                        <div className="content_create_class creatclass_left">
                                            <p className="p">Name</p>
                                            <input type="text" id="className" placeholder="Name" onChange={this.handleChange} required></input>

                                            <p className="p">Description</p>
                                            <textarea  id="classDescription" rows={4} cols="50" onChange={this.handleChange}  maxLength="150" placeholder="Description"></textarea>

                                            <p className="p">Tag</p>
                                            <input type="text" id="classTag" cols="100" onChange={this.handleChange} placeholder="health, something, apple"></input>
                                            
                                        </div>

                                        <div className="content_create_class creatclass_right">
                                            <p className="p">Categorie</p>
                                            <select name="categorie" id="classCategorie" onChange={this.handleChange}>
                                                {option}
                                            </select>

                                            <p className="p">Director</p>
                                            <input type="text" id="classDirector" onChange={this.handleChange} placeholder="Director Name"></input>
                                        </div>
                                    </div>

                                    <div className="class_cover_upload_container">
                                        <div className="uploader">
                                            <p className="p">Upload cover picture</p>
                                            <input type="file" id="createclassImage" onChange={this.handleChangeCoverImage} accept="image/x-png,image/jpeg"/>
                                        </div>
                                        <img src={this.state.classCoverImg} className="classCoverPic"></img>
                                    
                                    </div>

                                    <button className="submit_create_class" onClick={() => this.createClassNext()}>Next</button>

                                </div>

                                {/* Create Section */}
                                <div className="add_section_content_wrapper" id="createSectionContainer">
                                    <div className="addedSectionList">
                                        {this.getlistofSection()}
                                    </div>

                                    <div className="reqired_section">
                                        <div className="uploadSection_text">
                                            <input id="section_name" type="text" placeholder="Title"></input>
                                            <textarea id="section_description" rows={4} cols="50" maxLength="150" placeholder="Description"></textarea>

                                        </div>

                                        <div className="display_content">
                                            <div className="content_one">
                                                <h3>uploaded Video</h3>
                                                <input className="videoUpload" id="SectionuploadVideo" type="file" accept="video/mp4" onChange={this.videoPlayerChange}></input>
                                                {uploadedSectionVideo}
                                            </div>

                                            <div className="content_two">
                                                <h3>uploaded Poster</h3>
                                                <input className="psterUpload" id="SectionuploadPoster" type="file" onChange={this.handlePosterImage} accept="image/x-png,image/jpeg"/>
                                                <img className="SectionPoster" src={this.state.posterUrl} className="classCoverPic"></img>
                                            </div>

                                            <div className="content_three">
                                                <h3>Display of poster and uploaded Video</h3>
                                                {completeVideo}
                                            </div>
                                        </div>
                                        <div className="submitButton">
                                            <button onClick={this.submitSection}>Submit Section</button>
                                        </div>

                                        <button id="sectionPrevious" onClick={() => this.createSectionPrev()}>previous</button>
                                        <button id="sectionNext" onClick={() => this.createSectionNext()}>Next</button>

                                    </div>
                                </div>

                                {/*accept and Submit privacy law*/}
                                <div className="SubmitUpload" id="uploadSubmitContent">
                                    <div className="uploadprivacyy_rule">
                                        <p>For content to be considered for removal, an individual must be uniquely identifiable by image, voice, full name, Social Security number, bank account number or contact information (e.g. home address, email address). Examples that would not violate our privacy guidelines include gamer tags, avatar names and address information in which the individual is not named. We also take public interest, newsworthinessand consent into account when determining if content should be removed for a privacy violation. YouTube reserves the right to make the final determination of whether a violation of its privacy guidelines has occurred.</p>
                                        <label><input id="privacyCheckBox" name="isAccepted" type="checkbox" onChange={this.handleCheckBoxChange}/> I Accept The privacy</label> 
                                    </div>

                                    <button onClick={this.handleUpload}>Upload</button>
                                </div>

                                <div className="displayUploadProgress" id="uploadingProgress">
                                    <label>Upload Class Poster</label>
                                    <p>progress: {this.state.uploadClassImagepercent} %</p>

                                    <label>Uploading Section {this.state.sectionUploading}</label>
                                    <p> poster progress: {this.state.uploadSectionPosterPercent} %</p>
                                    <p> Video progress: {this.state.uploadSectionVideoPercent} %</p>

                                </div>
                    
                            </div>

                        </div>

                        

                    </div>

               

                </div>
                
            </div>
        )
    }
}

export default upload