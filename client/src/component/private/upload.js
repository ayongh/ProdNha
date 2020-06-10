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
            image: null,
            sectionVideo:null,
            classCoverImg:null,
            url:'',
            percent: 0,
            newAddedIteam:[],
            newvideoListSection:[],
            categories:null
        }
    }
    
    componentDidMount()
    {
        axios.get('/course/getCategorie').then( res =>{ 
            if(res.status === 200)
            {
                this.setState({
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



    handleUpload=()=>{

        var className = document.getElementById('class_name').value
        var classDescription = document.getElementById('class_description').value
        var classTag = document.getElementById('class_tag').value
        var classCategorie = document.getElementById('class_categorie').value
        var classDirector = document.getElementById('class_director').value

        var sectionTitle = document.getElementById('section_name').value
        var sectionDescription = document.getElementById('section_description').value

        if(className !== '' && classDescription !== '' && classTag !== '' && classCategorie !== '' && classDirector !== '' && sectionDescription !== '' && sectionTitle!== '')        
        {
           
        }
        else
        {
            if(className === '')
            {
                document.getElementById('class_name').style.borderColor = 'red'
            }

            if(classDescription === '')
            {
                document.getElementById('class_description').style.borderColor = 'red'
            }

            if(classTag === '')
            {
                document.getElementById('class_tag').style.borderColor = 'red'
            }

            if(classCategorie === '')
            {
                document.getElementById('class_categorie').style.borderColor = 'red'
            }

            if(classDirector === '')
            {
                document.getElementById('class_director').style.borderColor = 'red'
            }

            if(sectionDescription === '')
            {
                document.getElementById('section_description').style.borderColor = 'red'

            }

            if(sectionTitle === '')
            {
                document.getElementById('section_name').style.borderColor = 'red'

            }

            console.log('please provide all the text area')
        }
        
    }

    classValidation()
    {

    }
    addSectionComponent=()=>{

        var newArray = this.state.newAddedIteam
        newArray.push(2)

        this.setState({
            newAddedIteam: newArray
        })
    }

    removeSectionComponent=()=>{

        var newArray = this.state.newAddedIteam
        newArray.pop()

        this.setState({
            newAddedIteam: newArray
        })
    }

    getSlectOption()
    {
        var option = ""
        if(this.state.categories !== null)
        {
            option = this.state.categories.map((val,index)=>{
                return(
                    <option value={val.categorie} key={val._id}>{val.categorie}</option>
                )
            })
        }

        return option;
    }
    render() 
    {
        const newSection = this.state.newAddedIteam.map((val,index)=>{
            return(
                <div className="reqired_section" key={index}>
                    <input id={"id"+index} type="text" placeholder="Title" ></input>
                    <textarea id={"desc"+index} rows={4} cols="50" maxLength="100" placeholder="Description"></textarea>
                    <input id={"video"+index} type="file" accept="video/mp4"></input>
                </div>
            )
        })

        return (
            <div className="body">
                <Menu></Menu>
                <div className="upload_container">
                    <h1>Create Class</h1>
                    <div className="classinfo_container">
                        <div className="classinfo">
                            <p className="p">Name</p>
                            <input type="text" id="class_name" placeholder="Name" required></input>
                            <p className="p">Description</p>
                            <textarea  id="class_description" rows={4} cols="50" maxLength="150" placeholder="Description"></textarea>
                            <p className="p">Tag</p>
                            <input type="text" id="class_tag" cols="100" placeholder="health, something, apple"></input>
                            
                            <p className="p">Categorie</p>
                            <select name="categorie" id="class_categorie">
                                {this.getSlectOption()}
                            </select>
                            <p className="p">Director</p>
                            <input type="text" id="class_director" placeholder="Director Name"></input>

                        </div>
                    </div>

                    <div className="class_cover_upload_container">
                        <div className="uploader">
                            <p className="p">Upload cover picture</p>
                            <input type="file" onChange={this.handleChangeCoverImage} accept="image/x-png,image/jpeg"/>
                        </div>
                        <img src={this.state.classCoverImg} className="classCoverPic"></img>
                    </div>
                    
                    <div className="container" id="containerProgressID" style={{visibility:"collapse", marginTop:"10px"}}>
                        <p><strong>Upload progress:</strong> {this.state.percent}%</p>
                    </div>

                    <h1>Create Section</h1>
                    <div className="reqired_section">
                        <input id="section_name" type="text" placeholder="Title"></input>
                        <textarea id="section_description" rows={4} cols="50" maxLength="150" placeholder="Description"></textarea>
                        <input type="file" accept="video/mp4"></input>
                    </div>
                    
                    {newSection}
                    <button onClick={this.addSectionComponent}>Add</button>
                    <button onClick={this.removeSectionComponent}>Remove</button>

                    <button onClick={this.handleUpload}>Create</button>
                </div>
                
            </div>
        )
    }
}

export default upload