import React, { Component } from 'react';
import '../../CSS/Menu.css';

import {Link} from 'react-router-dom'

import { Icon } from 'react-icons-kit'
import {home} from 'react-icons-kit/entypo/home'
import {grid} from 'react-icons-kit/entypo/grid'
import {out} from 'react-icons-kit/entypo/out'
import {publish} from 'react-icons-kit/entypo/publish'
import {user} from 'react-icons-kit/ikons/user'
import {androidSearch} from 'react-icons-kit/ionicons/androidSearch'

import axios from 'axios'

import {connect} from 'react-redux'
import {Actionlogout} from '../../../redux/Action/loginAction'


class Menu extends Component {

    constructor(prop)
    {
        super(prop)

        this.state = {
            classes:null,
        }
    }

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
                    <Link to="/" className="logo menuHover">
                        <h2>NHA</h2>
                    </Link>
                </div>
                <div className="login_private_menuContent">
                    <Link className="login_option menuHover" to="/Homepage"> <Icon icon={home}></Icon> <span className="menuText">Home</span></Link>
                    <Link className="login_option menuHover" to="/browse/movie"> <Icon icon={grid}></Icon> <span className="menuText">Browse</span></Link>
                    <Link className="login_option menuHover" to="/search/movie"><Icon icon={androidSearch}></Icon> <span className="menuText">Search</span></Link>
                    <Link className="login_option menuHover" to="/upload"> <Icon icon={publish}></Icon> <span className="menuText">Upload</span></Link>
                    <Link className="login_option menuHover" to="/profile"> <Icon icon={user}></Icon><span className="menuText">Profile</span></Link>
                    <Link className="login_option menuHover" to="#" onClick={this.logOut}> <Icon icon={out}></Icon><span className="menuText">logout</span></Link>
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
