import React, { Component } from 'react'

import '../CSS/react-responsive-model.css';
import '../CSS/skeleton-loading.css';

import axios from 'axios'

import Menu from '../private/componentofBrowse/Menu'
import GetTitleElement from './componentofBrowse/browseTitle'
import GetImageElement from './componentofBrowse/getImageElement'
import GetModel from './componentofBrowse/getmodel'

import {connect} from 'react-redux'
import {ActionCloseModel} from '../../redux/Action/ModelAction'
import Skeleton from 'react-loading-skeleton';


class BrowsePage extends Component 
{
    constructor(prop)
    {
        super(prop)

        this.state = {
            Popularclasses:null,
            newlyaddedclasses:null,
            healthclasses:null,
            educationclasses:null,
            watchHistoryclasses:null,
            
        }
    }

    componentDidMount()
    {
        var popularpayload= {
            pagination: 20
        }
        axios.post('/render/class/popular',popularpayload).then( res =>{ 
            if(res.status === 200)
            {
                this.setState({
                    Popularclasses:res.data
                })
            }
        })

        var newlyaddedpayload= {
            pagination: 20
        }
        axios.post('/render/class/newlyadded',newlyaddedpayload).then( res =>{ 
            if(res.status === 200)
            {
                this.setState({
                    newlyaddedclasses:res.data
                })
            }
        })

        var watchHistorypayload= {
            pagination: 20
        }
        axios.post('/render/class/watchHistory',watchHistorypayload).then( res =>{ 
            if(res.status === 200)
            {
                this.setState({
                    watchHistoryclasses:res.data.classes
                })
            }
        })

        var healthpayload= {
            categorie:"Health",
            pagination: 20
        }
        axios.post('/render/class/categorie',healthpayload).then( res =>{ 
            if(res.status === 200)
            {
                this.setState({
                    healthclasses:res.data
                })
            }
        })

        var educationpayload= {
            categorie:"education",
            pagination: 20
        }
        axios.post('/render/class/categorie',educationpayload).then( res =>{ 
            if(res.status === 200)
            {
                this.setState({
                    educationclasses:res.data
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

        var loadModelClass = <h1>Failed to load class</h1>
        if (this.props.state.Model.class !== null)
        {
            loadModelClass = <GetModel></GetModel>
        }

        return (
            <div>
                <Menu></Menu>

                <div className="browsePage-content">


                    <GetTitleElement title="Popular" link="/popular"></GetTitleElement>
                    <div className="caresoleWrapper">
                        <div className="caresole dragscroll">
                            <GetImageElement classes = {this.state.Popularclasses}></GetImageElement>
                        </div>
                    </div>

                
                    <GetTitleElement title="Newly Added" link="/newlyadded"></GetTitleElement>
                    <div className="caresoleWrapper">
                        <div className="caresole dragscroll">
                            <GetImageElement classes = {this.state.newlyaddedclasses}></GetImageElement>
                        </div>
                    </div>

                    <div className="CaresoleCategorie">
                        <h2 className="categorie_title">Watch History</h2>
                    </div>
                    <div className="caresoleWrapper">
                        <div className="caresole dragscroll">
                            <GetImageElement classes = {this.state.watchHistoryclasses}></GetImageElement>
                        </div>
                    </div>

                    <GetTitleElement title="Health" link="/Health"></GetTitleElement>
                    <div className="caresoleWrapper">
                        <div className="caresole dragscroll">
                        <GetImageElement classes = {this.state.healthclasses}></GetImageElement>
                        </div>
                    </div>

                    <GetTitleElement title="Education" link="/education"></GetTitleElement>
                    <div className="caresoleWrapper">
                        <div className="caresole dragscroll">
                            <GetImageElement classes = {this.state.educationclasses}></GetImageElement>
                        </div>
                    </div>

                </div>


                {/* Pop up Modal */}
                <div id="myModal" className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={this.modelClose}>&times;</span>
                        {loadModelClass}
                    </div>
                </div>

                
                <div className="addedlistAlert" id="notification">
                    <p id="message">Sucessfully added to watch Later list</p>
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

export default connect(mapToState,{ActionCloseModel}) (BrowsePage);