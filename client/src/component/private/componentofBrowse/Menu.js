import React, { Component } from 'react';
import '../../CSS/Menu.css';
import { Icon } from 'react-icons-kit'
import {Link } from 'react-router-dom'

import {monitor} from 'react-icons-kit/feather/monitor'
import {androidHome} from 'react-icons-kit/ionicons/androidHome'
import {person} from 'react-icons-kit/ionicons/person'
import {iosSearch} from 'react-icons-kit/ionicons/iosSearch'
import {logOut} from 'react-icons-kit/ionicons/logOut'
import {iosDownloadOutline} from 'react-icons-kit/ionicons/iosDownloadOutline'


class Menu extends Component {
  render() {
    return (
        <div className="body">
            <nav className="navbar">
                <ul className="navbar-nav">
                    <li className="logo">
                        <a href="#" className="nav-link">
                        <span className="link-text logo-text">NHA</span>
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fad"
                            data-icon="angle-double-right"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            className="svg-inline--fa fa-angle-double-right fa-w-14 fa-5x"
                        >
                            <g className="fa-group">
                            <path
                                fill="currentColor"
                                d="M224 273L88.37 409a23.78 23.78 0 0 1-33.8 0L32 386.36a23.94 23.94 0 0 1 0-33.89l96.13-96.37L32 159.73a23.94 23.94 0 0 1 0-33.89l22.44-22.79a23.78 23.78 0 0 1 33.8 0L223.88 239a23.94 23.94 0 0 1 .1 34z"
                                className="fa-secondary"
                            ></path>
                            <path
                                fill="currentColor"
                                d="M415.89 273L280.34 409a23.77 23.77 0 0 1-33.79 0L224 386.26a23.94 23.94 0 0 1 0-33.89L320.11 256l-96-96.47a23.94 23.94 0 0 1 0-33.89l22.52-22.59a23.77 23.77 0 0 1 33.79 0L416 239a24 24 0 0 1-.11 34z"
                                className="fa-primary"
                            ></path>
                            </g>
                        </svg>
                        </a>
                    </li>

                    <li className="nav-item">
                        <Link to="/Homepage" className="nav-link">
                        <Icon icon={androidHome} size={120}></Icon>
                        <span className="link-text">Home</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/browse/movie" className="nav-link">
                        <Icon icon={monitor} size={120}></Icon>
                        <span className="link-text">Browse</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/search/movie" className="nav-link">
                        <Icon icon={iosSearch} size={120}></Icon>
                        <span className="link-text">Search</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/upload" className="nav-link">
                        <Icon icon={iosDownloadOutline} size={120}></Icon>
                        <span className="link-text">Upload</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/profile" className="nav-link">
                        <Icon icon={person} size={120}></Icon>
                        <span className="link-text">Profile</span>
                        </Link>
                    </li>
                    
                    <li className="nav-item">
                        <Link to="#" className="nav-link">
                        <Icon icon={logOut} size={120}></Icon>
                        <span className="link-text">Log out</span>
                        </Link>
                    </li>

                </ul>
            </nav>
        </div>
       
    );
  }
}

export default Menu;