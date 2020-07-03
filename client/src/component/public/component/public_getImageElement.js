import React, { Component } from 'react'
import NoImageFound from '../../img/nophoto.png'


import {ic_play_circle_outline} from 'react-icons-kit/md/ic_play_circle_outline'
import { Icon } from 'react-icons-kit'

import {connect} from 'react-redux'
import {ActionInitModel} from '../../../redux/Action/ModelAction'

import '../../CSS/skeleton-loading.css';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom'


class public_getImageElement extends Component 
{

    errorImag(e)
    {
        e.target.src  = NoImageFound
    }

    tagFormate(tagString)
    {
        var MyArray = tagString.split(','); //splits the text up in chunks
        var newString = ""

        for(var i = 0; MyArray.length > i; i++)
        {
            newString = newString + "#"+MyArray[i].trim() + ' '
        }
        return newString
    }
    render()
    {
        const Classes = this.props.classes

        var classesElement = <div className="skeleton-wrapper" ><Skeleton width={250} height={300}></Skeleton> </div>

       
        if (Classes !== null && Classes !== undefined)
        {
            if(Classes.length > 0)
            {
                classesElement = Classes.map( (val, index) => {
                    var newTag= this.tagFormate(val.tag)
                    return (
                        
                        <div key= {val._id} className="new_contentWraper">
                            <img className="caresoleImage" id={val._id} onError={this.errorImag} src={val.thumbnail} loading="lazy" alt={'apple'}/>
                            <div className="caresoleImage_description_wrapper">                            
                                <div className="description" >
                                    <div className="bottom_caresoleImage_description">
                                        <div className="description_text">
                                            <h4 className="caresole_title">{val.name}</h4>
                                            <div className="tag_wrapper">
                                                <i><p className="tag">{newTag}</p></i>
                                            </div>
                                            <p className="tagParagraph">{val.description}</p>
                                        </div>
                                    </div>
                                    <div className="top_caresoleImage_description">
                                        <Link to= {"/video/"+val._id}>
                                            <button className="playIconImageElement"> + Detail</button>
                                        </Link>

                                    </div>  
                                </div>

                                
                            </div>      
                        </div>  
                       
                    )
                }) 
            }
            else
            {
                classesElement = <div style={{width: "100%", textAlign:"center"}}><h1>No content Found </h1></div> 
            }
            
        }

        return classesElement;
    }
    
}

const mapToState = (state) =>{
    return {
        state:state
    }
}

export default connect(mapToState,{ActionInitModel}) (public_getImageElement);