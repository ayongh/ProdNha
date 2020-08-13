import React, { Component } from 'react';
import '../../CSS/Menu.css';

import { Icon } from 'react-icons-kit'

import {androidCall} from 'react-icons-kit/ionicons/androidCall'
import {email} from 'react-icons-kit/ionicons/email'
import {socialFacebook} from 'react-icons-kit/ionicons/socialFacebook'
import {socialInstagramOutline} from 'react-icons-kit/ionicons/socialInstagramOutline'
import {socialGithub} from 'react-icons-kit/ionicons/socialGithub'


class contactfooter extends Component {

  render() {
    return (
        <div className="homePage_content_container_morecontent contact-footer">
            <h2>Contact</h2>
            <div className="contact_wrapper">
                <Icon icon={androidCall} size={40} className="contatct_icon"></Icon>
                <Icon icon={email} size={40} className="contatct_icon"></Icon>
                <Icon icon={socialFacebook} size={40} className="contatct_icon"></Icon>
                <Icon icon={socialInstagramOutline} size={40} className="contatct_icon"></Icon>
                <Icon icon={socialGithub} size={40} className="contatct_icon"></Icon>
            </div>

            <div className="contact_wrapper_policy">
                <a href="/" className="linkNOwater link dot">About</a>
                <a href="/term/policy" className="linkNOwater link">Term & Policies</a>
            </div>

        </div>
    );
  }
}

export default contactfooter;