import React, { Component } from 'react';
import '../../CSS/Menu.css';
import { Icon } from 'react-icons-kit'
import {Link,Redirect} from 'react-router-dom'

import axios from 'axios'

import {connect} from 'react-redux'
import {Actionlogout} from '../../../redux/Action/loginAction'

import {monitor} from 'react-icons-kit/feather/monitor'
import {androidHome} from 'react-icons-kit/ionicons/androidHome'
import {person} from 'react-icons-kit/ionicons/person'
import {iosSearch} from 'react-icons-kit/ionicons/iosSearch'
import {logOut} from 'react-icons-kit/ionicons/logOut'
import {iosDownloadOutline} from 'react-icons-kit/ionicons/iosDownloadOutline'


class Menu extends Component {

    constructor(prop)
    {
        super(prop)

        this.state = {
            classes:null,
        }
    }

   /*  componentDidMount()
    {
        window.addEventListener('scroll', this.listenToScroll)    
    }

    listenToScroll = () => {
        const winScroll =
          document.body.scrollTop || document.documentElement.scrollTop
      
        const height =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight
      
        const scrolled = winScroll / height
        
        if(document.getElementById('login_nav') !== null)
        {
            if(scrolled >0.026)
            {
                document.getElementById('login_nav').style.background="white"      
                var loginOption = document.getElementsByClassName('login_option')

                for(var i = 0; loginOption.length > i; i++)
                {
                    loginOption[i].style.color ="black"
                }
    
        
            }
            else
            {
                document.getElementById('login_nav').style.background="none"
                var loginOption = document.getElementsByClassName('login_option')

                for(var i = 0; loginOption.length > i; i++)
                {
                    loginOption[i].style.color ="gold"
                }
            }

        }
        
    }

    componentWillUnmount()
    {
        window.removeEventListener('scroll', this.listenToScroll)

    } */
      

    logOut() {
        axios.get('/user/logout').then(response=>{
            if(response.status === 200)
            {
                window.location.reload()
            }
        })
    }

  render() {
    return (
        <div className="login_nav">
            <div className="login_nav_wrapper">
                <div className="logo">
                    <h2>NHA</h2>
                </div>
                <div className="login_private_menuContent">
                    <Link className="login_option" to="/Homepage" >Home</Link>
                    <Link className="login_option" to="/browse/movie">Browse</Link>
                    <Link className="login_option" to="/search/movie">Search</Link>
                    <Link className="login_option" to="/profile">profile</Link>
                    <Link className="login_option" onClick={this.logOut}>Logout</Link>

                </div>
            </div>
        </div>
        
    );
  }
}

//access all the state
const mapToState = (state) =>{
    return {
        state:state
    }
}

export default connect(mapToState,{Actionlogout}) (Menu);
