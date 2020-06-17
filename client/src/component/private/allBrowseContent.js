import React, { Component } from 'react'

import '../CSS/react-responsive-model.css';
import Modal from 'react-responsive-modal';

import axios from 'axios'

import {connect} from 'react-redux'
import {ActionCloseModel} from '../../redux/Action/ModelAction'

import Menu from '../private/componentofBrowse/Menu'
import GetImageElement from './componentofBrowse/getImageElement'
import GetModel from './componentofBrowse/getmodel'

class allBrowseContent extends Component 
{
    constructor(prop)
    {
        super(prop)

        this.state = {
            classes:null,
        }
    }

    componentDidMount()
    {
        if(this.props.match.params !== null)
        {
            if(this.props.match.params.categorie === "popular")
            {
                var popularpayload= {
                    pagination: 100
                }
                axios.post('/render/class/popular',popularpayload).then( res =>{ 
                    if(res.status === 200)
                    {
                        this.setState({
                            classes:res.data
                        })
                    }
                })
            }
            else if(this.props.match.params.categorie === "newlyadded")
            {
                var newlyaddedpayload= {
                    pagination: 100
                }
                axios.post('/render/class/newlyadded',newlyaddedpayload).then( res =>{ 
                    if(res.status === 200)
                    {
                        this.setState({
                            classes:res.data
                        })
                    }
                })
            }
            else
            {
                var healthpayload= {
                    categorie: this.props.match.params.categorie,
                    pagination: 20
                }
                axios.post('/render/class/categorie',healthpayload).then( res =>{ 
                    if(res.status === 200)
                    {
                        this.setState({
                            classes:res.data
                        })
                    }
                })
            }
        }

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
                    <div className="Searchcaresole">
                        <GetImageElement classes = {this.state.classes}></GetImageElement>
                        <GetImageElement classes = {this.state.classes}></GetImageElement>
                        <GetImageElement classes = {this.state.classes}></GetImageElement>
                        <GetImageElement classes = {this.state.classes}></GetImageElement>
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

export default connect(mapToState,{ActionCloseModel}) (allBrowseContent);