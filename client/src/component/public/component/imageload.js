import React, { Component } from 'react'
import { Icon } from 'react-icons-kit'
import {bookmark} from 'react-icons-kit/icomoon/bookmark'

import {Link, Redirect} from 'react-router-dom'


class imageload extends Component {
  state = { isLoaded: false }

  componentDidMount() {
    const image = new Image();
    image.onload = () =>
    {
      var titleID = "subtitle"+this.props.val._id
      var tag = "subtag"+this.props.val._id
      var description = "subdescription"+this.props.val._id
      var directorName = "subdirector"+this.props.val._id
      var time = "subtime"+this.props.val._id

      if(document.getElementById(titleID) !== null)
      {

        document.getElementById(titleID).innerHTML = this.props.val.name
        document.getElementById(titleID).className = "smallMargin subTitle MainTitleImage"

        document.getElementById(tag).innerHTML = this.props.tag
        document.getElementById(tag).className = "directorName classInfoData"

        document.getElementById(description).innerHTML = this.props.val.description
        document.getElementById(description).className = "noMargin subDescription"


        document.getElementById('subdir'+this.props.val._id).innerHTML = this.props.val.director
        document.getElementById('subcateg'+this.props.val._id).innerHTML = this.props.val.categorie
        document.getElementById('subdate'+this.props.val._id).innerHTML = this.props.val.date
        document.getElementById(directorName).className = "directorName classInfoData"
  
      }
    }

    image.src = this.props.val.thumbnail;
  }

  render() {
    const { val } = this.props;
    const { isLoaded } = this.state;

    return (
      <div className="contentFirst">
        <a href={"/course/detail/"+val._id} className="linkNOwater" key={val._id}>

          <div className="contentFirstImageTop">
              <img src={val.thumbnail} className="contentImageFirst"></img>
          </div>

          <div className="contentFirstImageBottom">
            <div className="subClassRightContainer">
              <h3 className="smallMargin subTitle MainTitleImage loading title" id={"subtitle"+val._id}> </h3>
              <p  className="directorName smallMargin loading tag" id={"subdirector"+val._id}><span id={"subdir"+val._id} className="directorSpan"></span> <span id={"subcateg"+val._id} className="directorSpan"></span> <span id={"subdate"+val._id}></span> </p>
              <p className="noMargin subDescription loading desc" id={"subdescription"+val._id}> </p>
              <p className="directorName loading dirName" id={"subtag"+val._id} > </p>
            </div>
          </div>
        </a>
      </div>
    )
    }
}

export default imageload;
