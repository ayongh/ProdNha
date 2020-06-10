import React, { Component } from 'react'
import {Link,Redirect  } from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'

import {ActionUserUpdateName, ActionUserError} from '../../../redux/Action/userinfoAction' //'../../Action/userinfoAction'
import Menu from '../componentofBrowse/Menu'

class update_username extends Component 
{
    constructor(props)
    {
        super(props)
        this.state = {
            firstName:'',              //User First Name
            lastName:'',               //User Last Name
            error:undefined,
            updatedNameStatus: false
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

        if(document.getElementById('firstName').value !== '' && document.getElementById('lastName').value !== '')
        {
            if(document.getElementById('firstName').value !== this.props.state.userInfo.FirstName || document.getElementById('lastName').value !== this.props.state.userInfo.LastName)
            {
                var payload = {
                    'fname':document.getElementById('firstName').value,
                    'lname':document.getElementById('lastName').value
                }

                axios.post('/user/info/update/name', payload).then( res =>
                {
                    if(res.status === 200)
                    {
                        
                        if(document.getElementById("message") !== null )
                        {
                            this.props.ActionUserUpdateName(res.data.message)
                            this.setState({
                                updatedNameStatus:true
                            })    
                        }
                    }
                    else
                    {
                        if(document.getElementById("message") !== null )
                        {
                            this.props.ActionUserError(res.data.error)
                            document.getElementById("message").innerHTML = "Failure to update your Name"
                            document.getElementById('notification').style.display="flex"
                            document.getElementById('notification').style.background="red"
                            setTimeout(function(){ 
                                document.getElementById('notification').style.display="none"
                            }, 3000);
                        }
                    }
                })     

            }else
            {

                if(document.getElementById("message") !== null )
                {
                    document.getElementById("message").innerHTML = "Please use diffrent name to update"
                    document.getElementById('notification').style.display="flex"
                    document.getElementById('notification').style.background="brown"
                    setTimeout(function(){ 
                        document.getElementById('notification').style.display="none"
            
                    }, 3000);
                }
            }
        }
        else{
            
            if(document.getElementById("message") !== null)
            {
                document.getElementById("message").innerHTML = "Name cannot be empty"
                document.getElementById('notification').style.display="flex"
                document.getElementById('notification').style.background="brown"
                setTimeout(function(){ 
                    document.getElementById('notification').style.display="none"
        
                }, 3000);
            }

            this.setState({
                error:'First or last name cannont be empty'
            })
        }
   


    }

    render() 
    {
        let errorElement;
        if (this.state.error !== undefined)
        {
            errorElement = <p>{this.state.error}</p>
        }

        if(this.state.updatedNameStatus === true)
        {
           return <Redirect to="/profile"/>
        }

        return (
            <div className="userprofile_main_container">
                <Menu></Menu>
                <div className="user_info_container">
                  <h3> Update</h3>
                    <div className="userinfo_wrapper">
                        <div className="userinfo_title">
                            <p className="subTitle">User info</p>
                        </div>
                        <div className="update_userinfo_detail">
                            <form onSubmit={this.handleSubmit} className="updateform">
                                <p className="update_subIdentifier">First Name</p>
                                <input id= "firstName" className="updateText" type="text" onChange={this.handleChange} defaultValue ={this.props.state.userInfo.FirstName}></input>
                                
                                <p className="update_subIdentifier"> Last Name</p>
                                <input id= "lastName" className="updateText" type="text" onChange={this.handleChange} defaultValue ={this.props.state.userInfo.LastName}></input>
                                <p className="update_subIdentifier"></p>

                                {errorElement}
                                <button className="updateButton" onClick={this.update}>update</button>

                            </form>
                           
                        </div>
                    </div>
                </div>

                <div className="addedlistAlert" id="notification">
                    <p id="message">Sucessfully added to watch Later list</p>
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

export default connect(mapToState,{ActionUserUpdateName,ActionUserError}) (update_username)