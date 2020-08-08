import React, { Component } from 'react'

import { Icon } from 'react-icons-kit'
import {u1F4D6} from 'react-icons-kit/noto_emoji_regular/u1F4D6'
import {u26BD} from 'react-icons-kit/noto_emoji_regular/u26BD'
import {iosMedkit} from 'react-icons-kit/ionicons/iosMedkit'

class sideMenu extends Component {


  render() {
   

    return (
        <div className="searchLeftMenu">
            <div className="mandatoryMenuContent">
                <a href={"/course/categorieinfo/all"} className="removeHpyerLink sidemenu"><h4 className="mandatoryContent noMargin hover">All Classes</h4></a>
                <a href={"/course/categorieinfo/popular"} className="removeHpyerLink sidemenu"><h4 className="mandatoryContent noMargin hover">popular</h4></a>
                <a href={"/course/categorieinfo/newlyAdded"} className="removeHpyerLink sidemenu"><h4 className="mandatoryContent noMargin hover">Newly Added</h4></a>

            </div>

            <div className="MenuContent">
                <h4 className="label">Main Menu</h4>
                <a href={"/course/categorieinfo/Education"} className="removeHpyerLink sidemenu"><p className="menuLabelContent noMargin hover"> <Icon icon={u1F4D6} className="menuSpan" size={30}>Logo</Icon> Education</p></a>
                <a href={"/course/categorieinfo/Sport"} className="removeHpyerLink sidemenu"><p className="menuLabelContent noMargin hover"><Icon icon={u26BD} className="menuSpan" size={30}>Logo</Icon> Sport</p></a>
                <a href={"/course/categorieinfo/Health"} className="removeHpyerLink sidemenu"><p className="menuLabelContent noMargin hover"><Icon icon={iosMedkit} className="menuSpan" size={30}>Logo</Icon> Health</p></a>
            </div>
        </div>
    )
  }
}

export default sideMenu;
