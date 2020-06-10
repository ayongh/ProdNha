import React, { Component } from 'react'
import Modal from 'react-responsive-modal';

import axios from 'axios'

import Menu from '../../component/private/componentofBrowse/Menu'
import GetImageElement from './componentofBrowse/getImageElement'
import GetModel from './componentofBrowse/getmodel'

import {connect} from 'react-redux'
import {ActionCloseModel} from '../../redux/Action/ModelAction'

class Searchpage extends Component 
{
    constructor(prop)
    {
        super(prop)

        this.state = {
            search:null,
            classes:[],
        }
    }

    handleChange = (e) =>
    {
        this.setState({
            [e.target.id]: e.target.value
        })

        axios.get('/course/search/'+this.state.search).then( res =>{ 
            if(res.status === 200)
            {
                this.setState({
                    classes:res.data.data
                })
            }
        })

    }

    onCloseModal = () => {
        this.props.ActionCloseModel()
    }

    render() {
        
        return (
            <div>
                <Menu></Menu>
                <h2 className="CaresoleCategorie">{this.props.categorie}</h2>
                <div className="caresoleWrapper">
                    <input className="search" id="search" onChange={this.handleChange} type="text" placeholder="Search"/>

                    <div className="Searchcaresole">
                        <GetImageElement classes = {this.state.classes}></GetImageElement>
                    </div>
                </div>

                <div className="addedlistAlert" id="notification">
                    <p id="message">Sucessfully added to watch Later list</p>
                </div>

                <Modal open={this.props.state.Model.modelState} onClose={this.onCloseModal} center style={{color:"white", width:"90vw",height:"80vh"}}>
                    <GetModel></GetModel>
                </Modal>
            </div>
        );
    }
}



const mapToState = (state) =>{
    return {
        state:state
    }
}

export default connect(mapToState,{ActionCloseModel}) (Searchpage);