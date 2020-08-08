import React, { Component } from 'react'
import { Icon } from 'react-icons-kit'
import {bookmark} from 'react-icons-kit/icomoon/bookmark'
import {close} from 'react-icons-kit/fa/close'
import {spinner2} from 'react-icons-kit/icomoon/spinner2'
import {androidSearch} from 'react-icons-kit/ionicons/androidSearch'

import {Link, Redirect} from 'react-router-dom'


class loadingMainImage extends Component {
  state = { isLoaded: false }

  componentDidMount() {
    const image = new Image();
    image.onload = () =>
    {
        var titleID = "title"+this.props.val._id
        var tag = "tag"+this.props.val._id
        var description = "description"+this.props.val._id
        var directorName = "director"+this.props.val._id
        var time = "time"+this.props.val._id

        if(document.getElementById(titleID) !== null)
        {

            document.getElementById(titleID).innerHTML = this.props.val.name
            document.getElementById(titleID).className = "smallMargin MainTitleImage"
    
            document.getElementById(tag).innerHTML = this.props.tag
            document.getElementById(tag).className = "directorName"
    
            document.getElementById(description).innerHTML = this.props.val.description
            document.getElementById(description).className = "noMargin"
    

            document.getElementById('dir'+this.props.val._id).innerHTML = this.props.val.director
            document.getElementById('categ'+this.props.val._id).innerHTML = this.props.val.categorie
            document.getElementById('date'+this.props.val._id).innerHTML = this.props.val.date
            document.getElementById(directorName).className = "directorName"
    
            document.getElementById(time).innerHTML = "1hrs 2min"
            document.getElementById(time).className = "time"
        }
    }

    image.src = this.props.val.thumbnail;
  }

  render() {
    const { val } = this.props;
    return (
        <Link to={"/course/detail/"+val._id} className="linkNOwater" key={val._id}>
            <div className="mainContent">
                <div className="mainClassleft">
                    <img className="MainContentleftImg" id="image1"  src={val.thumbnail} ></img>
                </div>
                <div className="mainClassRight">
                    <div className="mainClassRightContainer">
                        <h3 className="smallMargin MainTitleImage loading title" id={"title"+val._id}> </h3>
                        <p  className="directorName smallMargin loading tag" id={"director"+val._id}><span id={"dir"+val._id} className="directorSpan"></span> <span id={"categ"+val._id} className="directorSpan"></span> <span id={"date"+val._id}></span> </p>
                        <p className="noMargin MainDescription loading desc" id={"description"+val._id}> </p>
                        <p className="directorName loading dirName" id={"tag"+val._id} > </p>
                    </div>
                    <div className="bottomSaveAndTime" >
                        <p className="time loading time" id={"time"+val._id}> </p>
                    </div>
                </div>
            </div>
        </Link>
    )}
}

export default loadingMainImage;
