import React, { Component } from 'react'

import axios from 'axios'

import Menu from '../../component/private/componentofBrowse/Menu'
import GetImageElement from './componentofBrowse/getImageElement'
import GetModel from './componentofBrowse/getmodel'

import {connect} from 'react-redux'
import {ActionCloseModel} from '../../redux/Action/ModelAction'

import { Icon } from 'react-icons-kit'
import {search} from 'react-icons-kit/feather/search'

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

    submitSerach = (e) =>
    {
        e.preventDefault();

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
        
        return (
            <div>
                <Menu></Menu>

                <div className="search_caresoleWrapper">
                    <div className="search_Main_container">
                        <form onSubmit={this.submitSerach}>
                            <div className="searchInputeFiled">
                                <Icon icon={search} className="searchIcon"></Icon>
                                <input className="search" id="search" onChange={this.handleChange} type="text" placeholder="Search"/>
                                <button hidden type="submit">submit</button>
                            </div>
                        </form>

                    </div>

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

export default connect(mapToState,{ActionCloseModel}) (Searchpage);