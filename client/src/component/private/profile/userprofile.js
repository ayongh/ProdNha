import React, { Component } from 'react'
import {Link } from 'react-router-dom'
import {connect} from 'react-redux'

import Menu from "../componentofBrowse/Menu"
class userprofile extends Component 
{
    constructor(prop)
    {
        super(prop)
        this.state = {
            firstName:'',              //User First Name
            lastName:'',               //User Last Name
            email:'',                  //User Email        
        }
    }

    render() 
    {
       
        return (
          <div className="userprofile_main_container">
                <Menu></Menu>
                <div className="user_info_container">
                    <h3> Update Info</h3>
                    <div className="userinfo_wrapper">
                    <div className="userinfo_title">
                        <p className="subTitle">User info</p>
                    </div>
                    <div className="userinfo_detail">
                        <p className="Name">{this.props.state.userInfo.FirstName +" "+ this.props.state.userInfo.LastName}</p>
                        <p className="subIdentifier">{this.props.state.userInfo.Email}</p>
                        <p className="subIdentifier">password : *********</p>
                    </div>
                    <div className="userinfo_detail_changeDetail">
                        <Link to="/profile/username"><p className="subIdentifier">Update Name</p></Link>
                        <Link to="/profile/email"><p className="subIdentifier">Update Email</p></Link>

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

export default connect(mapToState) (userprofile)