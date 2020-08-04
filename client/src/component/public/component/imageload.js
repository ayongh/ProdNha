import React, { Component } from 'react'
import { Icon } from 'react-icons-kit'
import {bookmark} from 'react-icons-kit/icomoon/bookmark'
import {close} from 'react-icons-kit/fa/close'
import {spinner2} from 'react-icons-kit/icomoon/spinner2'
import {androidSearch} from 'react-icons-kit/ionicons/androidSearch'

import {Link, Redirect} from 'react-router-dom'


class imageload extends Component {
  state = { isLoaded: false }

  componentDidMount() {
    const image = new Image();
    image.onload = () => this.setState({ isLoaded: true });

    image.src = this.props.val.thumbnail;
  }

  render() {
    const { val } = this.props;
    const { isLoaded } = this.state;

    return isLoaded
      ? 
        <div className="contentFirst">
            <Link to={"/course/detail/"+val._id} className="linkNOwater" key={val._id}>

                <div className="contentFirstImageTop">
                    <img src={val.thumbnail} className="contentImageFirst"></img>
                </div>
                <div className="contentFirstImageBottom">
                    <h3 className="contentTitle">{val.name}</h3>
                    <div className="bottomSaveAndTimeContent">
                        <p className="time">{val.director}</p>
                        <Icon className="saveicon" icon={bookmark} size={15}></Icon>
                    </div>
                </div>
            </Link>
        </div>
      : 
        <div className="contentFirst">
            <Link to={"/course/detail/"+val._id} className="linkNOwater" key={val._id}>

                <div className="contentFirstImageTop">
                </div>
                <div className="contentFirstImageBottom">
                    <h3 className="contentTitle">{val.name}</h3>
                    <div className="bottomSaveAndTimeContent">
                        <p className="time">{val.director}</p>
                        <Icon className="saveicon" icon={bookmark} size={15}></Icon>
                    </div>
                </div>
            </Link>

        </div>
  }
}

export default imageload;
