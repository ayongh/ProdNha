import React, { Component } from 'react'

import '../CSS/react-responsive-model.css';

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

    modelClose = () => {
        this.props.ActionCloseModel()
    }


    render() {
        const modelflag = this.props.state.Model.modelState

        if(document.getElementById('myModal') !== null)
        {
            if(modelflag)
            {
                document.getElementById('myModal').style.display="block"
            }
            else
            {
                document.getElementById('myModal').style.display="none"
            }
    
        }

        var loadModelClass = <h1>Failed to load class</h1>
        if (this.props.state.Model.class !== null)
        {
            loadModelClass = <GetModel></GetModel>
        }

        var title = "Title"

        if(this.props.match.params.categorie !== undefined)
        {
            switch(this.props.match.params.categorie)
            {
                case "popular":
                    title="Poplular"
                    break;

                case "newlyadded":
                    title="Newly added"
                    break;
            }
        }

        return (
            <div>
                <Menu></Menu>

                <div className="allBrowse_caresoleWrapper">
                    <h2 className="browse_all_title">{title}</h2>
                    <div className="Searchcaresole">
                        <GetImageElement classes = {this.state.classes}></GetImageElement>
                    </div>
                </div>

                <div className="addedlistAlert" id="notification">
                    <p id="message">Sucessfully added to watch Later list</p>
                </div>

                {/* Pop up Modal */}
                <div id="myModal" class="modal">
                    <div class="modal-content">
                        <span class="close" onClick={this.modelClose}>&times;</span>
                        {loadModelClass}

                    </div>
                </div>
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