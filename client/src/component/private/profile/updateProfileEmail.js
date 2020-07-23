import React, { Component } from 'react'
import {Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'

import {ActionUserUpdateEmail, ActionUserError} from '../../../redux/Action/userinfoAction'
import Menu from '../componentofBrowse/Menu'

class updateProfileEmail extends Component 
{
    constructor(prop)
    {
        super(prop)
        this.state = {
            email:'',
            error:null,
            redirectNextPage:false
        }
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    
    handleSubmit= (e)=>
    {
        e.preventDefault();

        if(document.getElementById('email').value !== '' && document.getElementById('email').value !== this.props.state.userInfo.Email)
        {
            var payload = {
                'email':document.getElementById('email').value
            }

            axios.post('/user/info/update/email', payload).then( res =>
            {
                if(res.status === 200)
                {
                    this.setState({
                        redirectNextPage:true
                    })
                }
                else
                {
                    this.setState({
                        error:res.data.error
                    })
                }

            }).catch(error => {
                this.setState({
                    error:"error occured when making a request"
                })
            })
        }
    }

    render() 
    {
        if(this.state.redirectNextPage)
        {
            return <Redirect to='/profile/email/validation'/>
        }

        let errorElement = null
        if(this.state.error)
        {
            errorElement = <p>{this.state.error}</p>
        }

        return (
          <div className="userprofile_main_container">
                <Menu></Menu>
                <div className="user_info_container">
                    <h3> Update</h3>
                    <div className="userinfo_wrapper">
                        <div className="userinfo_title">
                            <p className="subTitle">Email info</p>
                        </div>
                        <div className="update_userinfo_detail">
                            <form onSubmit={this.handleSubmit} className="updateform">
                                
                                <p className="update_subIdentifier">Email</p>
                                <input id= "email" className="updateText" type="text" onChange={this.handleChange} defaultValue={this.props.state.userInfo.Email}/>
                                <p className="update_subIdentifier"></p>
                                {errorElement}
                                <button className="updateButton" onClick={this.update}>update</button>

                            </form>

                        </div>
                    </div>
                </div>
          </div>
        )
    }
}

//access all the state
const mapToState = (state) =>{
    return {
        state:state
    }
}

export default connect(mapToState,{ActionUserUpdateEmail, ActionUserError}) (updateProfileEmail)